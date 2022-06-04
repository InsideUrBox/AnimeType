import React, { useEffect, useState } from 'react'


const Quote = () => {
    const [length, setLength] = useState(0)
    const [index, setIndex] = useState(1)
    const [count, setCount] = useState(0)
    const [words, setWords] = useState([])
    const [quote, setQuote] = useState('')
    const [info, setInfo] = useState({})
    const [value, setValue] = useState('')
    const [wordLength, setWordLength] = useState(0)
    const [current, setCurrent] = useState(quote.split(" ")[1])

    useEffect(() => {
        const getQuote = async () => {
            const response = await fetch('https://animechan.vercel.app/api/random')
            const json = await response.json()
            const wordList = json.quote.split(" ")
            const firstWord = wordList[0]

            setWords(wordList)
            setLength(wordList.length)
            setQuote(json.quote)
            setInfo(json)
            setCurrent(firstWord)
            setWordLength(firstWord.length)
        }
        getQuote()
    }, [])

    const checkWord = (word) => {
        if (word === current) {
            setCount(count + 1)
            document.getElementById(`${index - 1}`).style.color = "green"
        } else {
            document.getElementById(`${index - 1}`).style.color = "red"
        }
        if (index === length) {
            const accuracy = computeAccuracy()
            document.getElementById('acc').innerHTML = `You just typed that quote with ${accuracy}% accuracy!`
        }
        console.log(index)
        setIndex(index + 1)
        setCurrent(quote.split(" ")[index])
    }

    const computeAccuracy = () => {
        return Math.round(100 * count / length)
    }

    const updateValue = (event) => {
        const updated = event.target.value
        if (updated[updated.length - 1] === " ") {
            const enteredWord = updated.slice(0, updated.length - 1)
            checkWord(enteredWord)
            setValue('')
            setWordLength(quote.split(" ")[index].length)

        } else {
            setValue(updated)
        }
    }


    return (
        <div className='bg-gray-100 w-5/6 '>
            <div className=''>
                {words.map((elem, index) => {
                    return (<span id={index}> {`${elem} `} </span>)
                })}
            </div>
            <div className='bg-red-100'>
                This quote is by {info.character}, from the anime {info.anime}. 
            </div>
            <hr />
            <form spellCheck="false">
                <label>
                    Type Here: 
                    <input type="text" value={value} onChange={updateValue} />
                </label>
            </form>
            <div>
                {count}
            </div>
            <div>
                {current}
            </div>
            <div>
                {length}
            </div>
            <div>
                {wordLength}
            </div>
            <div id="acc">

            </div>
        </div>
    )
} 

export default Quote