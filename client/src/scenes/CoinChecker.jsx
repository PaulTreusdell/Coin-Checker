import axios from "axios"
import Layout from "../components/Layout"
import { useState } from "react"

export default function CoinChecker() {
  const [coinData, setCoinData] = useState({file: null})
  
  const submitCoin = async (coinData) => {
    const formData = new FormData();
    formData.append("file", coinData.file);

    await axios.post("http://localhost:5000/coin/", formData, {
      withCredentials: true
    })
  }

  const submitForm = (e) => {
    e.preventDefault();
    submitCoin(coinData)
  }

  return (
    <Layout>
      <div className="checker-container">
        <div className="coin-input">
          <h4>Upload Coin Here</h4> <br />
          <form onSubmit={submitForm} method="post">
            <input  //5,000,000 is in bytes. so max 5MB 
            name="file"
            type="file"
            onChange={(e)=> {setCoinData({file: e.target.files[0]})}}
            size="5000000"></input> <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </Layout>
  )
}