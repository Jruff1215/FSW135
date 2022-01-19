import React, { useContext } from 'react'
import IssuesForm from './IssuesForm'
import IssuesList from './IssuesList'
import { UserContext } from '../context/UserProvider'


export default function Profile(){ 
    const { user: {username}, addIssue, issues } = useContext(UserContext)
    return (
        <div>
            <h1>Welcome @{username}!</h1>
            <h3>Add An Issue</h3>
            <IssuesForm addIssue={addIssue} />
            <h3>Your Issues</h3>
            <IssuesList issues={issues} />
        </div>
    )
}

//call useContext line 6
//return statement line 7 put a div html, import or create form
//call comments by user function and display below welcome 
//on Issue page display get by issue... add to User Provider