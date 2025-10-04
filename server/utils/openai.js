import { OpenAI } from "openai";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "./s3.js"

export async function getCoinData(file) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.key, 
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

  const prompt = `You are a coin expert. Your job is to estimate a collectible coin's value from an image.
  Respond in the following format and ONLY this format:

  Estimated Value: $<estimated dollar value>
  *<full coin name and estimated year>
  *<brief explanation of why it is worth that amount>

  Do not add anything else before or after the answer.
  Keep the explanation under 100 words.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          { type: "image_url", image_url: { url: signedUrl } },
        ],
      },
    ],
    max_tokens: 1000,
  });
  const coinInfo = completion.choices[0].message.content; //gets response
  return coinInfo.split("*");
}
