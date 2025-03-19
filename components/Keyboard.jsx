import React from 'react'
import KeyRow from './KeyRow'
function Keyboard({keyPressHandler}) {
    const row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
    const row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    const row3 = ['Backspace', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Enter']
    return (
        <div className='keyboard flex justify-center items-center mt-3 flex-col'>
            <KeyRow row={row1} keyPressHander={keyPressHandler} />
            <KeyRow row={row2} keyPressHander={keyPressHandler} />
            <KeyRow row={row3} keyPressHander={keyPressHandler} />
        </div>
    )
}

export default Keyboard