import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { getAuth } from 'firebase/auth'
import app from '../components/firebase'
import AccountStats from './AccountStats'
import '../index.css'

const auth = getAuth(app)

const Quote = ({ source }) => {

    const user = auth.currentUser

    const [quote, setQuote] = useState({
        words: [],
        length: 0,
        character: '',
        anime: ''
    })
    const [index, setIndex] = useState(0)
    const [count, setCount] = useState(0)
    const [value, setValue] = useState('')

    const [timer, setTimer] = useState(false)
    const [seconds, setSeconds] = useState(0.1)
    const [speed, setSpeed] = useState(0)
    const [fastestSpeed, setFastestSpeed] = useState({
        speed: 0,
        word: ""
    })

    useEffect(() => {

        const getQuote = async () => {

                const response = await fetch(source)
                const json = await response.json()

                const numOfQuotes = json.length
                const randomQuote = json[Math.round(Math.random() * (numOfQuotes - 1))]

                const wordList = randomQuote.quote.split(" ")

                setQuote({
                    words: wordList,
                    length: wordList.length,
                    character: randomQuote.character,
                    anime: randomQuote.anime
                })
            }

        getQuote()

    }, [source])

    useEffect(() => {
        if (timer) {
            const startTimer = setInterval(() => {
                setSpeed(Math.round(60 * count / seconds))
                setSeconds(Math.round((seconds + 0.1) * 10) / 10)
                if (speed > fastestSpeed.speed) {
                    setFastestSpeed({
                        speed: speed,
                        word: quote.words[index]
                    })
                }
            }, 100)
            return () => clearInterval(startTimer);
        } 
    }, [timer, seconds])

    const nextWord = (word) => {
        const currentWord = document.getElementById(`word#${index + 1}`).style
        const previousWord = document.getElementById(`word#${index}`).style
        const current = quote.words[index]

        if (word === current) {
            setCount(count + 1)
        } else {
            previousWord.color = "red"
        }

        currentWord.textDecoration = "underline"
        currentWord.textDecorationColor = "white"
        previousWord.textDecoration = "none"

        setValue('')
        setIndex(index + 1)
    }

    const typingComplete = async () => {
        const accuracy = Math.round(100 * (1 + count) / quote.length)

        document.getElementById("acc").innerHTML += `   Accuracy: ${accuracy}%!`
        document.getElementById("typing-test-input").hidden = true
        document.getElementById("anime-info").style.display = "initial"

        if (user !== null) {
            try {
                const requestOptions = {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        uid: user.uid,
                        WPM: speed,
                        acc: accuracy
                    })
                }
                const response = await fetch('http://localhost:3001/user', requestOptions)
                const json = await response.json()

                const root = ReactDOM.createRoot(document.getElementById('account-stats'))
                root.render(<AccountStats account={ json } />)
            } catch (error) {
                console.log(error)
            }
        }

        setValue('')
        setTimer(false)
    }

    const typingInput = (event) => {
        const input  = event.target.value
        const lastInput = input[input.length - 1]
        const current = quote.words[index]

        const currentWord = document.getElementById(`word#${index}`)
        const letters = [].slice.call(currentWord.children)
        if (index === quote.length - 1 && input === current) {
            letters[letters.length - 1].style.color = "green"
            typingComplete()
        } else if (lastInput === " ") {
            const enteredWord = input.slice(0, input.length - 1)
            nextWord(enteredWord)
        } else {
            setValue(input)
            const correct = current.slice(0, input.length)

            if (input.length > current.length) {
                currentWord.style.color = "red"
            }

            if (input.slice(0, input.length) === correct) {
                const typedLetters = letters.slice(0, input.length)
                const remainingLetters = letters.slice(input.length, current.length)

                typedLetters.forEach(elem => {
                    elem.style.color = "green"
                })
                remainingLetters.forEach(elem => {
                    elem.style.color = "white"
                })

                currentWord.style.textDecorationColor = "green"
            } else {
                const remainingLetters = [].slice.call(currentWord.children)
                remainingLetters.slice(0, current.length).forEach(elem => {
                    elem.style.color = "red"
                })
                currentWord.style.color = "red"
                currentWord.style.textDecorationColor = "red"
            }
        }
    }

    return (
        <div className='mx-3'>
            <div className='mt-3 border'>
                <p className='m-3 text-lg sm:text-2xl'>
                    { quote.words.map((elem, index) => {
                        const parent_index = index
                        return (
                            <>
                            <span key={ `space#${index}` }> </span>
                            <span className={index === 0 ? 'underline' : ''} id={ `word#${ index }` } key={ `word#${ index }` }>{ elem.split('').map((elem, index) => {
                                return (<span id={ `${ parent_index }-${ index }` } key={ index }>{ elem }</span>)
                            }) }</span>
                            </>
                        )
                    }) }
                </p>
            </div>
            <div className='mt-2'>
                <div className='flex flex-row text-xl'>
                    <div>
                        <form spellCheck="false" onSubmit={(e) => {
                            e.preventDefault()
                        }} id="typing-test-input">
                            <label>
                                Type here
                                <input type="text" className="text-black rounded-sm ml-2 bg-gray-200" value={value} onChange={(e) => {
                                    typingInput(e)
                                    if (timer === false) {
                                        setTimer(true)
                                    }                     
                                }} />
                            </label>    
                        </form>
                        <p id="speed">
                            Speed: { speed } WPM
                        </p>
                        <p id="acc">
                            
                        </p>
                    </div>
                    
                </div>
                <div className='mt-5 flex flex-row'>
                    <div id="anime-info" className='hidden '>
                        <p>
                            The quote you just typed is by {quote.character}, from the anime {quote.anime}.   
                        </p>
                        <hr className='my-3' />
                        <div className='text-center'>
                            <p>
                                Fastest Speed: <strong>{fastestSpeed.speed}WPM</strong>
                            </p>
                            <p>
                                Reached at the word: <strong>{fastestSpeed.word}</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default Quote