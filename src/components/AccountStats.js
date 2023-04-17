import React, { useEffect, useState } from 'react'
import '../index.css'

const AccountStats = ({ account }) => {
    
    const [stats, setStats] = useState({
        username : "",
        totalGames : "",
        averageSpeed : "",
        fastestSpeed: "",
        averageAccuracy: ""

    })

    useEffect(() => {
        if (account !== undefined) {
            setStats({
                username : account.username,
                totalGames : account.racesCompleted,
                averageSpeed : account.averageWPM, 
                fastestSpeed: account.fastestWPM,
                averageAccuracy: account.averageAcc
            })
        }
    }, [account])
    
    return (
        <div className='mt-4'>
            <ul className='border-2'>
                <li className='bg-gray-800 py-3 m-3 border-2 rounded-md'>
                    <h1>Passages Typed:</h1>
                    <strong>{ stats.totalGames }</strong>
                </li>
                <li className='bg-gray-800 py-3 m-3 border-2 rounded-md'>
                    <h1>Average Speed:</h1>
                    <strong>{ stats.averageSpeed }WPM</strong>
                </li>
                <li className='bg-gray-800 py-3 m-3 border-2 rounded-md'>
                    <h1>Fastest Speed:</h1>
                    <strong>{ stats.fastestSpeed }WPM</strong>
                </li>
                <li className='bg-gray-800 py-3 m-3 border-2 rounded-md'>
                    <h1>Average Accuracy:</h1>
                    <strong>{ stats.averageAccuracy }%</strong>
                </li>
            </ul>
        </div>
    )
}

export default AccountStats