import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import app from '../components/firebase'
import '../index.css'

const auth = getAuth(app)

const SignUp = () => {
    const [navigateHome, setNavigateHome] = useState(false)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false)

    const [errorMessage, setErrorMessage] = useState('')
    const [errorVisible, setErrorVisible] = useState(false)

    if (navigateHome) {
        return <Navigate to='/' />
    }

    const attemptSignUp = async (event) => {
        event.preventDefault()
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user    
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    uid: user.uid,
                    username: username
                })
            }
            const response = await fetch('http://localhost:3001/user', requestOptions)
            console.log(response)
            setNavigateHome(true)
            signOut(auth)

        } catch (error) {
            setErrorVisible(true)
            setErrorMessage(error.message.slice(9, error.message.length))
        }
    }

    return (
        <div className='flex justify-center h-screen items-center'>
            <div className='min-w-[300px] w-1/2 bg-gray-800 p-5 text-center text-white rounded-lg'>
                <h1 className='text-3xl mb-5'>
                    Sign Up
                </h1>
                <form onSubmit={attemptSignUp} className='flex flex-col space-y-6'>
                    <label>
                        <input placeholder='Email' required={true} className='text-black w-2/3 p-2 rounded-sm' autoCorrect='false' onChange={(e) => {
                            setEmail(e.target.value)
                        }} value={email}></input>
                    </label>
                    <label>
                        <input placeholder='Username' className='text-black w-2/3 p-2 rounded-sm' autoCorrect='false' onChange={(e) => {
                            setUsername(e.target.value)
                        }} value={username}></input>
                    </label>
                    <label>
                        <input placeholder='Password' required={true} type={showPass ? 'text' : 'password'} onChange={(e) => {
                            setPassword(e.target.value)
                        }} className='text-black w-2/3 p-2 rounded-sm' value={password} autoCorrect='false'></input>
                    </label>
                    <div className='flex justify-center'>
                        <button type='submit' className= 'rounded-sm bg-white text-black w-2/3 p-2' >
                           Sign Up
                        </button>
                    </div>
                </form>
                <div className='flex justify-center'>
                    <div className='flex flex-col w-2/3'>
                        <Link to='/' className='rounded-sm bg-white my-3 text-black p-1'>
                                Return
                        </Link>
                        <button className='text-sm' onClick={() => {
                            setShowPass(!showPass)
                        }}>
                            Show/Hide Password
                        </button>
                    </div>
                </div>
            </div>
            <div className={!errorVisible ? 'hidden' : ' -translate-y-3/4 translate-x-1/2 text-center rounded-lg p-4 bg-gray-200 absolute top-1/2 right-1/2 w-[250px]'}>
                <p className=''>Error: {errorMessage}</p>
                <button className='mt-2 p-2 rounded-lg text-white bg-gray-900 hover:opacity-80' onClick={() => {
                    setErrorVisible(false)
                }}>
                    Try Again
                </button>
            </div>
        </div>
    )
}

export default SignUp