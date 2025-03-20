import React from 'react'
import KeyRow from './KeyRow'
function Keyboard({keyPressHandler, keyStatuses }) {
    const row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
    const row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    const row3 = ['⌫', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Enter']
    return (
        <div className='keyboard flex justify-center items-center mt-3 flex-col '>
            <KeyRow row={row1} keyPressHander={keyPressHandler}  keyStatuses={keyStatuses}/>
            <KeyRow row={row2} keyPressHander={keyPressHandler} keyStatuses={keyStatuses}/>
            <KeyRow row={row3} keyPressHander={keyPressHandler} keyStatuses={keyStatuses}/>
        </div>
    )
}

export default Keyboard