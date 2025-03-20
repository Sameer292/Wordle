import { useEffect, useState } from 'react'
import wordJson from './word.json'
import './App.css'
import Keyboard from '../components/Keyboard';
import Line from '../components/Line';



function App() {
  // const PROXY = "https://cors-anywhere.herokuapp.com/";
  // const API_URL = "https://api.frontendexpert.io/api/fe/wordle-words";
  const [solution, Setsolution] = useState('');
  const [guesses, Setguesses] = useState(Array(6).fill(null));
  const [currentGuess, SetcurrentGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  // const [className, setClassName] = useState('tile');
  const GUESS_LEGTH = 5;

  useEffect(() => {
    const getWords = async () => {
      try {
        // const response = await axios.get(PROXY + API_URL);
        // const words = await fetch('/wordle-words.json');
        // const randomWord = response[Math.floor(Math.random() * response.length)];
        // Setsolution(randomWord);
        // console.log(response.data);
        // console.log(solution);


        const response = wordJson;
        const randomWord = response[Math.floor(Math.random() * response.length)];
        Setsolution(randomWord);
        console.log(randomWord);
      } catch (error) {
        console.error("Error fetching words:", error);
      }

    };
    getWords();
  }, [])



  const [keyStatuses, setKeyStatuses] = useState(Object);
  
  function updateKeyStatuses(guess) {
    let newStatuses = { ...keyStatuses };
    guess.split('').forEach((char, index) => {
      if (solution[index] === char) {
        newStatuses[char] = 'correct'; 
      } else if (solution.includes(char)) {
        if (newStatuses[char] !== 'correct') {
          newStatuses[char] = 'close'; 
        }
      } else {
        newStatuses[char] = 'wrong'; 
      }
    });
    // console.log(keyStatuses);
    setKeyStatuses(newStatuses);
    // console.log(keyStatuses);
  }








  function handleKeyDown(e) {

    if (isGameOver) return;

    if (e.key === '⌫' || e.key === 'Backspace') {
      SetcurrentGuess(currentGuess.slice(0, -1))
      return;
    } else if (e.key === 'Enter') {
      if (currentGuess.length !== GUESS_LEGTH || !wordJson.includes(currentGuess)) {
        return;
      }

      if (currentGuess === solution) setIsGameOver(true);
      const oldGuesses = [...guesses];
      oldGuesses[guesses.findIndex(val => val == null)] = currentGuess;
      Setguesses(oldGuesses);
      updateKeyStatuses(currentGuess)
      SetcurrentGuess('');
    } else if (!/^[a-zA-Z]$/.test(e.key)) {
      return;
    }
    if (currentGuess.length >= GUESS_LEGTH) return;
    SetcurrentGuess(currentGuess + e.key.toLowerCase());
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [currentGuess, isGameOver, solution])

  return (
    <div className='App h-full m-0 p-0 flex  w-screen flex-col items-center justify-center   bg-[#121213] '>
      <div className='header select-none'>
        Wordle
      </div> 
      <div className='flex flex-col justify-center w-full items-center '>
        { 
          guesses.map((guess, index) => {
            const isCurrentGuess = index === guesses.findIndex(val => val == null)
            return <Line
              key={index} guess={isCurrentGuess ? currentGuess : guess ?? ''}
              isFinal={!isCurrentGuess && guess != null}
              solution={solution}

            />
          })
        }
      </div>
      <div className='keyboard flex justify-center items-center  pt-3' >
      <Keyboard keyPressHandler={handleKeyDown} keyStatuses={keyStatuses} />
      </div>
    </div>
  )
}

export default App

