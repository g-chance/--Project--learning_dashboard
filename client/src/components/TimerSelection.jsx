import React, {useState} from 'react'
import Timer20 from '../images/Timer20'
import Timer50 from '../images/Timer50'
import TimerCustom from '../images/TimerCustom'
import {Link, navigate} from '@reach/router'

const TimerSelection = () => {
    
    const [formState,setFormState]=useState({
        hours:'',
        minutes:'',
        seconds:''
    })

    const onChangeHandler=(e)=>{
        setFormState({
            ...formState,
            [e.target.name]:e.target.value
        })
    }

    const onSubmitHandler=(e)=>{
        e.preventDefault();
        console.log(formState.hours,formState.minutes, formState.seconds)
    }
    
    return (
        <div>
            <div>
            <label>20 mins</label>
            <img src={Timer20} alt="20-min-Timer" width="30%"/>
            <Link to='/timer/timer20'><button>Go</button></Link> 
            </div>
            
            <div>
            <label>50 mins</label>
            <img src={Timer50} alt="50-min-Timer" width="30%"/>
            <Link to='/timer/timer50'><button>Go</button></Link> 
            </div>
            <div>
            <form onSubmit={onSubmitHandler}> 
            <label>Custom</label>
            <img src={TimerCustom} alt="20-min-Timer" width="30%"/>
            <label>Hours</label>
            <input name="hours" onChange={onChangeHandler} type="number" step="1" min="0"/>
            <label>Minutes</label>
            <input name="minutes" onChange={onChangeHandler} type="number" step="1" min="0"/>
            <label>Seconds</label>
            <input name= "seconds" onChange={onChangeHandler} type="number" step="1" min="0"/>
            <button type="submit">Go</button>
            </form>
            </div>
        </div>
    )
}

export default TimerSelection
