import React, {useState} from 'react'
import axios from 'axios';
import {navigate} from '@reach/router';
const Registration = () => {
    const [fState, setFState] = useState({
        profileImage:"https://www.pngitem.com/pimgs/m/146-1468843_profile-icon-orange-png-transparent-png.png",
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const [errorState, setErrorState] = useState([])
    const onSH = (e) => {
        e.preventDefault();
        // all axios calls should submit withCredentials:true if you want to use authenticate from backend
        axios.post('http://localhost:8000/api/v1/create', fState, {withCredentials:true})
        .then(response => {
                localStorage.setItem('userID',response.data._id)
                navigate('/profile')
        })
        .catch(error => {
            if (error.response.data.name === "MongoError"){
                setErrorState(["Email already exists"]);
            }else{
                const temp = []
                for(let key in error.response.data.errors) {
                    temp.push(error.response.data.errors[key].message)
                }
                console.log(temp)
                setErrorState(temp)
            } 
            console.log(error.response)
        })
    }
    const onCH = (e) => {
        setFState({
            ...fState,
            [e.target.name]:e.target.value
        })
    }
    return (
        <div>
            <h1>Register</h1>
            {errorState.map((item, index) => (
                <p key={index}>{item}</p>
            ))}
            <form onSubmit={onSH}>
                <p>First Name</p>
                <input type="text" name="firstName" onChange={onCH}/>
                <p>Last Name</p>
                <input type="text" name="lastName" onChange={onCH}/>
                <p>Email</p>
                <input type="email" name="email" onChange={onCH}/>
                <p>Password</p>
                <input type="password" name="password" onChange={onCH}/>
                <p>Confirm Password</p>
                <input type="password" name="confirmPassword" onChange={onCH}/>
                <button type="submit">Register</button>

            </form>
        </div>
    )
}

export default Registration
