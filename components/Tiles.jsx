import React from 'react'
import Line from './Line';
function Tiles({guesses, currentGuess, solution}) {
  return (
    <div className='flex flex-col justify-center w-full items-center '>
    {
      guesses.map((guess, index) => {
        const isCurrentGuess = index === guesses.findIndex(val => val == null || val === '');


        return <Line
          key={index} guess={isCurrentGuess ? currentGuess : guess ?? ''}
          isFinal={!isCurrentGuess && guess != null}
          solution={solution}

        />
      })
    }
  </div>
  )
}

export default Tiles