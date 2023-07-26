import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import UserContext from './UserContext';
import JoblyApi from "./JoblyApi";

import NavBar from './NavBar';
import CompanyList from './CompanyList';
import Company from './Company';
import Home from './Home';
import Jobs from './Jobs';
import Login from './Login';
import UserProfile from './UserProfile';
import SignUp from './SignUp';
import Unauthorized from "./Unauthorized";
import NotFound from "./NotFound";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const initialState = 
		JSON.parse(localStorage.getItem("currUser")) || {};

	const [user, setUser] = useState(initialState)

	useEffect(()=>{
		localStorage.setItem("currUser", JSON.stringify(user))
    JoblyApi.token = user.token
	}, [user])

  const login = async (evt, formData) => {
    evt.preventDefault();
		const token = await JoblyApi.getToken(formData)
    JoblyApi.token = token.token
    const userInfo = await JoblyApi.getUser(formData.username)
    setUser({...userInfo, token : token.token})
    window.location.href = "/"
  }

  const logout = () => {
		setUser({});
		JoblyApi.token = ""
		localStorage.removeItem("currUser")
		window.location.href = "/"
	}

  const signup = async (evt, formData) => {
    evt.preventDefault();
		const token = await JoblyApi.register(formData);
    JoblyApi.token = token.token
    const userInfo = await JoblyApi.getUser(formData.username)
    setUser({...userInfo, token : token.token})
    window.location.href = "/"
  }

  return (
    <div className="App">
        <UserContext.Provider value={{user, setUser}}>
        <BrowserRouter>
          <NavBar handleLogout={logout} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/companies" element={<CompanyList />} />
            <Route exact path="/companies/:handle" element={<Company />} />
            <Route exact path="/jobs" element={<Jobs />} />
            <Route exact path="/login" 
                element={<Login handleLogin={login}/>} 
            />
            <Route exact path="/signup" element={<SignUp handleSignup={signup} />} />
            <Route exact path="/profile/:username" element={<UserProfile />} />
            <Route exact path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </BrowserRouter>
        </UserContext.Provider>
    </div>
  );
}

export default App;
