import React, { useState } from 'react'
import { getAuth } from 'firebase/auth' 
import app from './firebase'
import '../index.css'

const auth = getAuth(app)
const AccountStats = ({ username }) => {
    
    const [stats, setStats] = useState({
        "username" : username,
        "totalGames" : 12313,
        "averageSpeed" : 123,
        "fastestSpeed" : 150
    })
    
    return (
        <div className='mt-4'>
            <ul className='bg-gray-100'>
                <li className='py-4 border-4 border-white'>
                    <h1>Passages Typed:</h1>
                    <strong>{stats.totalGames}</strong>
                </li>
                <li className='py-4 border-4 border-white'>
                    <h1>Average Speed:</h1>
                    <strong>{stats.averageSpeed}WPM</strong>
                </li>
                <li className='py-4 border-4 border-white'>
                    <h1>Fastest Speed:</h1>
                    <strong>{stats.fastestSpeed}WPM</strong>
                </li>
            </ul>

            <div className='text-2xl mt-3'>
                <h2>
                    {`keep up the good work, ${stats.username}!`}
                </h2>
            </div>
        </div>
    )
}

export default AccountStats