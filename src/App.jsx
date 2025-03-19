import { useEffect, useState } from 'react'
// import wordJson from './wordle-words.json'
import wordJson from './word.json'
import './App.css'
import Keyboard from '../components/Keyboard';
function App() {
  const PROXY = "https://cors-anywhere.herokuapp.com/";
  const API_URL = "https://api.frontendexpert.io/api/fe/wordle-words";
  const [solution, Setsolution] = useState('');
  const [guesses, Setguesses] = useState(Array(6).fill(null));
  const [currentGuess, SetcurrentGuess] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
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
  useEffect(() => {
    function handleKeyDown(e) {
      if (isGameOver) return;


      if (e.key === 'Backspace') {
        SetcurrentGuess(currentGuess.slice(0, -1))
        return;
      } else if (e.key === 'Enter') {
        if (currentGuess.length !== GUESS_LEGTH || !wordJson.includes(currentGuess)) {
          return;
        }

        if (currentGuess === solution) {
          setIsGameOver(true);
        }
        const oldGuesses = [...guesses];
        oldGuesses[guesses.findIndex(val => val == null)] = currentGuess;
        Setguesses(oldGuesses);
        SetcurrentGuess('');
      } else if (!/^[a-zA-Z]$/.test(e.key)) {
        return;
      }
      if (currentGuess.length >= GUESS_LEGTH) return;
      SetcurrentGuess(currentGuess + e.key.toLowerCase());
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [currentGuess, isGameOver, solution])

  return (
    <div className='App'>
      <div className='header'>
        Wordle
      </div>
      <div>

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
      <Keyboard  />
    </div>
  )
}

export default App



const GUESS_LEGTH = 5;
function Line({ guess, isFinal, solution }) {
  const tiles = [];
  for (let i = 0; i < GUESS_LEGTH; i++) {
    const char = guess[i]
    let className = 'tile'
    if (isFinal) {
      if (char === solution[i]) {
        className += ' correct'
      } else if (solution.includes(char)) {
        className += ' close'
      } else {
        className += ' wrong'
      }
    }
    tiles.push(<div key={i} className={className} >{char}</div>)
  }
  return (
    <div className='line'>
      {tiles}
    </div>
  )
}