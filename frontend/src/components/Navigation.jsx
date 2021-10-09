import React from 'react';
import { Link } from "react-router-dom";
//import { useLocation } from "react-router-dom";

const Navigation = () => {/*
    //assigning location variable
    const location = useLocation();

    //destructuring pathname from location
    const { pathname } = location;

    //Javascript split method to get the name of the path in array
    const splitLocation = pathname.split("/");*/

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Note App</Link>
                <ul className="nav nav-tabs ml-auto">
                    <li className="nav-item">
                        {/*<Link className={splitLocation[1] === "" ? "nav-link active" : "nav-link"} aria-current="page" to="/">Notas</Link>*/}
                        <Link className="nav-link" aria-current="page" to="/">Notas</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/create">Crear nota</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/user">Crear usuario</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation;