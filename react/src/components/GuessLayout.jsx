import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSateContext } from '../contexts/ContextProvider'

function GuessLayout() {

    const { token } = useSateContext();
    if (token) {
        return <Navigate to="/" />
    }
    return (
        <div>

            <Outlet />
        </div>
    )
}

export default GuessLayout
