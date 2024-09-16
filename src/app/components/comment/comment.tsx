'use client'
import { useState, useEffect } from "react"
import axios from "axios"
import { IComment } from "@/types/comment"
import "./comment.css"
import { useRouter } from 'next/navigation'
import { useGlobalContext } from "@/context/globalContexts"
import { toast } from "react-hot-toast"

interface CommentProps {
    id: string;  // Define the type for the prop
  }

export default function Comment( id:any){
    const { error, setError, message, setMessage, isLoading, setIsLoading } = useGlobalContext();
    const [comments, setComments] = useState<IComment[]>([])
    const [text, setText] = useState("")
    const router = useRouter()
    const dburl = process.env.NEXT_PUBLIC_API_URL


   async function fetchComments() {
            try{
            const response = await axios.get(`${dburl}/comment/${id.id}`, );
            setComments(response.data)
            console.log("getting comments")
             console.log(response.data)
            }
            catch(error){
                console.error(error)
            }
        }
    useEffect(() =>{        
        fetchComments()
    }, [id])

    
 
async function postComment(e: any) {
    e.preventDefault();
    try{
        const postPromise = async () => {
      const response = await axios.post(`${dburl}/comment/${id.id}`, { text }, {
        withCredentials: true
      });
      return response; 
    };
  
    toast.promise(postPromise(), {
      loading: 'Posting your comment...',
      success: (response) => {        
        fetchComments();
        return 'Comment posted successfully!';
      },
      error: (error: any) => {
        console.error(error);
        if (error.response?.status === 401) {
          router.push('./login');
          setError('You have to be logged in to comment');
          return 'Unauthorized: Please log in to comment.';
        }
        return 'Something went wrong. Please try again.';
      }
    });
  
  }
  catch(error){
    console.log(error)
    
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