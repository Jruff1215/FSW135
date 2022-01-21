import React from 'react'
import Issues from './issuesmini'

export default function IssuesList(props){
    const { issues } = props
    return (
        <div>
            { issues.map(issue => <Issues {...issue} key={issue.id} />)}
        </div>
    )
}