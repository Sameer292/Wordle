import React from 'react'

function KeyRow({row}) {

  function handleClick(item){

    console.log(item.target.innerText);
    

  }


  return (
    <div className='flex'>
      {row.map((char) => {
        return (
          <div key={char} onClick={handleClick} style={{ backgroundColor: '#818384' }} className='keys min-w-10 p-3  max-w-fit text-white h-13 cursor-pointer m-1 font-bold text-xl rounded-md items-center flex justify-center bg-{#818384}'>{char}</div>
        )
      })}
    </div>
  )
}

export default KeyRow