import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useSateContext } from '../contexts/ContextProvider';

function UserForm() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    const { setNotification } = useSateContext();


    const [user, setUser] = useState({
        id: null,
        name: '',
        slug: 'this is the slug',
        description: '',
        price: null,

    })

    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/products/${id}`)
                .then(({ data }) => {
                    setLoading(false)
                    setUser(data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }


    const onSubmit = (ev) => {
        ev.preventDefault()

        if (user.id) {
            axiosClient.put(`/products/${user.id}`, user)
                .then(() => {
                    setNotification('Product was successfully updated');
                    navigate('/users')
                })

                .catch(err => {
                    const response = err.response;
                    if (response && response.status == 422) {
                        console.log(response.data.errors);
                        setErrors(response.data.errors);
                    }
                })
        } else {

            axiosClient.post(`/products`, user)
                .then(() => {
                    setNotification('A product was successfully added');
                    navigate('/users')
                })

                .catch(err => {
                    const response = err.response;
                    if (response && response.status == 422) {
                        console.log(response.data.errors);
                        setErrors(response.data.errors);
                    }
                })

        }
    }
    return (
        <>
            {user.id && <h1>Update Product: {user.name}</h1>}
            {!user.id && <h1>New Product</h1>}

            <div className="card animated fadeInDown">
                {loading && (
                    <div className='text-center'>Loading...</div>
                )}

                {errors && <div className='alert'>
                    {Object.keys(errors).map(key => (
                        <p>{errors[key][0]}</p>
                    ))}
                </div>}

                {!loading &&
                    <form onSubmit={onSubmit}>
                        <input type="text" value={user.name} onChange={ev => setUser({ ...user, name: ev.target.value })} placeholder='Name' />
                        <input type="text" value={user.description} onChange={ev => setUser({ ...user, description: ev.target.value })} placeholder='Description' />
                        <input type="text" value={user.price} onChange={ev => setUser({ ...user, price: ev.target.value })} placeholder='Price' />

                        <button className='btn'>Save</button>

                    </form>
                }
            </div>

        </>
    )
}

export default UserForm
