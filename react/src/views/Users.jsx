import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useSateContext } from '../contexts/ContextProvider';

function Users() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useSateContext();

    useEffect(() => {
        getUsers()
    }, [])

    const onDelete = (u) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return
        }

        axiosClient.delete(`/products/${u.id}`)
            .then(() => {
                setNotification('Product was successfully deleted');

                getUsers()
            })
    }

    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/products')
            .then(({ data }) => {
                setLoading(false)
                console.log(data);
                setUsers(data.data)

            })

            .catch(() => {
                setLoading(false)
            })
    }

    return (
        <div >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Products</h1>
                <Link to='/products/new' className='btn-add'>Add New</Link>
            </div>

            <div className='card animated fadeInDown'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Create Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    {loading && <tbody>

                        <tr>
                            <td colSpan="5" className='text-center'>
                                Loading...
                            </td>
                        </tr>
                    </tbody>}
                    {!loading && <tbody>
                        {users.map(u => (
                            <tr>

                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.description}</td>
                                <td>{u.price}</td>
                                <td>{u.created_at}</td>
                                <td>
                                    <Link to={'/products/' + u.id} className="btn-edit">Edit</Link>
                                    &nbsp;
                                    <button onClick={ev => onDelete(u)} className='btn-delete'>Delete</button>
                                </td>


                            </tr>
                        ))}
                    </tbody>}
                </table>
            </div>
        </div >
    )
}

export default Users
