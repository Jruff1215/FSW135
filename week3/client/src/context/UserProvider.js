import React, { useState} from 'react'
import axios from 'axios'

export const UserContext = React.createContext()
const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})


export default function UserProvider(props) {
    const initState = { 
        user: JSON.parse(localStorage.getItem('user')) || {}, 
        token: localStorage.getItem('token') || "",
        issues: [], 
        userComment: [], 
        allComments: [], 
        oneComment: [], 
        commentsByUser: [],
        errMsg: ""
    }
    const [userState, setUserState] = useState(initState)

    function handleAuthErr(errMsg){
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    }

    function resetAuthErr(){
        setUserState(prevState => ({
            ...prevState,
            errMsg: ''
        }))
    }

    function signup(credentials) {
        axios.post('http://localhost:9000/auth/signup', credentials)
            .then (res => {
                const { user, token } = res.data
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState(prevUserState => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch (err => handleAuthErr(err.response.data.errMsg))
    }

    function login(credentials) {
        axios.post('http://localhost:9000/auth/login', credentials)
        .then (res => {
            const { user, token } = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            getUserIssues()
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch (err => handleAuthErr(err.response.data.errMsg))
    }

    //Logout
    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({ user: {}, token: "", issues: [] })
    }

    //addIssue
    function addIssue(newIssue) {
        userAxios.post('http://localhost:9000/api/issues/addIssue', newIssue)
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                issues: [...prevState.issues, res.data]
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    //display issues
    function getUserIssues() {
        userAxios.get('http://localhost:9000/api/issues/user')
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                issues: res.data
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }    

    //add comment

    //get all
    function getComment() {
        userAxios.get('http://localhost:9000/comments/getComment')
            .then (res => { 
                setUserState(prevState => ({
                    ...prevState, 
                    allComments :  res.data
                }))
            })
            .catch (err => console.log(err.response.data.errMsg))
    }

    //get one
    function getOneComment(id) {
        userAxios.get(`http://localhost:9000/api/comments/getComment/${id}`)
            .then (res => { 
                setUserState(prevState => ({
                    ...prevState, 
                    oneComment :  res.data
                }))

            })
            .catch (err => console.log(err.response.data.errMsg))
    }

    // get by userId
    function commentsByUser(id) {
        userAxios.get(`http://localhost:9000/api/comments/searchByUser/${id}`)
            .then (res => { 
                setUserState(prevState => ({
                    ...prevState, 
                    oneComment :  res.data
                }))

            })
            .catch (err => console.log(err.response.data.errMsg))
    }



    function upVote(id) {
        userAxios.put(`http://localhost:9000/api/issues/upVote/${id}`)
        .then (res => { 
            getUserIssues()
        })
        .catch (err => console.log(err.response.data.errMsg))

    }

    function downVote(id) {
        userAxios.put(`http://localhost:9000/api/issues/downVote/${id}`)
        .then (res => { 
            getUserIssues()
        })
        .catch (err => console.log(err.response.data.errMsg))

    }

    return (
        <UserContext.Provider
         value = { { 
             ...userState, 
             signup, 
             login,
             logout, 
             addIssue,
             getComment,
             getOneComment,
             commentsByUser,
             resetAuthErr,
             upVote,
             downVote} }>
            { props.children }
        </UserContext.Provider>
    )
}