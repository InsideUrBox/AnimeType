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

        const root = ReactDOM.createRoot(document.querySelector('#quote-box'))
        root.render(<Quote source={ animeAPI } />)
        
    }

    return (
        <div className='h-[calc(100vh-60px)] mt-14'>
            <h1 className='text-xl mb-5 px-2 text-center font-bold font-underline'>
                Anime List
            </h1>
            <ul className='h-4/6 flex flex-auto flex-col items-center overflow-y-scroll border-2'>
                {list.map((elem, index) => {
                    return (
                        <button key={`anime_${index}`} className='rounded-md w-11/12 bg-gray-800 active:bg-gray-700 hover:bg-gray-600 hover:drop-shadow-[0_0_10px_#6b7280] py-3 border-2 my-1' onClick={loadClickedQuote}>{elem}</button>
                    )
                })}
            </ul>
            <div className='flex flex-auto justify-center mt-3'>
                <button className='hover:bg-orange-400 active:bg-orange-600 bg-orange-500 hover:drop-shadow-[0_0_10px_rgb(255,109,10)] rounded-md py-3  w-full' onClick={() => {
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