import Layout from "../components/Layout"
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => { //get user info
    const getUserData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/user/home", {
          withCredentials: true
        })

        setUser(res.data.user)
      }
      catch(e) {
        console.error(`Error fetching data ${e}`)
      }
    }

    getUserData()
  }, []) //[] is on page load

  return (
    <>
    <Layout>
      <div className="welcome-message">
        <h2>Welcome To Coin Checker, {user ? user.username : "Guest"}!</h2>
      </div>
      <h3 className="collection-message">Your Current Collection:</h3>
      <div className="coin-grid">
        {user && user.coins.length > 0 ? (
          user.coins.map((coin)=>(
            <div className="coin-div">
              <h4>{coin.name}</h4>
              <p>{coin.price}</p>
              <p>{coin.description}</p>
            </div>
          ))
        ) : (
          <h2 className="error-text">No Coins Found, Click <strong id="check" onClick={() => (navigate("/check"))}>here</strong> to get started!</h2>
        )}
      </div>
    </Layout>
    </>
  )//need to add collection of coins
}