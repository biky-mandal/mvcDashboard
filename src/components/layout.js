import React from 'react'
// import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Header from './header';
// import { NavLink } from 'react-router-dom';
import './style.css';
/**
* @author
* @function Layout
**/

const Layout = (props) => {
    return (
        <>
            <Header />
            {
                props.children
            }
        </>
    )

}

export default Layout