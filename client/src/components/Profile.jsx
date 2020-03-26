import React, { useEffect, useState } from 'react';
import axios from 'axios';
import profileCard from '../images/profileCard.png'


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

    const [formState, setFormState] = useState({
        profileImage: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const [update, setUpdate] = useState(false)
    const [hide, setHide] = useState(false)
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
    return (
        <div>
            <div className='badge'>
                <div className='profileBg'>
                    <img src={profileCard} alt="profile" width='20%' />
                    <div className='profileInfo'>
                        <form className='form'>
                            <img className='profileImg' src={state.profileImage} alt='No Profile Image'/>
                            <p>First Name</p>
                            <input type="text" name="firstName" value={state.firstName} />
                            <p>Last Name</p>
                            <input type="text" name="lastName" value={state.lastName} />
                            <p>Email</p>
                            <input type="email" name="email" value={state.email} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
