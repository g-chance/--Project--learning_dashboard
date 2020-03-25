import React from 'react'
import Timer20 from '../images/Timer20'
import Timer50 from '../images/Timer50'
import TimerCustom from '../images/TimerCustom'
import {Link} from '@reach/router'

const TimerSelection = () => {
    return (
        <div>
            <div>
            <label>20 mins</label>
            <img src={Timer20} alt="20-min-Timer"/>
            <Link to='/timer/timer20'><button>Go</button></Link> 
            </div>
            
            <div>
            <label>50 mins</label>
            <img src={Timer50} alt="50-min-Timer"/>
            <Link to='/timer/timer50'><button>Go</button></Link> 
            </div>
            <div>
            <form>
            <label>Custom</label>
            <img src={TimerCustom} alt="20-min-Timer"/>
            <label>Hours</label>
            <input name="hours" type="number" step="1" min="0"/>
            <label>Minutes</label>
            <input name="minutes" type="number" step="1" min="0"/>
            <label>Seconds</label>
            <input name= "seconds" type="number" step="1" min="0"/>
            <button>Go</button>
            </form>
            </div>
        </div>
    )
}

export default TimerSelection
