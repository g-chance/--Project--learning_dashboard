import React, { useState, useEffect } from 'react'

const NavBar = (props) => {

    const [hidden, setHidden] = useState(true)

    useEffect(() => {
        window.addEventListener("mousedown", (e) => {
            if (e.target.className === "hamburger") {
            } else {
                setHidden(true);
            }
        })
    }, [])

    const onClickHandler = (e) => {
        setHidden(false)
    }

    return (
        <>
            <nav>
                <div className="nav wrapper">
                    <h3>Learning Dashboard</h3>
                    <div className="links smHide">
                        <img src="/img/icons_png/background_icon.png" alt="" />
                        <img src="/img/icons_png/fun_icon.png" alt="" />
                        <img src="/img/icons_png/notes_icon.png" alt="" />
                        <img src="/img/icons_png/profile_icon.png" alt="" />
                        <img src="/img/icons_png/task_icon.png" alt="" />
                        <img src="/img/icons_png/team_icon.png" alt="" />
                        <img src="/img/icons_png/timer_icon.png" alt="" />
                    </div>
                    <a className="logout smHide">Logout</a>
                    <div className="dropdown">
                        <div className="hamburger" onClick={(e) => onClickHandler(e)}>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div className="links" style={{ display: hidden === true ? 'none' : 'grid' }}>
                            <img src="/img/icons_png/background_icon.png" alt="" />
                            <img src="/img/icons_png/fun_icon.png" alt="" />
                            <img src="/img/icons_png/notes_icon.png" alt="" />
                            <img src="/img/icons_png/profile_icon.png" alt="" />
                            <img src="/img/icons_png/task_icon.png" alt="" />
                            <img src="/img/icons_png/team_icon.png" alt="" />
                            <img src="/img/icons_png/timer_icon.png" alt="" />
                            <button className="logout">Logout</button>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="spacer"></div>
        </>
    )
}

export default NavBar