import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useSateContext } from '../contexts/ContextProvider';

function Signup() {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useSateContext();


    const onSubmit = (ev) => {
        ev.preventDefault()

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }

        axiosClient.post('/signup', payload)
            .then(({ data }) => {
                setUser(data.user)
                setToken(data.token)
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status == 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
                }
            })
    }



    return (
        <div className='login-signup-form animated fadeInDown'>
            <div className="form">
                <h1 className="title">Login into your account</h1>
                {errors && <div className='alert'>
                    {Object.keys(errors).map(key => (
                        <p>{errors[key][0]}</p>
                    ))}
                </div>}
                <form onSubmit={onSubmit}>
                    <input ref={nameRef} type="text" placeholder='Full Name' />
                    <input ref={emailRef} type="email" placeholder='Email' />
                    <input ref={passwordRef} type="password" placeholder='Password' />
                    <input ref={passwordConfirmationRef} type="password" placeholder='Password Confirmation' />

                    <button className="btn btn-block">Sign up</button>

                    <p className='message'>
                        Already Registered?  <Link to="/login">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup
