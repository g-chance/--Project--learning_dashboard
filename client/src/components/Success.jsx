import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from '@reach/router';

const Success = () => {
    const [state, setState] = useState([])
    const [error, setError] = useState("")
    const [refresher, setRefresher] = useState(false)
    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/find', { withCredentials: true })
            .then(response => {
                console.log(response)
                setState(response.data)
            })
            .catch(error => {
                console.log(error)
                setState([])
                setError("Please login to display data")
            })
    }, [refresher])
    const onClickHandler = () => {
        axios.get('http://localhost:8000/api/v1/logout', { withCredentials: true })
            .then(response => setRefresher(!refresher))
            .catch(error => console.log(error))
    }
    return (
        <div>
            {state.map((item, index) => (
                <p key={index}>{item.firstName} {item.lastName}</p>
            ))}
            {error.length > 0 ?
                <Link to="/">Login to view data</Link> : null
            }
            <h1>Congrats you have registered/logged in!</h1>
            <button onClick={onClickHandler}>Logout</button>
        </div>
    )
}

export default Success
