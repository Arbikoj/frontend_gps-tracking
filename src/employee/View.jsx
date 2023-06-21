import {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios';

function View() {
    const baseUrl = 'http://127.0.0.1:8081/';
    const {id} = useParams();
    const [employee, setEm] = useState([]);
    useEffect(() => {
        axios.get(baseUrl+'employee/'+id)
        .then(res => {
            console.log(res.data);
            setEm(res.data);
        })
        .catch(err=> console.log(err))
    
    }, [])
    
    return (
        <><div>View</div>
        {/* {employee.map ((val, key) =>{
            return(
                <div key={key} className='rounded p-3'>
                <h2>Detail</h2>
                <h3>{val.id}</h3>
                <h3>{val.nama}</h3>
                <h3>{val.gender}</h3>
                <h3>{val.tgl_lahir}</h3>
                <h3>{val.tgl_masuk}</h3>

                <Link to="/" className="btn btn-primary">Back</Link>
                <Link to={`/emp/${val.id}`} className='btn btn-secondary'>Edit</Link>
            </div>
            )
        })} */}

        {/* {employee.nama} */}

                <h2>Detail</h2>
                <h3>{employee.id}</h3>
                <h3>{employee.nama}</h3>
                <h3>{employee.gender}</h3>
                <h3>{employee.tgl_lahir}</h3>
                <h3>{employee.tgl_masuk}</h3>
                <Link to="/" className="btn btn-primary">Back</Link>
                <Link to={`/edit/${employee.id}`} className='btn btn-secondary'>Edit</Link>

        {/* {employee.length > 0 &&(
            <div>detail
                {employee.map(emp=>(
                    <div key={emp.id}>{emp.nama}</div>
                ))}
            </div>
        )} */}
        </>
    )
}

export default View