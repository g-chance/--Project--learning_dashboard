import React, { useState, useEffect } from 'react'
import { Link, navigate } from '@reach/router'
import axios from 'axios'

const NavBar = (props) => {
    const userID = localStorage.getItem('userID')
    const [hidden, setHidden] = useState(true)
    const [refresher,setRefresher] = useState(false)

    useEffect(() => {
        window.addEventListener("mousedown", (e) => {
            if (e.target.className === "hamburger" || e.target.className === "ignore") {
            } else {
                setHidden(true);
            }
        })
    }, [refresher])

    const onClickHandler = (e) => {
        setHidden(false)
    }

    const logout = (e) => {
        e.preventDefault()
        axios.get('http://localhost:8000/api/v1/logout', { withCredentials: true })
            .then(response => {localStorage.removeItem('userID')
            navigate('/')})
            .catch(error => console.log(error))
    }

    return (
        <>
            <nav>
                <div className="nav wrapper">
                    <h3>Learning Dashboard</h3>
                    <div className="links smHide">
                        <Link to="tasklist">
                            <img src="/img/icons_png/task_icon.png" alt="task" />
                        </Link>
                        <img src="/img/icons_png/notes_icon.png" alt="notes" />
                        <img src="/img/icons_png/team_icon.png" alt="team" />
                        <Link to="/timer/select">
                            <img src="/img/icons_png/timer_icon.png" alt="timer" />
                        </Link>
                        <img src="/img/icons_png/fun_icon.png" alt="fun" />
                        <img src="/img/icons_png/background_icon.png" alt="background"/>
                        <Link to="/profile">
                            <img src="/img/icons_png/profile_icon.png" alt="profile" />
                        </Link>
                    </div>
                    <a href="" onClick={logout} className="logout smHide">Logout</a>
                    <div className="dropdown">
                        <div className="hamburger" onClick={(e) => onClickHandler(e)}>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div className="links" style={{ display: hidden === true ? 'none' : 'grid' }}>
                            <img src="/img/icons_png/background_icon.png" alt="background" />
                            <img src="/img/icons_png/fun_icon.png" alt="fun" />
                            <img src="/img/icons_png/notes_icon.png" alt="notes" />
                            <img src="/img/icons_png/profile_icon.png" alt="profile" />
                            <div className="center">
                                <img src="/img/icons_png/task_icon.png" alt="task" />
                                <img src="/img/icons_png/team_icon.png" alt="team" />
                                <img src="/img/icons_png/timer_icon.png" alt="timer" />
                            </div>
                            <div className="buttons">
                                <button>Action</button>
                                <button className="logout">Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="spacer"></div>
        </>
    )
}

export default NavBar