import { useState, useEffect } from "react";

function Line({ guess, isFinal, solution }) {
    const GUESS_LENGTH = 5;

    // State for tile colors and bounce animation
    const [tileClasses, setTileClasses] = useState(Array(GUESS_LENGTH).fill("tile"));
    const [bounceClasses, setBounceClasses] = useState(Array(GUESS_LENGTH).fill(""));
    const [prevGuess, setPrevGuess] = useState("");

    useEffect(() => {
        if (isFinal) {
            const newClasses = guess.split("").map((char, i) => {
                if (char === solution[i]) return "tile correct";
                if (solution.includes(char)) return "tile close";
                return "tile wrong";
            });
            setTileClasses(newClasses);
        }
    }, [isFinal, guess, solution]);

    useEffect(() => {
        let newBounceClasses = [...bounceClasses];

        for (let i = 0; i < GUESS_LENGTH; i++) {
            if (guess[i] && guess[i] !== prevGuess[i]) {
                // Only animate the NEWLY added letter
                newBounceClasses[i] = "jumper";
            }
        }

        setBounceClasses(newBounceClasses);
        setPrevGuess(guess); // Update previous guess for next comparison

        // Remove animation after 300ms
        const timeout = setTimeout(() => {
            setBounceClasses(Array(GUESS_LENGTH).fill(""));
        }, 300);

        return () => clearTimeout(timeout);
    }, [guess]); // Runs only when `guess` changes

    return (
        <div className="line">
            {Array.from({ length: GUESS_LENGTH }).map((_, i) => (
                <div key={i} className={`${tileClasses[i]} ${bounceClasses[i]}`}>
                    {guess[i] || ""}
                </div>
            ))}
        </div>
    );  
}

export default Line;
