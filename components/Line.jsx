import { useState } from "react";

function Line({ guess, isFinal, solution }) {
    const GUESS_LEGTH = 5;
    const tiles = [];
    // const [className, setClassName] = useState('tile');

    // console.log(guess);

    for (let i = 0; i < GUESS_LEGTH; i++) {
        const char = guess[i]
        let className = 'tile'
        if (isFinal) {
            if (char === solution[i]) {
                className += ' correct'
                // setClassName(className + ' correct')
                // setClassName('tile correct')
            } else if (solution.includes(char)) {
                className += ' close'
                // setClassName('tile close')
            } else {
                className += ' wrong'
                // setClassName('tile wrong')
            }
        }
        tiles.push(<div key={i}  className={className} >{char}</div>)
    }
    return (
        <div className='line'>
            {tiles}
        </div>
    )
}

export default Line


// onInput={() => className += ' jumper'}