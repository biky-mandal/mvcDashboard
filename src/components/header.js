import React from 'react'
import './style.css'
import { NavLink } from 'react-router-dom';
import { FiUser, FiLogIn, FiUserPlus } from "react-icons/fi";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {teacherLogoutAction} from '../actions/teacher/logoutAction';
import {studentLogoutAction} from '../actions/student/logoutAction';

/**
* @author
* @function Header
**/

const Header = (props) => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const logout = () => {
        if(auth.teacher){
            dispatch(teacherLogoutAction())
        }else{
            dispatch(studentLogoutAction())
        }
    }

    const renderLoggedInLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <span className="nav-link" onClick={logout} >Logout</span>
                </li>
            </Nav>
        );
    }

    const renderNonLoggedInLinks = () => {
        return (
            <NavDropdown className="drop-div" title={<FiUser />} id="collasible-nav-dropdown">
                <li className="nav-item">
                    <NavLink to="login" className="nav-link drop-lbl active"><span><FiLogIn /></span>Login</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="register" className="nav-link drop-lbl"><span><FiUserPlus /></span>Register</NavLink>
                </li>
            </NavDropdown>
        );
    }

    return (
        <>
            <Navbar className="navbar-bg" collapseOnSelect expand="lg" bg="dark" variant="dark">
                {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                <NavLink to="/" className="navbar-brand">MVCDash</NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )

}

export default Header