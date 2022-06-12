import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AccountStats from './AccountStats'
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import app from './firebase'
import '../index.css'

const auth = getAuth(app)

const Account = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [userInfo, setUserInfo] = useState({})
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (loggedIn) {
        }

    }, [setLoggedIn, loggedIn])

    const loginAttempt = () => {
        signInWithEmailAndPassword(auth, username, password).then((userCredential) => {
            const user = userCredential.user
            console.log(user)
            document.getElementById('login-fail').style.display = "none"

            setLoggedIn(true)
            setUserInfo(user.email)
            setUsername('')
            setPassword('')
        }).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode, errorMessage)
            document.getElementById('login-fail').style.display = "initial"
        })
    }

    return (
        <div className='flex flex-col justify-center mt-3'>
            <div id="account-info" className='p-3 mt-14'>
                <h1 className='text-xl text-center font-bold'>
                    Account Stats
                </h1>
                <div className='text-center'>
                    {loggedIn ? <AccountStats username={ userInfo } />: 'please login to see account stats'}
                </div>
            </div>
            <div className='mt-2 flex justify-center'>
                <div className={loggedIn ? 'hidden' :  'h-36 w-1/6 min-w-[215px] bg-gray-800 rounded-lg'}>
                    <form spellCheck='false' className='h-3/4'>

                        <label className='relative top-5 p-3 text-white w-1/2'>
                            Username: <input onChange={(elem) => {
                                setUsername(elem.target.value)
                            }} value={username} className='w-1/2 text-black'></input>
                        </label>

                        <label className='relative top-10  p-3 text-white w-1/2'>
                            Password: <input type='password' onChange={(elem) => {
                                setPassword(elem.target.value)
                            }} value={password} className='relative left-1 w-1/2 text-black'></input>
                        </label>
                        
                    </form>
                    <div className='text-white text-sm mx-4 space-x-2'>
                        <button className='hover:opacity-60' onClick={loginAttempt}>
                            Login
                        </button>
                        <Link to='/signup' className='hover:opacity-60 active:opacity-40'>
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
            <div className='text-center hidden my-5 ' id='login-fail'>
                Incorrect Email/Password
            </div>
            <div className={(!loggedIn) ? 'hidden' : 'text-center'}>
                <button onClick={() => {
                        signOut(auth).then(() => {
                            console.log('sign out sucessful')
                        }).catch((error) => {
                            console.log(error)
                        })
                        setLoggedIn(false)
                    }}>
                        Sign Out
                </button>
            </div>
        </div>
    )
}

export default Account