'use client'
import { useState, useEffect } from "react"
import axios from "axios"
import { IComment } from "@/types/comment"
import "./comment.css"

interface CommentProps {
    id: string;  // Define the type for the prop
  }

export default function Comment( id:any){
    const [userName, setUserName] = useState("")
    const [getComment, setGetComment] = useState(true)
    const [comments, setComments] = useState<IComment[]>([])
    const [text, setText] = useState("")



    useEffect(() =>{

      
        async function fetchComments() {
            try{
            const response = await axios.get(`${dburl}/comment/${id.id}`);
            setComments(response.data)
            }
            catch(error){
                console.error(error)
            }
            finally{
                setGetComment(false)
            }
        }
        
        fetchComments()
    }, [getComment])

    
    const dburl = process.env.NEXT_PUBLIC_API_URL
    async function postComment(e:any,){
        e.preventDefault()
        try{
          
            const response = await axios.post(`${dburl}/comment/${id.id}`, {
          userName, text })  
    localStorage.setItem("storedName", userName )
        }
        catch(error){
           console.error(error)
        }
        finally{
            setGetComment(true)
        }
     
   }     

    return (
        <div className="comments-container"> 
        <form className="comment-form" onSubmit={postComment}>
           
            <input 
            className="comment-input-text"
            placeholder="Enter Your Comment" value={text}
                onChange={(e)=>{
                    setText(e.target.value)
                 }}
                 required
            />
            <button type="submit">send</button>

            
        </form>
            <h4>Comments</h4>
            <div>

                {comments.length > 1 ? (comments.map((comment)=> (
                  <div className="each-comment-container"  key={comment._id}>
                    <div className="each-comment-username">{comment.userName} :</div>
                    <div className="each-comment-text">{comment.text}</div>
                  </div>
                ))) : <div className="no-comment">Be the first to drop a comment</div>}
            </div>
       
        </div>
    )
}