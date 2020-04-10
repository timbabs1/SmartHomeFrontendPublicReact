import React, {useState, useEffect} from 'react';

function AlarmSwitch(props) {

    // isAlarmOn -> State of the alarm
    // setIsAlarmOn -> Change state of the alarm
    const [isAlarmOn, setIsAlarmOn] = useState(false);
    // secondsInput -> N of seconds to wait
    // setSecondsInput -> Set N of seconds to wait
    const [secondsInput, setSecondsInput] = useState(0);

    const conditionalRender = (alarmOn) => {
        return (alarmOn ? 
            <div><b>The alarm is ringing</b></div>
            :
            <div><b>The alarm is not ringing</b></div>)
    }

    const whatToRender = conditionalRender(isAlarmOn)
    const toggleAlarm = () => {
        // alarm is on => true
        // alarm is on => false
        setIsAlarmOn(state => !state)
    }
    
    const toggleAlarmInSeconds = seconds => () => {
        setTimeout(() => {
            toggleAlarm()
        }, seconds * 1000)
    }

    const secondsInputChanged = () => {
        setSecondsInput(document.getElementById('secondsInput').value)
    }

    return (
        <div>
            {whatToRender}
            <input placeholder="Seconds to wait" id="secondsInput" onChange={secondsInputChanged}></input>
            <div>
                <button onClick={toggleAlarm}>Toggle alarm</button>
                <button onClick={toggleAlarmInSeconds(parseInt(secondsInput))}>Toggle alarm in {secondsInput} seconds</button>
            </div>
        </div>
    )
}

export default AlarmSwitch