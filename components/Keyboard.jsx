import React from 'react'
import KeyRow from './KeyRow'
function Keyboard() {
    const row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
    const row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    const row3 = ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace']
    return (
        <div className='keyboard flex justify-center items-center mt-3 flex-col'>
            <KeyRow row={row1} />
            <KeyRow row={row2} />
            <KeyRow row={row3} />
        </div>
    )
}

export default Keyboard