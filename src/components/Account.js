import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Link } from 'react-router-dom'
import AccountStats from './AccountStats'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import app from './firebase'
import '../index.css'

const auth = getAuth(app)

const Account = () => {

    const [loading, setLoading] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginAttempt = async (e) => {
        e.preventDefault()

        setLoading(true)
        const errorMessage = document.getElementById('login-fail')
        try {
            const userCredential = await signInWithEmailAndPassword(auth, username, password)
            const user = userCredential.user
            const response = await fetch(`http://localhost:3001/user/${user.uid}`)
            const json = await response.json()

            const root = ReactDOM.createRoot(document.getElementById('account-stats'))
            root.render(<AccountStats account={ json } />)

            setLoggedIn(true)
            errorMessage.style.display = "none"
        } catch (error) {
            console.log(error.message)
            errorMessage.style.display = "initial"
            errorMessage.innerHTML = error.message.slice(9, error.message.length)
        }
        setUsername('')
        setPassword('')
        setLoading(false)
    }

    return (
        <div className='flex flex-col justify-center mt-3'>
            <div id="account-info" className='p-3 mt-8'>
                <h1 className='text-xl text-center font-bold'>
                    Account Stats
                </h1>
                <div id='account-stats' className='text-center'>
                </div>
            </div>
            <div className='mt-2 flex justify-center overflow-x-scroll'>
                <div className={loggedIn ? 'hidden' :  'h-36 w-1/6 min-w-[215px] bg-gray-800 rounded-lg'}>
                    <form onSubmit={loginAttempt} spellCheck='false' className='h-3/4'>
                        <label className='relative top-5 p-3 left-[35px] text-white w-1/2'>
                            Email: <input onChange={(elem) => {
                                setUsername(elem.target.value)
                            }} value={username} className='w-1/2 text-black'></input>
                        </label>
                        <label className='relative top-10  p-3 text-white w-1/2'>
                            Password: <input type='password' onChange={(elem) => {
                                setPassword(elem.target.value)
                            }} value={password} className='relative left-1 w-1/2 text-black'></input>
                        </label>
                        <div className='text-white text-sm mx-4 space-x-2 relative top-14'>
                            <button className='hover:opacity-60 active:opacity-40'>
                                Login
                            </button>
                            <Link to='/signup' className='hover:opacity-60 active:opacity-40'>
                                Sign Up
                            </Link>
                            <div >
                                <svg role="status" className={loading ? 'w-6 relative left-36 bottom-7 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white' : 'hidden'} viewBox="0 0 100 101" fill="none">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                                </svg>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className='text-center my-5 hidden' id='login-fail'>
                Incorrect Email/Password
            </div>
            <div className={(!loggedIn) ? 'hidden' : 'mx-3 mb-1 text-center'}>
                <button className='p-3 hover:bg-orange-400 active:bg-orange-600 bg-orange-500 hover:drop-shadow-[0_0_10px_rgb(255,109,10)] rounded-lg w-full h-full' onClick={async () => {
                        try {
                            await signOut(auth)
                            document.getElementById('account-stats').innerHTML = "signed out successfully"
                        } catch (error) {
                            console.log(error)
                        }
                        setLoggedIn(false)
                    }}>
                        Sign Out
                </button>
            </div>
        </div>
    )
}

export default Account