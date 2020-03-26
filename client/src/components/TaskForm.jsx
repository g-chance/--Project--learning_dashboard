import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

const TaskForm = (props) => {
    const userID=localStorage.getItem('userID')
    const [ state, setState ] = useState({});
    const [ formState, setFormState ] = useState({
        title: '',
        description: '',
        startDate: '',
        dueDate: '',
        timeSpent: 0,
        status: 0
    });

    // hasError determines if the submit button is enabled or disabled, changes it's value in the validator function
    const [ hasError, setHasError ] = useState(false);
    // stores backend error messages from response.data.errors
    const [ backendError, setBackendError ] = useState([]);
    //dont need change to refresh the page since we're going to be navigating back to where we came from this is just to refresh my .map of all user's tasks
    const [ change, setChange ] = useState(false);

    const descriptionError = 'Description must be at least 10 characters';
    const negDateError = 'Due Date must be after Start Date';

    useEffect(
        () => {
            console.log('you are in TaskForm useeffect');
            axios
                .get(`http://localhost:8000/api/v1/findOne/${userID}`)
                .then((response) => {
                    setState({ ...response.data });
                    console.log('you are in useEffect of TaskForm response is:', response);
                    console.log('state is:', state);
                })
                .catch((error) => console.log(error));
            validator();
        },
        [ change, formState ]
    );

    const onChangeHandler = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const validator = () => {
        let temp = false;
        if (formState.title.length === 0) temp = true;
        if (formState.description.length > 0 && formState.description.length < 10) temp = true;
        if (formState.startDate.length === 0) temp = true;
        if (new Date(formState.dueDate).getTime() - new Date(formState.startDate).getTime() <= 0) temp = true;
        setHasError(temp);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log('you are in create onsumbit');
        //take state.tasks and add a new task which is the contents of formState
        let temp = state.tasks;
        temp.push(formState);

        axios
            .put(`http://localhost:8000/api/v1/updateOne/${userID}`, { tasks: temp })
            .then((response) => {
                //this should navigate back to wherever you came from or close this popup if we've implemeneted that feature
                //navigate('/')
                setChange(!change);
            })
            .catch((error) => {
                console.log('error is:', error.response.data);
                console.log('error.response.data.error is:', error.response.data.errors);
                setChange(!change);
                setBackendError(error.response.data.errors);
            });
    };

    //function to just check the state of everything as a debugging tool if you click on the P tag
    const checkState = (e) => {
        console.log('state is:', state);
        console.log('formState is:', formState);
        console.log('backendError is:', backendError);
        Object.keys(backendError).map((item, i) => console.log(backendError[item].message));
        console.log(formState.title.length);
    };

    return (
        <div style={{ margin: '20px' }}>
            <p style={{ color: 'red' }}>
                {formState.description.length > 0 && formState.description.length < 3 && descriptionError}
            </p>
            <p style={{ color: 'red' }}>
                {new Date(formState.dueDate).getTime() - new Date(formState.startDate).getTime() <= 0 && negDateError}
            </p>

            {/* The submit button is disabled if there are errors but if not this object.keys.map shows backend errors */}
            {Object.keys(backendError).map((item, i) => (
                <p style={{ color: 'red' }} key={i}>
                    {backendError[item].message}
                </p>
            ))}

            <h5>Add a new task:</h5>

            <form onSubmit={onSubmitHandler}>
                <label htmlFor="title">Title: </label>
                <input type="text" id="title" name="title" onChange={onChangeHandler} value={formState.title || ''} />
                <br />
                <label htmlFor="description">Description (optional): </label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    onChange={onChangeHandler}
                    value={formState.description || ''}
                />
                <br />
                <label htmlFor="startDate">Start Date: </label>
                <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    onChange={onChangeHandler}
                    value={formState.startDate || ''}
                />
                <br />
                <label htmlFor="dueDate">Due Date (optional): </label>
                <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    onChange={onChangeHandler}
                    value={formState.dueDate || ''}
                />
                <br />
                <button type="submit" disabled={hasError}>
                    Submit
                </button>

                {/* a debugging h4 that console log's state info */}
                <h4 onClick={checkState}>Console Log State and formState</h4>
            </form>
{/* 
            this is just so i can see existing tasks on the screen */}
            {state.tasks ? (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>Due Date</th>
                            <th>Time Spent</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.tasks.map((item, index) => (
                            <tr key={index}>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>{item.startDate ? item.startDate.substring(0, 10) : ''}</td>
                                <td>{item.dueDate ? item.dueDate.substring(0, 10) : ''}</td>
                                <td>{item.timeSpent}</td>
                                <td>{item.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : null}
        </div>
    );
};

export default TaskForm;
