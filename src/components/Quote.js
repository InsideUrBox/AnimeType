import React, { useEffect, useState } from 'react'
import '../index.css'


const Quote = ({ source }) => {
    const [length, setLength] = useState(0)
    const [index, setIndex] = useState(1)
    const [count, setCount] = useState(0)
    const [words, setWords] = useState([])
    const [info, setInfo] = useState({})
    const [value, setValue] = useState('')
    const [current, setCurrent] = useState(0)
    const [letterIndex, setLetterIndex] = useState(0)

    const [timer, setTimer] = useState(false)
    const [seconds, setSeconds] = useState(0.1)
    const [speed, setSpeed] = useState(0)

    useEffect(() => {
        const getQuote = async () => {

                const response = await fetch(source)
                const json = await response.json()

                const num = json.length
                const randomQuote = json[Math.round(Math.random() * (num - 1))]
                const wordList = randomQuote.quote.split(" ")
                const firstWord = wordList[0]

                setLength(wordList.length)
                setWords(wordList)
                setInfo(randomQuote)
                setCurrent(firstWord)
            }
            getQuote()



    }, [source])

    useEffect(() => {
        if (timer) {
            const startTimer = setInterval(() => {
                setSpeed(Math.round(60 * count / seconds))
                setSeconds(seconds + 0.1)

            }, 100)

            return () => clearInterval(startTimer);
        } 
    }, [timer, seconds])


    const nextWord = (word) => {
        const currentWord = document.getElementById(`${index}`).style
        const previousWord = document.getElementById(`${index - 1}`).style

        if (word === current) {
            setCount(count + 1)
            previousWord.color = "green"
        } else {
            previousWord.color = "red"
        }

        currentWord.textDecoration = "underline"
        previousWord.textDecoration = "none"

        setValue('')
        setIndex(index + 1)
        setCurrent(words[index])
        setLetterIndex(0)
    }

    const typingComplete = () => {
        const accuracy = Math.round(100 * (1 + count) / length)
        const lastWord = document.getElementById(`${length - 1}`).style

        document.getElementById("acc").innerHTML += `   Congratulations, you typed that passage with an accuracy of ${accuracy}%!`
        document.getElementById("typing-test-input").hidden = true
        document.getElementById("anime-info").style.display = "initial"
        lastWord.color = "green"

        setCurrent('')
        setValue('')
        setTimer(false)
    }


    const typingInput = (event) => {
        const input  = event.target.value

        if (index === words.length && input === current) {
            typingComplete()
        } else if (input[input.length - 1] === " " && current ) {
            const enteredWord = input.slice(0, input.length - 1)
            nextWord(enteredWord)
        } else {
            setValue(input)

            const currentWord = document.getElementById(`${index - 1}`).style
            if (input.slice(0, letterIndex) !== current.slice(0, letterIndex)) {
                currentWord.color = "red"
            } else {
                currentWord.color = "green"
            }
            setLetterIndex(input.length + 1)
        }
    }


    return (
        <div>
            <div className='mt-3 border'>
                <p className='m-3'>
                    {words.map((elem, index) => {
                        return (<span key={index} id={index}> {`${elem}`} </span>)
                    })}
                </p>
            </div>
            <div className='mt-2'>
                <div className='flex flex-row'>
                    <div>
                        <form spellCheck="false" id="typing-test-input">
                            <label>
                                Type Here: 
                                <input type="text" className="rounded-sm ml-2 bg-gray-200" value={value} onChange={(e) => {
                                    typingInput(e)
                                    if (timer === false && current === words[0]) {
                                        setTimer(true)
                                        document.getElementById('0').style.textDecoration = "underline"
                                    }                     
                                }} />
                            </label>    
                        </form>
                        <span id="acc">
                            {speed} WPM
                        </span>
                    </div>
                    
                </div>
                <div className='mt-5 flex flex-row'>
                    <div id="anime-info" className='w-3/4 hidden'>
                        The quote you just typed is by {info.character}, from the anime {info.anime}.   
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default Quote