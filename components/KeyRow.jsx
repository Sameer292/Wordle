import React from 'react'

function KeyRow({row, keyPressHander}) {


  function handleClick(item){
    keyPressHander({
      key: item.target.innerText
    })
  }
  return (
    <div className='flex'>
      {row.map((char) => {
        return (
          <div key={char} onDoubleClick={(e)=>{e.preventDefault()}} onClick={handleClick} style={{ backgroundColor: '#818384' }} className='select-none  keys min-w-10 p-3 correct max-w-fit text-white h-13 cursor-pointer m-[3px] font-bold text-xl rounded-md items-center flex justify-center bg-{#818384}'>{char}</div>
        )
      })}
    </div>
  )
}

export default KeyRow