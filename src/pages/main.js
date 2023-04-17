import React from 'react'
import Quote from '../components/Quote'
import Header from '../components/Header'
import AnimeList from '../components/AnimeList'
import Account from '../components/Account'


const quoteSource = 'https://animechan.vercel.app/api/quotes'
const Main = () => {
    
    return (
        <div>
            <div className='flex center bg-gray-700 text-white'>
                <div className='bg-gradient-to-r from-gray-800 w-1/4 px-4 border-2'>
                    <AnimeList />
                </div>
                <div className='w-1/2'>
                    <Header />
                    <div id='quote-box'>
                        <Quote source={ quoteSource }/>
                    </div>
                </div>  
                <div className='bg-gradient-to-l from-gray-800 w-1/4 border-2'>
                    <Account />
                </div>
            </div>
            <div>
                something
            </div>
        </div>

    )
}

export default Main