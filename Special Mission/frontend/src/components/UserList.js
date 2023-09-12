import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';


const UserList = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/user');
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const deleteUser = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/user/${id}`);
            getUsers()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
            {/* <button type='submit' className="button is-success">Add User</button> */}
            <Link to={'add'} className='button is-success'>Add User</Link>
                <table className='table is-stripped is-fullwidth'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Usia</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.nama}</td>
                                <td>{user.email}</td>
                                <td>{user.usia}</td>
                                <td>
                                    <Link to={`edit/${user.id}`} className='button is-small is-info'>Edit</Link>
                                    <button onClick={() => deleteUser(user.id)} className='button is-small is-danger'>Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserList;
