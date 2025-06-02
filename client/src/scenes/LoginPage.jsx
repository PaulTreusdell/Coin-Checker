import { useNavigate } from "react-router-dom"
import Form from "../components/Form" 
import axios from "axios"

const handleSubmit = async (data, navigate) => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", data, {
      withCredentials: true //need credentials for cookies
    })
    if (res.status == 200) {
      navigate("/home")
    }
  }
  catch(e) {
    console.error(`Error Logging in ${e}`)
  }
}

export default function LoginPage() {
  const navigate = useNavigate()
  return (
    <Form type="login" submit={(data) => {
      handleSubmit(data, navigate)
    }}/>
  )
}