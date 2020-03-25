import React, {useState} from 'react'
import axios from 'axios';
import { navigate } from '@reach/router';
const Login = (props) => {
    const [fState, setFState] = useState({
        email:"",
        password:""
    })
    const [errorState, setErrorState] = useState("")
    const onSH = (e) => {
        e.preventDefault();
        // all axios calls should submit withCredentials:true if you want to use authenticate from backend
        axios.post('http://localhost:8000/api/v1/login', fState, {withCredentials:true})
        .then(response => {
            console.log(response)
            setErrorState(response.data.msg)
            navigate('/home')
        })
        .catch(error => console.log(error))
    }
    const onCH = (e) => {
        setFState({
            ...fState,
            [e.target.name]:e.target.value
        })
    }
    return (
        <div>
            <h1>Login</h1>
            <p style={{color:errorState === 'success' ? 'green' : 'red'}}>{errorState} {errorState === "success" ? 'you can navigate at this point to success' : null}</p>
            <form onSubmit={onSH}>
                <p>Email</p>
                <input type="email" name="email" onChange={onCH}/>
                <p>Password</p>
                <input type="password" name="password" onChange={onCH}/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login
