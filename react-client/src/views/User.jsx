import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
 
export default function User() {
    const [user, setUser] = useState([])
 
    const navigate = useNavigate()
 
    useEffect(() => {
        axios.get('user')
            .then(response => setUser(response.data));
    }, [])
 
    function logout() {
        axios.post('logout').finally(() => {
            localStorage.removeItem('token')
            axios.defaults.headers.common['Authorization'] = 'Bearer'
            navigate('/login')
        })
    }
 
    return (
        <div>
            <div>ID: {user.id}</div>
            <div>Email: {user.email}</div>
            <div>
                <button type="button" onClick={logout}>Logout</button>
            </div>
        </div>
    );
}