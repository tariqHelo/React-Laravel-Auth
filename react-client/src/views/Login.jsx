import { useState } from "react";
import { useNavigate } from 'react-router-dom'
 
export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, seterrorMessage] = useState('')
 
    const navigate = useNavigate()
 
    function handleSubmit(event) {
        event.preventDefault()
 
        axios.post('/login', { email: email, password: password })
            .then(response => {
                localStorage.setItem('token', response.data.token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
                navigate('/user')
            })
            .catch(error => {
                if (error.response.status === 422) {
                    seterrorMessage(error.response.data.message)
                }
                setPassword('')
            })
            .finally(() => setPassword(''))
    }
 
    return (
        <div>
        {errorMessage && <div>{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input id="email" name="email" type="text" onChange={event => setEmail(event.target.value)} autoComplete="email" />
            </div>
            <div>
                <label>Password</label>
                <input id="password" name="password" type="password" onChange={event => setPassword(event.target.value)} />
            </div>
            <button type="submit">
                Login
            </button>
        </form>
        </div>
    );
}