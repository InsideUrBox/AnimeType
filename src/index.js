import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import Main from './pages/main'
import SignUp from './pages/signup'
import app from './components/firebase'

const auth = getAuth(app)

const Index = () => {

    useEffect(() => {
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main />}/>
                <Route path='/signup' element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<Index />)