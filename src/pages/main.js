import React from 'react'
import Quote from '../components/Quote'
import Header from '../components/Header'
import AnimeList from '../components/AnimeList'
import Account from '../components/Account'


const quoteSource = 'https://animechan.vercel.app/api/quotes'
const Main = () => {
    
    return (
    <div className='flex center'>
        <div className='w-1/4 mr-4 px-4 border-2'>
            <AnimeList />
        </div>
        <div className='w-1/2 mt-3'>
            <Header />
            <div id='quote-box'>
                <Quote source={ quoteSource }/>
            </div>
        </div>  
        <div className='w-1/4 ml-4 border-2'>
            <Account />
        </div>
    </div>

    )
}

export default Main