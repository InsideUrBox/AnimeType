import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Quote from './quotes/anime'

const Index = () => {

    return (
        <div>
            <Quote />
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Index />
)