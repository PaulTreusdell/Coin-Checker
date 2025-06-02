import { OpenAI } from "openai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

export async function getCoinData(file) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const imgPath = path.join(__dirname, '..','assets', `${file.originalname}`)

  const base64Image = fs.readFileSync(imgPath, {
    encoding: "base64"
  })

  const prompt = `You are a coin expert. Your job is to estimate a collectible coin's value from an image.
  Respond in the following format and ONLY this format:

  Estimated Value: $<estimated dollar value>
  *<full coin name and estimated year>
  *<brief explanation of why it is worth that amount>

  Do not add anything else before or after the answer.
  Keep the explanation under 100 words.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt
          },
          {
            type: "image_url",
            image_url: {
              url: `data:${file.mimetype};base64,${base64Image}`,
            }
          }
        ]
      }
    ],
    max_tokens: 1000,
  })
  console.log(response.choices[0]);
  const coinInfo = response.choices[0].message.content; //gets response
  return coinInfo.split("*");
}
