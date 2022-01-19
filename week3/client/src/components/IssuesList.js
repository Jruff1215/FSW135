import React from 'react'
import Issues from './Issues'

export default function IssuesList(props){
    const { issues } = props
    return (
        <div>
            { issues.map(issue => <Issues {...issue} key={issue.id} />)}
        </div>
    )
}