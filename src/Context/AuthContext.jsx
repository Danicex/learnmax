import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
 
    const api_endpoint = 'https://render-rails-template.onrender.com'
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const [authenticated, setAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState((localStorage.getItem('token')) || null);
    const [userId, setuserId] = useState(localStorage.getItem('user_id') || null);
    const [userEmail, setuserEmail] = useState(localStorage.getItem('user_email') || null);
   
    
    



    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.className = theme;
    }, [theme]);

    useEffect(() => {
        if (authToken) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
        
    }, [authToken]);


  
    
    const signup = async (email, password) => {
        try {
            const response = await axios.post(`${api_endpoint}/users/tokens/sign_up`, {
                email,
                password,
            });
    
            const data = response.data;
    
            // Save tokens and user data
            localStorage.setItem('token', JSON.stringify(data));
            setAuthToken(data);
    
            const user_id = data.resource_owner.id;
            const userEmail = data.resource_owner.email;
    
            localStorage.setItem('user_id', userId);
            setuserId(user_id);
            localStorage.setItem('user_email', userEmail);
            setuserEmail(userEmail);
    
            navigate('/create_profile');
            setAuthenticated(true);
    
            // Call handleSubPost only after userId is set
           
        } catch (error) {
            console.error('Failed to sign up:', error);
            setAuthenticated(false);
        }
    };
    

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${api_endpoint}/users/tokens/sign_in`, {
                email,
                password
            });
            const data = response.data;
            localStorage.setItem('token', JSON.stringify(data));
            setAuthToken(data);
            localStorage.setItem('user_id', data.resource_owner.id);
            setuserId(data.resource_owner.id);
            console.log(userId)
            localStorage.setItem('user_email', data.resource_owner.email);
            setuserEmail(data.resource_owner.email);
            navigate('/dashboard')
            setAuthenticated(true)
            setFirstTimer(false)

        } catch (error) {
            console.log('Failed to sign in:', error);
            setAuthenticated(false)
        }
    };

    const logout = () => {
        setAuthToken(null);
        setAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_email');
        navigate('/');
        
    };

    return (
        <AuthContext.Provider value={{
            theme,
            setTheme,
            authenticated,
            authToken,
            userId,
            userEmail,
            signup,
            login,
            logout,
            api_endpoint
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
