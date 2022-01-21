import React, { useContext } from 'react'
import IssuesForm from './IssuesForm'
import IssuesList from './IssuesList'
import { UserContext } from '../context/UserProvider'


export default function Profile(){ 
    const { user: {username}, addIssue, issues } = useContext(UserContext)
    return (
        <div className='profile'>
            <h1 className='welcome'>Welcome @{username}!</h1>
            <p className='p1'>To you're Climate Action Profile Page where you can post your issues comments and concerns.
                Don't hold back and post away!
            </p>
            <h3 className='addIssue'>Add An Issue</h3>
            <IssuesForm addIssue={addIssue} />
            <IssuesList issues={issues} />
        </div>
    )
}

//call useContext line 6
//return statement line 7 put a div html, import or create form
//call comments by user function and display below welcome 
//on Issue page display get by issue... add to User Provider