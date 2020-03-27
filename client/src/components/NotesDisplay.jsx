import React, {useEffect, useState} from 'react'
import axios from 'axios'

const NotesDisplay = (props) => {

    const userID = localStorage.getItem('userID')
    const [state,setState] = useState({})
    useEffect(
        () => {
            axios
                .get(`http://localhost:8000/api/v1/findOne/${userID}`)
                .then((response) => {
                    setState({ ...response.data });
                    console.log('you are in useEffect of Notes response is:', response);
                    console.log('state is:', state);
                })
                .catch((error) => console.log(error));
        },
        []
    );
    
        
    
    
    return (
        <div>
        <div className="noteBox">
        {state.tasks && state.tasks.map((task, i) => (task!== null && 
            <p key={i}> <h3>{task.title} Notes</h3>
            <div className="noteBoxContent">
            {task.notes && task.notes.map((note, j)=>(note!=null && 
            <li key={j}> {note}</li>
            ) )}</div>
        </p>))}
        </div>
        </div>
    )
}

export default NotesDisplay
