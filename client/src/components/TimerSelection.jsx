import React, {useState} from 'react';
import Timer20 from '../images/Timer20.png';
import Timer50 from '../images/Timer50.png';
import TimerCustom from '../images/TimerCustom.png';
import {Link, navigate} from '@reach/router'

const TimerSelection = (props) => {
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
        if(props.path === '/timer/select/:taskIdx'){
            navigate(`/timer/custom/${(formState.hours)* 3600 + (formState.minutes)*60 + (formState.seconds)*1}/${props.taskIdx}`)
        }else{
            navigate(`/timer/custom/${(formState.hours)* 3600 + (formState.minutes)*60 + (formState.seconds)*1}`)
        }
    }
    
    return (
        <div className='container'>
            <div className='select'>
            <img src={Timer20} alt="20-min-Timer"/>
            <div className='action'>
            <Link to={props.path === '/timer/select/:taskIdx' ?  `/timer/timer20/${props.taskIdx}` : `/timer/timer20/`}><button>Go</button></Link> 
            </div>
            </div>
            
            <div className='select'>
            <img src={Timer50} alt="50-min-Timer"/>
            <div className='action'>
            <Link to={props.path === '/timer/select/:taskIdx' ?  `/timer/timer50/${props.taskIdx}` : `/timer/timer50/`}><button>Go</button></Link> 
            </div>
            </div>

            <div className='select'>
            <form onSubmit={onSubmitHandler}> 
            <img src={TimerCustom} alt="20-min-Timer"/>
            <div className='inputLabels'>
            <label> </label>
            <input name="hours" onChange={onChangeHandler} type="number" placeholder="Hours" step="1" min="0"/>
            <br/>
            <label> </label>
            <input name="minutes" onChange={onChangeHandler} type="number" placeholder="Minutes" step="1" min="0"/>
            <br/>
            <label> </label>
            <input name= "seconds" onChange={onChangeHandler} type="number" placeholder="Seconds" step="1" min="0"/>
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
