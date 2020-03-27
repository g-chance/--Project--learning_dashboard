import React, {useEffect, useState} from 'react';
import pad from '../images/notePad.jpg';
import axios from 'axios';
import { navigate } from '@reach/router';
import Delete from '../images/delete.png';

const Notes = (props) => {

    const userID = localStorage.getItem('userID')
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = mm + '/' + dd + '/' + yyyy;

    const [formState,setFormState]=useState({
        notes:'',
    })

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

    const onChangeHandler=(e)=>{
        setFormState({
            ...formState,
            [e.target.name]:e.target.value
        })
    }

    const onSubmitHandler=(e)=>{
        e.preventDefault();
        if (state.tasks && state.tasks[props.taskIdx] != undefined) {
            let temp = state.tasks;
            (temp[props.taskIdx].notes).push(formState.notes)
            console.log('state.tasks[props.taskIdx].notes is:', temp);
        axios
        .put(`http://localhost:8000/api/v1/updateOne/${userID}`, { tasks: temp })
        .then((response) => {
            console.log('notes added to task')
            navigate('/tasklist')
        })
        .catch((error) => {
            console.log('error is:', error.response.data);
        });
    }
    }

    const deleteOneNote=(e,i)=>{
        if (state.tasks && state.tasks[props.taskIdx] != undefined) {
            let temp = state.tasks;
            (temp[props.taskIdx].notes).splice(i,1)
            console.log('state.tasks[props.taskIdx].notes is:', temp);
        axios
        .put(`http://localhost:8000/api/v1/updateOne/${userID}`, { tasks: temp })
        .then((response) => {
            console.log('note removed')
            navigate(`/tasks/notes/${props.taskIdx}/new`)
        })
        .catch((error) => {
            console.log('error is:', error.response.data);
        });
    }
    }

    return (
        <div>
            <div className="noteWrapper">
                <img src={pad} width="90%"/>
                <div className="content">
                <h4 style={{color:'darkBlue'}}>Date:{today}</h4>
            <div className='noteList'>
            <ul>
                {state.tasks && state.tasks[props.taskIdx].notes.map((note, i) => (note!== null && 
            <li key={i}> {note} <img  onClick={(e)=>deleteOneNote(e,i)} src={Delete} alt="trash" width='2.5%'/> </li>))}
            </ul>
            </div>
                <h2>Add a New Note</h2>
                <form onSubmit={onSubmitHandler} >
                <textarea name="notes" onChange={onChangeHandler}></textarea>
                <button className='noteSubmit'type="submit">Add</button>
                </form>
                </div>
            </div>
        </div>
    )
}

export default Notes
