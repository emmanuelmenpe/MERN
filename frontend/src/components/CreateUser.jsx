import React,{useState, useEffect} from 'react';
import axios from 'axios';

const CreateUser = () => {
    const [users, setUsers]=useState([]);
    const [userName, setUserName]= useState('');
    useEffect(()=> {
        getUsers();
        /*axios.get('http://localhost:4000/api/users/')
        .then((response) => {
            console.log(response.data);
            setUsers(response.data)
        })
        .catch((error) => {
            console.log(error);
        })    */    
    },[]);
    
    const getUsers = async() => {
        axios.get('http://localhost:4000/api/users/')
        .then((response) => {
            console.log(response.data);
            setUsers(response.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const deleteUser = async(id) => {
        //console.log(id);
        await axios.delete(`http://localhost:4000/api/users/${id}`);
        getUsers();
    }
    
    const onChangeUserName = (e) => {
        //console.log(e.target.value);
        setUserName(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/api/users/',{
                userName: userName//
            })
            console.log(res);
            setUserName('');
            getUsers();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="card card-body">
                    <h3>Nuevo usuario</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control"
                                value={userName}
                                onChange={onChangeUserName}
                                />
                        </div>
                        <button type="submit" className="btn btn-primary">crear</button>
                    </form>
                </div>
            </div>
            <div className="col-md-8">
                <div className="list-group">
                    {
                        users.map(user => (
                        <li 
                            className="list-group-item list-group-action" 
                            key={user._id}
                            onDoubleClick={()=>deleteUser(user._id)}
                        >
                            {user.userName}
                        </li>))
                    }
                </div>
            </div>
        </div>
    )
}

export default CreateUser;

/*import React, { Component } from 'react'
import axios from 'axios'

class CreateUser extends Component {

    state = {
        username: '',
        users: []
    }

    async componentDidMount() {
        this.getUsers();
    }

    getUsers = async () => {
        const res = await axios.get('http://localhost:4000/api/users');
        this.setState({
            users: res.data
        });
        console.log(this.state.users);
    }

    onChangeUserName = (e) => {
        console.log(e.target.value);
        this.setState({
            users: e.target.value
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>nuevo usuario</h3>
                        <form action="">
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={this.onChangeUserName}/>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="list-group">
                        {
                            this.state.users.map(user => (
                            <li 
                                className="list-group-item list-group-action" 
                                key={user._id}
                            >
                                {user.userName}
                            </li>))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateUser;
*/
