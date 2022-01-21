import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css';
import Auth from './components/Auth'
import Profile from './components/Profile'
import IssuesList from './components/IssuesList';
import { UserContext } from './context/UserProvider'
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { token, issues } = useContext(UserContext)
  return (
    <div className="App">
      {<Navbar />}
      <Routes>
        <Route
          exact path='/'
          element={ token ? <Navigate to='/profile' /> : <Auth /> }
      />
        <Route
          path='/profile'
          element={ token ? <Profile /> : <Navigate to='/' />}
      />
        <Route
          path='/issues'
          element= { token ?  <IssuesList issues= {issues} /> : <Navigate to='/' /> }
          />
      </Routes>
      


    </div>
  );
}

export default App;
