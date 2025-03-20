import { useState, useEffect } from "react";

function Line({ guess, isFinal, solution }) {
    const GUESS_LENGTH = 5;
    const tiles = [];
    const [bounceClasses, setBounceClasses] = useState(Array(GUESS_LENGTH).fill(""));
    const [tileClasses,setTileClasses] = useState(Array(GUESS_LENGTH).fill("")); 
    const [flipClass, setFlipClass] = useState('');
    const [prevGuess, setPrevGuess] = useState("");
    for (let i = 0; i < GUESS_LENGTH; i++) {
        const char = guess[i];

        if (isFinal) {
            setTimeout(() => {
                setFlipClass(' flipper'); 
            }, 0);

            setTimeout(() => {
                if (char === solution[i]) {
                    tileClasses[i] = ' correct';
                } else if (solution.includes(char)) {
                    tileClasses[i] = ' close';
                } else {
                    tileClasses[i] = ' wrong';
                }
                setTileClasses([...tileClasses]);
            }, 350);
        }

        tiles.push(
            <div key={i} className={`tile ${tileClasses[i]} ${bounceClasses[i]} ${flipClass}`}>
                {char}
            </div>
        );
    }


    useEffect(() => {
        let newBounceClasses = [...bounceClasses];

        for (let i = 0; i < GUESS_LENGTH; i++) {
            if (guess[i] && guess[i] !== prevGuess[i]) {
                newBounceClasses[i] = "jumper";
            } else {
                newBounceClasses[i] = "";
            }
        }
        setBounceClasses(newBounceClasses);
        setPrevGuess(guess);
        return;
    }, [guess]);

    return (
        <div className='line'>
            {tiles}
        </div>
    )
}

export default Line


