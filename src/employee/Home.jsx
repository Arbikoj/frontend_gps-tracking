import { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Layout from '../layout/Layout';

function Home() {
    const baseUrl = 'http://127.0.0.1:8081/';
    const [data, setData]= useState([])


    const fetchData = () => {
        axios.get(baseUrl+'employee')
        .then(res=>setData(res.data))
        .catch(err=> console.log(err));
    }

    const handleDelete = (id) =>{
        axios.delete(baseUrl+'employee/'+id)
        .then(res=>{
            console.log(res);
            // location.reload();
            {fetchData()}
        }).catch(err=>console.log(err))
    }

    // modal
    const [show, setShow] = useState(false);
    const [updateshow, setShowUpdate] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);    
    const handleClose1 = () => setShowUpdate(false);

const initialState = {
    id:'',
    uid:'',
    nama:'',
    gender:'',
    tgl_lahir:'',
    tgl_masuk:'',
}

    const [em, setEmployee] = useState(initialState)

    const clearState = () => {
        setEmployee({ ...initialState });
    };

    const handleInput = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setEmployee({
            ...em, 
            [name]:value
        })
        console.log(em);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(baseUrl+'employee', em)
        .then(res => {
            console.log(res);
            // navigate('/');
            {handleClose()}
            {fetchData()}
            {clearState()}
        })
        .catch(err => console.log(err))
    }

    // const {id} = useParams();
    const handleGetById = (id) =>{
        {setShowUpdate(true)}
        axios.get(baseUrl+'employee/'+id)
        .then(res => {
            console.log(res.data)
            setEmployee({
                ...em, 
                id:res.data.id,
                uid:res.data.uid,
                nama:res.data.nama,
                gender:res.data.gender,
                tgl_lahir:res.data.tgl_lahir,
                tgl_masuk:res.data.tgl_masuk,
            })
        })
        .catch(err=> console.log(err))
    }

    const handleUpdate = (event) =>{
        event.preventDefault();
        axios.put(baseUrl+'employee/'+em.id, em)
        .then(res =>{
            console.log(res)
            {handleClose1()}
            {fetchData()}
        }).catch(err=>console.log(err))
    }

    useEffect(()=>{
        fetchData();
    }, [])

    return (
        <Layout>
        <div className='d-flex justify-content-center align-items-center'>
            <div className='w-full rounded p-3'>
                {/* modal Add */}

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Tambah Employee</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div className='w-full rounded p-3'>
                        <form onSubmit={handleSubmit}>
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
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={updateshow} onHide={handleClose1}>
                    <Modal.Header closeButton>
                    <Modal.Title>Update Employee</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div className='w-full rounded p-3'>
                        <form onSubmit={handleUpdate}>
                            <h2>Update employee</h2>
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

                            <button className='btn btn-primary'>Update</button>
                        </form>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose1}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>


                <div className='d-flex justify-content-end'>
                    <button onClick={handleShow} className='btn btn-primary my-2'>Tambah</button>
                </div>
                <table className='table bg-primary'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>uid</th>
                            <th>nama</th>
                            <th>tgl lahir</th>
                            <th>tgl masuk</th>
                            <th>aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((em,index)=>{
                            return <tr key={index}>
                                <td>{em.id}</td>
                                <td>{em.uid}</td>
                                <td>{em.nama}</td>
                                <td>{em.tgl_lahir}</td>
                                <td>{em.tgl_masuk}</td>
                                <td>
                                    <button onClick={()=>handleGetById(em.id)} className='mx-2 btn btn-secondary'>Edit</button>
                                    <button onClick={()=>handleDelete(em.id)} className='mx-2 btn btn-danger'>Delete</button>
                                    <Link to={`/em/${em.id}`} className='mx-2'>View</Link>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>  
        </Layout>
    )
}

export default Home