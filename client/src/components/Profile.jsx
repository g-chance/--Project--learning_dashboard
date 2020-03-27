import React, { useEffect, useState } from 'react';
import axios from 'axios';
import profileCard from '../images/profileCard.png';
import editPad from '../images/editPad.png';


const Profile = (props) => {

    const userID = localStorage.getItem('userID')
    console.log(userID)
    const [state, setState] = useState({
        profileImage: 'https://www.pngitem.com/pimgs/m/146-1468843_profile-icon-orange-png-transparent-png.png',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const [errorState, setErrorState] = useState([])
    const [hide, setHide] = useState(true)
    useEffect(
        () => {
            axios
                .get(`http://localhost:8000/api/v1/findOne/${userID}`)
                .then((response) => {
                    setState({ ...response.data });
                    console.log('you are in useEffect of Profile response is:', response);
                    console.log('state is:', state);
                })
                .catch((error) => console.log(error));
        },
        []
    );

    const Edit=(e)=>{
        setHide(!hide)
    }

    const CloseEdit=(e)=>{
        setHide(true)
    }

    const onSH = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/v1/updateOne/${userID}`, state,{withCredentials:true})
        .then(response => {
            if(response.data.errors){
                const temp = []
                for(let key in response.data.errors) {
                    temp.push(response.data.errors[key].message)
                }
                setErrorState(temp)
            } else {
                console.log(state);
                setHide(true)
            }
        })
        .catch(error => console.log(error))
    }
    const onCH = (e) => {
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }

    return (
        <div className='profileContainer'>
            <div className='badge'>
                <div className='profileBg'>
                    <img src={profileCard} alt="profile" width='100%' />
                    <div className='profileInfo'>
                        <img className='profileImg' src={state.profileImage} alt='No Profile Image'/>
                            <div className='profileLabel'>
                            <p>First Name</p>
                            <input type="text" name="firstName" value={state.firstName} />
                            <p>Last Name</p>
                            <input type="text" name="lastName" value={state.lastName} />
                            <p>Email</p>
                            <input type="email" name="email" value={state.email} />
                            </div>
                            <div className='buttons'>
                            <button hidden={!hide}onClick={Edit}>Edit</button>
                            <button hidden={hide}onClick={CloseEdit}>Close Edit</button>
                            </div>
                    </div>
                </div>
            </div>
            <div hidden={hide}>
            <div className='editColumn'>
            <div className="editWrapper">
            <img src={editPad} alt="tags" width="92%"/>
            <div className="editProfile">
            {errorState.map((item, index) => (
                <p key={index}>{item}</p>
            ))}
            <form onSubmit={onSH}>
                <div className='imageTag'>
                <img src={state.profileImage} alt="Profile Image" width='25%'/><br/>
                <input type="text" name="profileImage" onChange={onCH} value={state.profileImage}/>
                </div>
                <div className='labelTag'>
                <label>First Name </label>
                <input type="text" name="firstName" onChange={onCH} value={state.firstName}/>
                </div>
                <div className='labelTag'>
                <label>Last Name </label>
                <input type="text" name="lastName" onChange={onCH} value={state.lastName}/>
                </div>
                <div className='labelTag'>
                <label>Email </label>
                <input type="email" name="email" onChange={onCH} value={state.email}/>
                </div>
                <button type="submit">Save</button>

            </form>
            </div>
            </div>

        </div>
            </div>
        </div>
    )
}

export default Profile
