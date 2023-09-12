import axios from 'axios'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const AddUser = () => {
    const [nama, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPass] = useState("")
    const [usia, setUsia] = useState()

    const navigate = useNavigate()

    const saveUser = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:5000/user', {
                nama,email,password,usia
            })
            navigate('/')
        } catch (error) {
            console.log(error)            
        }
    }

  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <form onSubmit={saveUser}>
                <div className='field'>
                    <label className="label">Nama</label>
                    <div className="control">
                        <input type="text" className="input" value={nama} onChange={(e) => setName(e.target.value)}/>
                    </div>
                </div>
                <div className='field'>
                    <label className="label">Email</label>
                    <div className="control">
                        <input type="text" className="input" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                </div>
                <div className='field'>
                    <label className="label">Password</label>
                    <div className="control">
                        <input type="text" className="input" value={password} onChange={(e) => setPass(e.target.value)}/>
                    </div>
                </div>
                <div className='field'>
                    <label className="label">Usia</label>
                    <div className="control">
                        <input type="number" className="input" value={usia} onChange={(e) => setUsia(e.target.value)}/>
                    </div>
                </div>
                <div className='field'>
                    <button type='submit' className="button is-success">Save</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddUser