import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Timer20 = (props) => {
    const userID = localStorage.getItem('userID');
    const FULL_DASH_ARRAY = 283;
    const WARNING_THRESHOLD = 0.5;
    const ALERT_THRESHOLD = 0.25;

    const COLOR_CODES = {
        info: {
            color: 'green'
        },
        warning: {
            color: 'orange',
            threshold: WARNING_THRESHOLD
        },
        alert: {
            color: 'red',
            threshold: ALERT_THRESHOLD
        }
    };

    const TIME_LIMIT = 1200;
    let remainingPathColor = COLOR_CODES.info.color;

    const [ startState, setStartState ] = useState(false);
    const [ pauseState, setPauseState ] = useState(false);
    const [ resumeState, setResumeState ] = useState(false);
    // const [ finished, setFinished ] = useState(false);

    const [ intervalVar, setIntervalVar ] = useState(null);
    const [ tracker, setTracker ] = useState(0);

    const [ state, setState ] = useState({});
    const [ pageLoad, setPageLoad ] = useState(true);

    useEffect(
        () => {
            //on first load of page, grab user info into state so we can edit tasks if we came to this page via a taskIdx path
            if (pageLoad && props.path === '/timer/timer20/:taskIdx') {
                axios
                    .get(`http://localhost:8000/api/v1/findOne/${userID}`)
                    .then((response) => {
                        setState({ ...response.data });
                        console.log('you are in useEffect of TaskForm response is:', response);
                        console.log('state is:', state);
                        setPageLoad(false);
                    })
                    .catch((error) => console.log(error));
            }

            document.getElementById('base-timer-label').innerHTML = formatTime(TIME_LIMIT - tracker);
            setCircleDasharray();
            setRemainingPathColor((TIME_LIMIT - tracker) / TIME_LIMIT);
            if (TIME_LIMIT - tracker === 0) {
                onTimesUp();
                window.clearTimeout(intervalVar);
            } else {
                if (startState) {
                    setIntervalVar(window.setTimeout(() => timerOperations(1), 1000));
                }
            }
        },
        [ tracker, startState ]
    );
    const timerOperations = (arg) => {
        if (arg === 0) {
            setTracker(0);
        } else {
            setTracker(tracker + 1);
            stepTimeSpent();
        }
    };

    //do a axios.put call that increments the user's task at index taskIdx by 1 (this function is called every time setTracker is implemented via timerOperations()
    const stepTimeSpent = () => {
        //if a task exists at that index (taskIdx) then do a put request
        if (state.tasks && state.tasks[props.taskIdx] != undefined) {
            let temp = state.tasks;
            temp[props.taskIdx].timeSpent += 1;
            console.log('state.tasks[props.taskIdx].timeSpent is:', temp);

            axios
                .put(`http://localhost:8000/api/v1/updateOne/${userID}`, { tasks: temp })
                .then((response) => {
                    console.log('.put into tasks[0] +1 second');
                })
                .catch((error) => {
                    console.log('error is:', error.response.data);
                });
        }
    };

    // const checkStateInfo = () => {
    //     console.log('state is:', state);
    //     console.log('startState is:', startState);
    //     console.log('pauseState is:', pauseState);
    //     console.log('resumeState is:', resumeState);
    //     console.log('localstorage value is:', localStorage.getItem('userID'));
    // };

    const startButton = () => {
        setStartState(!startState);
        setPauseState(!pauseState);
        startTimer(0);
    };

    const onTimesUp = () => {
        clearInterval(intervalVar);
        setStartState(false);
        setPauseState(false);
        setResumeState(false);
        // setFinished(true);
    };

    const startTimer = (arg) => {
        timerOperations(arg);
    };

    const pauseTimer = () => {
        window.clearTimeout(intervalVar);
        console.log(tracker);
    };

    const pauseButton = () => {
        setPauseState(!pauseState);
        setResumeState(!resumeState);
        pauseTimer();
    };

    const resumeButton = () => {
        setResumeState(!resumeState);
        setPauseState(!pauseState);
        startTimer(1);
    };

    const formatTime = (time) => {
        if (time >= 3600) {
            const hours = Math.floor(time / 3600);
            let minutes = Math.floor(time / 60) - hours * 60;
            let seconds = time % 60;
            if (seconds < 10) {
                seconds = `0${seconds}`;
            }

            return `${hours}:${minutes}:${seconds}`;
        } else {
            const minutes = Math.floor(time / 60);
            let seconds = time % 60;

            if (seconds < 10) {
                seconds = `0${seconds}`;
            }

            return `${minutes}:${seconds}`;
        }
    };

    const setRemainingPathColor = (timeLeft) => {
        const { alert, warning, info } = COLOR_CODES;
        if (timeLeft <= alert.threshold) {
            document.getElementById('base-timer-path-remaining').classList.remove(warning.color);
            document.getElementById('base-timer-path-remaining').classList.add(alert.color);
        } else if (timeLeft <= warning.threshold) {
            document.getElementById('base-timer-path-remaining').classList.remove(info.color);
            document.getElementById('base-timer-path-remaining').classList.add(warning.color);
        } else {
            document.getElementById('base-timer-path-remaining').classList.remove(alert.color);
            document.getElementById('base-timer-path-remaining').classList.add(info.color);
        }
    };

    function calculateTimeFraction() {
        const rawTimeFraction = (TIME_LIMIT - tracker) / TIME_LIMIT;
        return rawTimeFraction - 1 / TIME_LIMIT * (1 - rawTimeFraction);
    }

    function setCircleDasharray() {
        const circleDasharray = `${(calculateTimeFraction(tracker) * FULL_DASH_ARRAY).toFixed(0)} 283`;
        document.getElementById('base-timer-path-remaining').setAttribute('stroke-dasharray', circleDasharray);
    }

    return (
        <div className="base-timer">
            <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g className="base-timer__circle">
                    <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
                    <path
                        id="base-timer-path-remaining"
                        stroke-dasharray="283"
                        className={`base-timer__path-remaining ${remainingPathColor}`}
                        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
                    />
                </g>
            </svg>
            <span id="base-timer-label" className="base-timer__label">
                {formatTime(TIME_LIMIT - tracker)}
            </span>
            <div className="button">
                <button hidden={startState} onClick={startButton}>
                    Start
                </button>
                <button hidden={!pauseState} onClick={pauseButton}>
                    Pause
                </button>
                <button hidden={!resumeState} onClick={resumeButton}>
                    Resume
                </button>
                {/* <button onClick={checkStateInfo}>check on state</button> */}
            </div>
        </div>
    );
};

export default Timer20;
