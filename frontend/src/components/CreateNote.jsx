import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
//import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

export default class CreateNote extends Component {
    state = {
        title: '',
        content: '',
        date: new Date(),
        userSelected: '',
        users: [],
        editing: false,
        _id: ''
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:4000/api/users');
        if (res.data.length > 0) {
            this.setState({
                users: res.data.map(user => user.userName),
                userSelected: res.data[0].userName
            })
        }
        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get(`http://localhost:4000/api/notes/${this.props.match.params.id}`);
            console.log(res.data)
            this.setState({
                title: res.data.title,
                content: res.data.content,
                date: new Date(res.data.date),
                userSelected: res.data.author,
                _id: res.data._id,
                editing: true
            });
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const theNote ={
            title: this.state.title,
            content: this.state.content,
            author: this.state.userSelected,
            date: this.state.date
        }
        try {
            if (this.state.editing) {
                await axios.put(`http://localhost:4000/api/notes/${this.state._id}`, theNote);
            } else {
                axios.post('http://localhost:4000/api/notes', theNote);
            }
        } catch (error) {
            console.log(error);
        }
        window.location.href = '/';

    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeDate = date => {
        this.setState({ date });
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Create a Note</h4>
                    <form onSubmit={this.onSubmit}>
                        {/* SELECT THE USER */}
                        <div className="form-group">
                            <select
                                className="form-control"
                                value={this.state.userSelected}
                                onChange={this.onInputChange}
                                name="userSelected"
                                required>
                                {
                                    this.state.users.map(user => (
                                        <option key={user} value={user}>
                                            {user}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        {/* Note Title */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Title"
                                onChange={this.onInputChange}
                                name="title"
                                value={this.state.title}
                                required />
                        </div>
                        {/* Note Content */}
                        <div className="form-group">
                            <textarea
                                type="text"
                                className="form-control"
                                placeholder="Content"
                                name="content"
                                onChange={this.onInputChange}
                                value={this.state.content}
                                required>
                            </textarea>
                        </div>
                        {/* Note Date */}
                        <div className="form-group">
                            <DatePicker className="form-control" selected={this.state.date} onChange={this.onChangeDate} />
                        </div>
                        <button className="btn btn-primary">
                            Save 
                            <i className="material-icons">
                                assignment
                            </i>
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

//////////////////////////////////////////////////////////////////////
/*import React,{useState,useEffect} from 'react';
import  axios from "axios";
import DatePicker from "react-datepicker";
import  "react-datepicker/dist/react-datepicker.css"

const CreateNote = () => {
    const [users, setUsers]=useState([]);
    const [userSelected, setUserSelected]=useState('');
    const [date, setDate]=useState(new Date());
    const [title, setTitle]=useState('');
    const [content, setContent]=useState('');
    const [edit, setEdit]=useState(false);
    const [id, setId]=useState('');

    useEffect(()=> {
        //console.log(this.props.match.params);
        getUsers();
        var url_string = window.location;
        var url = new URL(url_string);
        var name = url.searchParams.get("name");
        var tvid = url.searchParams.get("id");
        if (this.props.match.params.id) {
            setEdit(true);
            setId(this.props.match.params.id);
        }
    },[]);
    
    const getUsers = () => {
        axios.get('http://localhost:4000/api/users/')
        .then((response) => {
            //console.log(response.data[0]);
            setUsers(response.data);
            const firstUser = response.data[0];
            //console.log(firstUser.userName);
            setUserSelected(firstUser.userName);/*pone al primer usuario como valor 
            inicial, sin esto el valor seria null o indefinido hasta cambiar en la lista de usuarios * /
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const onInputChange = (e) => {
        setUserSelected(e.target.value);
        console.log(userSelected);
    }

    const changeTitle = (e) => {
        setTitle(e.target.value);
    }

    const changeContent = (e) => {
        setContent(e.target.value);
    }

    const changeDate = (date) => {
        setDate(date);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const theNote ={
                title:title,
                content:content,
                date:date,
                author:userSelected
            }
            if (edit) {
                await axios.put(`http:localhost:4000/api/notes${id}`, theNote)
            }else{
                await axios.post('http://localhost:4000/api/notes/',theNote);
            }
            console.log("hecho");
            window.location.href = '/';
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="col-md-6 offset-md-3">
            <div className="card card-body">
                <h4>crear nota</h4>
                {/*select user * /}
                <div className="form-group">
                    <select 
                        className="form-control" 
                        name="userSelected"
                        onChange={onInputChange}
                    >
                        {
                            users.map(user => 
                                <option key={user._id} value={user.userName}>{user.userName}</option>
                            )
                        }
                    </select>
                </div>

                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Titulo" 
                        name="title"
                        onChange={changeTitle}
                        required
                    />
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control" 
                        placeholder="Contenido" 
                        name="content"
                        onChange={changeContent}
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <DatePicker 
                        className="form-control"
                        selected={date}
                        onChange={changeDate}
                    />
                </div>

                <form onSubmit={onSubmit}>
                    <button type="submit"className="btn btn-primary">Guardar</button>
                </form>
            </div>
        </div>
    )
}

export default CreateNote;
*/
//////////////////////////////////////////////////////////////////////