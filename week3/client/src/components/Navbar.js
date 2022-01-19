import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'

export default function Navbar(){
    const { logout, token} = useContext(UserContext)
    return (
        <div className='navbar'>
            <Link to="/">Home</Link>
            { token && <Link to="/profile">Profile</Link>}
            { token && <Link to="/Issues">Issues</Link>}
            { token && <button onClick={ logout }>Logout</button>}
        </div>
    )
}