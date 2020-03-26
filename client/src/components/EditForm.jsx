import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const TaskForm = props => {
  const [state, setState] = useState({});

  const [formState, setFormState] = useState({
    title: "",
    description: "",
    startDate: "",
    dueDate: "",
    timeSpent: 0,
    status: 0
  });

  const [hasError, setHasError] = useState(false);

  const [errorState, setErrorState] = useState({
    title: "",
    description: "",
    startDate: "",
    dueDate: ""
  });

  const [edit, setEdit] = useState(false);
  const [change, setChange] = useState(false);

  const nameError = "FRONT END: Player name must be at least 2 characters";
  const positionError = "FRONT END: Position must be at least 3 characters";
  const birthdayError = "FRONT END: Must enter a valid birthday";

  useEffect(() => {
    console.log("you are in TaskForm useeffect");

    axios
      .get(`http://localhost:8000/api/v1/findOne/${props.id}`)
      .then(response => {
        setState({ ...response.data });
        console.log("you are in useEffect of TaskForm response is:", response);
        console.log("state is:", state);
      })
      .catch(error => console.log(error));

    // //This assumes we will be able to edit a tast later on as a feature
    // if (props.path === "/players/edit/:id") {
    //   setEdit(true);
    //   axios
    //     .get(`http://localhost:8000/api/v1/${props.id}`)
    //     .then(response => {
    //       setFormState({ ...response.data });
    //       console.log('you are in edit.get response is:',response);
    //       console.log('formState is:',formState)
    //     })
    //     .catch(error => console.log(error));
    // }
    // validator();
  }, [errorState, change]);

  const onChangeHandler = e => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const validator = () => {
    let temp = false;
    if (formState.name.length > 0 && formState.name.length < 2) temp = true;
    if (formState.position.length > 0 && formState.position.length < 3)
      temp = true;
    if (formState.startDate.length === 0) temp = true;
    setHasError(temp);
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    // this is later for the edit task feature
    // if (props.path === "/task/edit/:id") {
    //   axios
    //     .put(
    //       `http://localhost:8000/api/updateOne/${formState._id}`,
    //       formState
    //     )
    //     .then(response => navigate("/players/list"))
    //     .catch(error => {
    //         setErrorState({
    //         name: error.response.data.errors.name
    //           ? error.response.data.errors.name.message
    //           : "",
    //         position: error.response.data.errors.position
    //           ? error.response.data.errors.position.message
    //           : "",
    //         birthday: error.response.data.errors.birthday
    //         ? error.response.data.errors.birthday.message
    //         : "",
    //       });
    //     });
    // } else {
    console.log("you are in create onsumbit");

    let temp = state.tasks;
    temp.push(formState);

    //   setState({...state,tasks:temp})
    console.log("temp is:", temp);

    axios
      .put(`http://localhost:8000/api/v1/updateOne/${props.id}`, {
        tasks: temp
      })
      .then(response => console.log(response))
      .catch(error => {
        console.log("error is:", error.response.data);
        // setErrorState({
        //     name: error.response.data.errors.name
        //       ? error.response.data.errors.name.message
        //       : "",
        //     position: error.response.data.errors.position
        //       ? error.response.data.errors.position.message
        //       : "",
        //     birthday: error.response.data.errors.birthday
        //     ? error.response.data.errors.birthday.message
        //     : "",
        //   });
      });

    // }
  };

  const checkState = e => {
    console.log("state is:", state);
    console.log("formState is:", formState);
  };

  return (
    <div>
      {/* <p style={{color:"blue"}}>{ formState.name.length > 0 && formState.name.length < 2 && nameError}</p>
      <p style={{color:"blue"}}>{ formState.position.length > 0 && formState.position.length < 3 && positionError}</p>
      <p style={{color:"blue"}}>{ formState.birthday.length ===0 && birthdayError}</p>
      <p style={{color:"red"}}>{errorState.name}</p>
      <p style={{color:"red"}}>{errorState.position}</p>
      <p style={{color:"red"}}>{errorState.birthday}</p> */}
      <h5>Add a new task:</h5>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={onChangeHandler}
          value={formState.title || ""}
        />
        <br />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          onChange={onChangeHandler}
          value={formState.description || ""}
        />
        <br />
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          onChange={onChangeHandler}
          value={formState.startDate || ""}
        />
        <br />
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          onChange={onChangeHandler}
          value={formState.dueDate || ""}
        />
        <br />
        <button type="submit" disabled={hasError}>
          Submit
        </button>
        <p onClick={checkState}>Console Log State and formState</p>
      </form>
      //this is just so i can see existing tasks on the screen
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
                <td>{item.startDate ? item.startDate.substring(0, 10) : ""}</td>
                <td>{item.dueDate ? item.dueDate.substring(0, 10) : ""}</td>
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
