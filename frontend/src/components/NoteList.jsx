import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import { format } from 'timeago.js';

const NoteList = () => {
    const [notas, setNotas]= useState([]);

    useEffect(()=>{
        getNotas();
    },[]);    

    const getNotas = async() => {
        try {
            const response = await Axios.get('http://localhost:4000/api/notes/');
            setNotas(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteNote = async(id) => {
        try {
            await Axios.delete(`http://localhost:4000/api/notes/${id}`);
            await getNotas();
            //alert("nota eliminada");
        } catch (error) {
            console.log(error);
        }
        
    }

    return (
        <div className="row">
            {
                notas.map(nota => (
                    <div className="col-md-4 p-2" key={nota._id}>
                        <div className="card">
                            <div className="card-header">
                                <h1>{nota.title}</h1>
                            </div>
                            <div className="card-body">
                                <h5>{nota.content}</h5>
                                <p>{nota.author}</p>
                                <span>{format(nota.date)}</span>
                            </div>
                            <div className="card-footer d-flex justify-content-between">
                                <button className="btn btn-danger" onClick={() => {deleteNote(nota._id)}}>
                                    Delete
                                </button>
                                <Link className="btn btn-success" to={`/edit/${nota._id}`}>
                                    Edit
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default NoteList;