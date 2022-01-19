import React from 'react'
import { Route, Navigate } from 'react-router-dom'

export default function ProtectedRoute(props) {
    const { path, navigateTo, component:  C, token, ...rest } = props
    return token?
        <Route path={ path}
        element={< C {...rest} />} /> :
        <Navigate to={ navigateTo } />
}