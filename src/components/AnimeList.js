import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Quote from './Quote.js'
import '../index.css'

const quoteSource = 'https://animechan.vercel.app/api/quotes'
const AnimeList = () => {
    const [list, setList] = useState([])

    useEffect(() => {
        const getList = async () => {
            const response = await fetch('https://animechan.vercel.app/api/available/anime')
            const json = await response.json()
            setList(json)
        }

        getList()
    }, [])

    const loadClickedQuote = async (elem) => {
        const chosenAnime = elem.target.innerHTML
        const animeAPI = `https://animechan.vercel.app/api/quotes/anime?title=${chosenAnime}`

        const quoteBox = ReactDOM.createRoot(document.querySelector('#quote-box'))
        quoteBox.render(<Quote source={ animeAPI } />)
    }

    return (
        <div className='h-[calc(100vh-80px)] mt-20'>
            <h1 className='text-xl mb-3 px-2 text-center font-bold font-underline'>
                Anime List
            </h1>
            <ul className='h-3/4 flex flex-auto flex-col overflow-y-scroll border-2'>
                {list.map((elem, index) => {
                    return (
                        <button key={`anime_${index}`} className='py-2 border-2 hover:bg-gray-200 active:bg-gray-300' onClick={loadClickedQuote}>{elem}</button>
                    )
                })}
            </ul>
            <div className='flex flex-auto justify-center mt-3'>
                <button className='hover:bg-gray-200 active:bg-gray-300 border-2 px-4' onClick={() => {
                    const quoteBox = ReactDOM.createRoot(document.querySelector('#quote-box'))
                    quoteBox.render((<Quote source={ quoteSource } />))
                }}>
                    NEW RANDOM QUOTE
                </button>
            </div>   
        </div>
    )
}

export default AnimeList