import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Edit() {
    const baseUrl = 'http://127.0.0.1:8081/';

    const [em, setEmployee] = useState({
        uid: '',
        nama:'',
        gender: '',
        tgl_lahir: '',
        tgl_masuk: '',
    })
    const {id} = useParams();
    useEffect(() => {
        axios.get(baseUrl+'employee/'+id)
        .then(res => {
            console.log(res.data)
            setEmployee({
                ...em, 
                uid:res.data.uid,
                nama:res.data.nama,
                gender:res.data.gender,
                tgl_lahir:res.data.tgl_lahir,
                tgl_masuk:res.data.tgl_masuk,
            })
        })
        .catch(err=> console.log(err))
    
    }, [])

    const navigate = useNavigate();
    // uid:'333',
    // nama:'tt',
    // gender:'laki',
    // tgl_lahir:'2023/08/09',
    // tgl_masuk:'2023/08/10',
    const handleUpdate = (event) =>{
        event.preventDefault();
        axios.put(baseUrl+'employee/'+id, em)
        .then(res =>{
            console.log(res)
            navigate('/')
        }).catch(err=>console.log(err))
    }

    const handleInput = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setEmployee({
            ...em, 
            [name]:value
        })
    }


  return (
    <div className='d-flex bg-primary justify-content-center align-items-center'>
            <div className='w-full bg-secondary rounded p-3'>
                <div className='d-flex justify-content-end'>
                </div>
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

                    <button className='btn btn-primary'>Edit</button>
                </form>
            </div>
        </div> 
  )
}

export default Edit