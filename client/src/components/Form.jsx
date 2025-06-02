import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Form({type, submit}) {
  const [data, setData] = useState({username: "", email: "", password:""})

  //Changes State depending on where user is inputting item
  const changeValue = (e) => {
    setData({...data, [e.target.name]: e.target.value}) //need to use [] or it will log etargetvalue as a string
  }

  const submitForm = (e) => {
    e.preventDefault() //Prevents reloading of page
    submit(data)
  }

  const navigate=useNavigate()
  
  return (
    <div className="login-page">
      <div className="login-form">
        <form onSubmit={submitForm} className="form" method="post">
          <h2 className="login-title">Coin Checker</h2> 
          <h3 className="login-type">{type === "login" ? "Login" : "Register"}</h3>
            <input 
              name="username" //need this or crash
              className="user-input" 
              placeholder="Username"
              onChange={changeValue}
              minLength="3"
              maxLength="20"
              required>
            </input> <br />
            {type === "register" && (
            <>
              <input 
                name="email"
                className="email-input" 
                placeholder="Email" 
                type="email"
                onChange={changeValue}
                minLength="3"
                maxLength="30"
                required>
              </input> <br />
            </>)}
            <input
              name="password" 
              className="password-input" 
              placeholder="Password"
              onChange={changeValue}
              minLength="8"
              maxLength="20"
              type="password"
              required>
            </input>
            <div className="submit-wrapper">
              <button 
                className="submit" 
                type="submit">
                {type === "login" ? "Login" : "Register"}
              </button>
            </div>
          <p>
            {type === "login" ? "Don't have an account?" : "Already have an account?"}
            <strong 
            onClick={() => navigate(type === "login" ? "/register" : "/")} 
            style={{cursor: "pointer"}}>{type === "login" ? " Register here" : " Login here"}</strong>
          </p>
        </form>
      </div>
    </div>
  )
}