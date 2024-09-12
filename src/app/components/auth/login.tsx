"use client"
import "./auth.css"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Signup () {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [err, setErr] = useState("")
   

        const login = async (e:any) =>{
            e.preventDefault()
            try{
                const response = await axios.post(`${apiUrl}/login`, {
                 email,password
                });   
                console.log(response)
              
                const token = response.data.token
                const { success } = response.data;
      
              if (success) {         
                localStorage.setItem('authToken', token); 
                setErr(success)
              } else {
                console.error('Login failed:', response.data.message);
         setErr(response.data.message)
              }
            }
            catch(error:any){
              
            }
        }
    

    return (
        <div className="auth-container">
            <h3>Login</h3>
            <form onSubmit={login} className="auth-form">
                <div className="input-group">
                 <label htmlFor="email">email: </label>
                <input id="email" type="email" name="email" value={email}
                onChange={(e) => {
                    setEmail(e.target.value)}}/>   
                </div>
                <div className="input-group">
                 <label htmlFor="password">Password: </label>
                <input id="password" type="password" name="password" value={password}
                onChange={(e) => {
                    setPassword(e.target.value)}}/>   
                </div>

               
                <button type="submit">Login</button>
            </form>

        </div>
    )
}