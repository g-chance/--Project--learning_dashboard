import React, {useState} from 'react';
import Timer20 from '../images/Timer20.png';
import Timer50 from '../images/Timer50.png';
import TimerCustom from '../images/TimerCustom.png';
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
        console.log(formState.hours,formState.minutes,formState.seconds);
        navigate(`/timer/${(formState.hours)* 3600 + (formState.minutes)*60 + (formState.seconds)*1}`)
    }
    
    return (
        <div className='container'>
            <div className='select'>
            <h3>20 mins</h3>
            <img src={Timer20} alt="20-min-Timer"/>
            <div className='action'>
            <Link to='/timer/timer20'><button>Go</button></Link> 
            </div>
            </div>
            
            <div className='select'>
            <h3>50 mins</h3>
            <img src={Timer50} alt="50-min-Timer"/>
            <div className='action'>
            <Link to='/timer/timer50'><button>Go</button></Link> 
            </div>
            </div>

            <div className='select'>
            <form onSubmit={onSubmitHandler}> 
            <h3>Custom</h3>
            <img src={TimerCustom} alt="20-min-Timer"/>
            <div className='inputLabels'>
            <label>Hours </label>
            <input name="hours" onChange={onChangeHandler} type="number" step="1" min="0"/>
            <br/>
            <label> Minutes </label>
            <input name="minutes" onChange={onChangeHandler} type="number" step="1" min="0"/>
            <br/>
            <label> Seconds </label>
            <input name= "seconds" onChange={onChangeHandler} type="number" step="1" min="0"/>
            <div className='action'>
            <button type="submit">Go</button>
            </div>
            </div>
            </form>
            </div>
        </div>
    )
}

export default TimerSelection
