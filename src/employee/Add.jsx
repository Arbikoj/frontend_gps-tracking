import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Add() {
    const baseUrl = 'http://127.0.0.1:8081/';
    const [em, setEmployee] = useState({
        uid:'',
        nama:'',
        gender:'',
        tgl_lahir:'',
        tgl_masuk:'',
    })

    const navigate = useNavigate();

    const handleInput = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setEmployee({
            ...em, 
            [name]:value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(baseUrl+'employee', em)
        .then(res => {
            console.log(res);
            navigate('/')
        })
        .catch(err => console.log(err))
    }
    return (
    <div className='d-flex bg-primary justify-content-center align-items-center'>
            <div className='w-full bg-secondary rounded p-3'>
                <div className='d-flex justify-content-end'>
                    <Link to="/create"><button className='btn btn-primary my-2'>Tambah</button></Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <h2>Tambah employee</h2>
                    <div className='mb-2'>
                        <label htmlFor="">UID</label>
                        <input onChange={handleInput} value={em.uid} name='uid' type="text" placeholder='UID' className='form-control'/>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="">Nama</label>
                        <input onChange={handleInput} value={em.nama} name='nama' type="text" placeholder='Nama..' className='form-control'/>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="">JK</label>
                        <select onChange={handleInput} value={em.gender} name='gender' className='form-select'>
                            <option>Jenis Kelamin</option>
                            <option>Laki-Laki</option>
                            <option>Perempuan</option>
                        </select>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="">Tgl Lahir</label>
                        <input onChange={handleInput} value={em.tgl_lahir} name='tgl_lahir' type="date" placeholder='Nama..' className=''/>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="">Tgl Masuk</label>
                        <input onChange={handleInput} value={em.tgl_masuk} name='tgl_masuk' type="date" placeholder='Nama..' className=''/>
                    </div>

                    <button className='btn btn-primary'>Add</button>
                </form>
            </div>
        </div> 
    )
}

export default Add