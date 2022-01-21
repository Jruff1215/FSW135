import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'

export default function Navbar(){
    const { logout, token} = useContext(UserContext)
    return (
        <div className='navbar'>
            <Link to="/" className='link1'>Home</Link>
            { token && <Link to="/profile" className='link2'>Profile</Link>}
            { token && <Link to="/Issues" className='link3'>Issues</Link>}
            { token && <button onClick={ logout }>Logout</button>}
        </div>
    )
}