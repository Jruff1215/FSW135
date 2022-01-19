import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../context/UserProvider'
import axios from 'axios'

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})



export default function Issues(props) {
    const { upVote, downVote} = useContext(UserContext)

    const { title, description, votes, user, _id } = props
    const [comments, setComments] = useState([])
    const [input, setInput] = useState({text: ""})

    function commentsByIssue(id) {
        userAxios.get(`http://localhost:9000/api/comments/searchByIssue/${_id}`)
            .then (res => { 
                setComments( 
                     res.data
                )

            })
            .catch (err => console.log(err.response.data.errMsg))
    }

    function addComment() {
        console.log(input)
        userAxios.post(`http://localhost:9000/api/comments/${_id}`, input)
            .then (res => { 
                setComments(prevState => (
                    [...prevState, res.data]
                ))
            })
            .catch (err => console.log(err.response.data.errMsg))
    }


    useEffect(() => {
        commentsByIssue()
    }, [])

    return (
        <div className='issues'>
            <h1>{ title }</h1>
            <h3>{ description }</h3>
            <h4>{ votes }</h4>
            <button onClick={() =>{
                upVote(_id)
            }}>UpVote</button>
            <button onClick={() => {
                downVote(_id)
            }}>DownVote</button>

            <h3>Add Comment</h3>
            <form>
                <input
                name="text"
                value={input.text}
                onChange={(e) => {
                    var {name, value} = e.target
                    setInput({[name] : value})
                }}
                ></input>
                <button onClick={(e) => {
                    e.preventDefault()
                    addComment()
                }}>Submit</button>
                </form>
            
            {comments.map(comment => (
                <p> 
                    {comment.text}
                </p>
               
            ))}
        </div>
    )
}