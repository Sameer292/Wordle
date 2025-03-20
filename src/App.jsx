import { useEffect, useState } from 'react'
import wordJson from './word.json'
import './App.css'
import Keyboard from '../components/Keyboard';
import Tiles from '../components/Tiles';
// import { Modal } from '@mui/material';
// Supports weights 400-700
import '@fontsource-variable/dancing-script';
// import '@fontsource/pacifico';
import BasicModal from '../components/BasicModal';



function App() {
  // const PROXY = "https://cors-anywhere.herokuapp.com/";
  // const API_URL = "https://api.frontendexpert.io/api/fe/wordle-words";
  const [solution, Setsolution] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [guesses, Setguesses] = useState(Array(6).fill(null));
  const [currentGuess, SetcurrentGuess] = useState('');
  const [keyStatuses, setKeyStatuses] = useState({});
  const LIVES = 6;
  const [lives, setLives] = useState();
  const GUESS_LEGTH = 5;

  useEffect(() => {
    function initialize() {
      const status = localStorage.getItem('isSolved');
      const oldGuesses = JSON.parse(localStorage.getItem('guesses')) || Array(6).fill(null);
      if (!oldGuesses.includes('')) {
        console.log("Space full");
        Setguesses(Array(6).fill(null));
        setKeyStatuses({});
      }
      const livesLeft = localStorage.getItem('lives');
      if (status === 'false' && livesLeft > 0) {
        const randomWord = localStorage.getItem('randomWord');
        setLives(livesLeft);
        Setsolution(randomWord);
        const keyStatuses = JSON.parse(localStorage.getItem('keyStatuses')) || {};
        setKeyStatuses(keyStatuses)
        Setguesses(oldGuesses)

      } else {
        setKeyStatuses({});
        localStorage.setItem('keyStatuses', JSON.stringify({}));
        Setguesses(Array(6).fill(null));
        localStorage.setItem('guesses', JSON.stringify(Array(6).fill('')));
        setLives(LIVES);
        localStorage.setItem('lives', LIVES);
        getWords();
      }
    }


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
        localStorage.setItem('randomWord', randomWord);
        localStorage.setItem('isSolved', false);
        localStorage.setItem('guesses', JSON.stringify(Array(6).fill('')));
        localStorage.setItem('keyStatuses', JSON.stringify({}));
        localStorage.setItem('lives', LIVES);
        console.log(randomWord);
      } catch (error) {
        console.error("Error fetching words:", error);
      }

    };
    initialize();
  }, [])



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
    setKeyStatuses(newStatuses);
    localStorage.setItem('keyStatuses', JSON.stringify(newStatuses));
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
      setLives(lives - 1);
      localStorage.setItem('lives', lives - 1)
      if (currentGuess === solution) {
        setIsGameOver(true);
        localStorage.setItem('isSolved', true);
      }
      const oldGuesses2 = [...guesses];
      oldGuesses2[guesses.findIndex(val => val == null || val === '')] = currentGuess;
      Setguesses(oldGuesses2);
      localStorage.setItem('guesses', JSON.stringify(oldGuesses2));
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


      <div className='header justify-between flex select-none '>
        <div className=' w-1/3 flex justify-start items-center text-3xl' style={{ fontFamily: 'dancing script variable, serif' }} >
          Shree
        </div>
        <div className='w-1/3'>
          Wordle
        </div>
        <div className='w-1/3 flex justify-end items-center' >
          <BasicModal />
        </div>
      </div>
      <Tiles guesses={guesses} currentGuess={currentGuess} solution={solution} />
      <div className='keyboard flex justify-center items-center  pt-3' >
        <Keyboard keyPressHandler={handleKeyDown} keyStatuses={keyStatuses} />
      </div>
    </div>
  )
}

export default App