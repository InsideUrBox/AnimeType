import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import app from '../components/firebase'
import '../index.css'

const auth = getAuth(app)

const SignUp = () => {
    const [navigateHome, setNavigateHome] = useState(false)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false)

    if (navigateHome) {
        return <Navigate to='/' />
    }

    const attemptSignUp = () => {

        if (email && password) {
            createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                const user = userCredential.user
                const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ title: 'Post new user' })
                }
                fetch(`http://localhost:3001/user/${ user.uid }`).then((res) => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            }).catch((err) => {
                const errorCode = err.code
                const errorMessage = err.message
                console.log(errorCode, errorMessage)
            })
        } else {
            console.log('please enter password')
        }
        setNavigateHome(true)
    }

    return (
        <div className='flex justify-center h-screen items-center'>
            <div className='min-w-[300px] w-1/2 bg-gray-800 p-5 text-center text-white rounded-lg'>
                <h1 className='text-3xl mb-5'>
                    Sign Up
                </h1>
                <form onSubmit={attemptSignUp} className='flex flex-col space-y-6'>
                    <label>
                        <input placeholder='Email' required='true' className='text-black w-2/3 p-2 rounded-sm' autoCorrect='false' onChange={(e) => {
                            setEmail(e.target.value)
                        }} value={email}></input>
                    </label>
                    <label>
                        <input placeholder='Username' className='text-black w-2/3 p-2 rounded-sm' autoCorrect='false' onChange={(e) => {
                            setUsername(e.target.value)
                        }} value={username}></input>
                    </label>
                    <label>
                        <input placeholder='Password' required='true' type={showPass ? 'text' : 'password'} onChange={(e) => {
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
        </div>
    )
}

export default SignUp