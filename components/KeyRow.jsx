import React from 'react'

function KeyRow({ row, keyPressHander, keyStatuses }) {

  function applyKeyStyle(letter) {

    if(letter === 'Enter') {
      return '#087faa';
    }else if(letter === '⌫') {
      return '#9e1825';
    }

    const status = keyStatuses[letter.toLowerCase()];
    if (status === 'correct') {
      return '#538d4e';
    } else if (status === 'close') {
      return '#b59f3b';
    } else if (status === 'wrong') {
      return '#3a3a3c';
    } else {
      return '#818384';
    }

  }

  function handleClick(item) {
    keyPressHander({
      key: item.target.innerText
    })
  }
const enterBack = 'w-9';
const red = 'bg-red-400';

  return (
    <div className='flex w-full justify-center items-center '>
      {row.map((char) => { 
        return (
          <div key={char} onDoubleClick={(e) => { e.preventDefault() }} style={{backgroundColor: applyKeyStyle(char)}} onClick={handleClick}  className={` ${char != 'Enter' && char != '⌫' && enterBack }  select-none  keys  p-3 correct text-white h-16  cursor-pointer m-[3px] font-bold text-xl rounded-md items-center flex justify-center `} >{char}</div>
        )
      })}
    </div>
  )
}

export default KeyRow