import React from 'react';
import './Header.css';
import logo from '../../../Image/logos/Group 1329.png'
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserAuthContext } from '../../FireBaseAuth/auth';
const Header = () => {
    const auth = useContext(UserAuthContext);
    const { user, logOut } = auth;

    //log out user 
    const handLogOut = () => {
        logOut()
    }

    const location = useLocation();
    const pathName = location.pathname;
    return (
        <header>
            <Navbar bg="light" expand="lg" className="py-4">
                <Navbar.Brand>
                    <Link to="/home" className="nav-logo">
                        <img src={logo} alt="" />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto main-nav-item">
                        <Nav className="nav-items py-2">
                            <Link to="/">Home</Link>
                        </Nav>
                        <Nav className="nav-items py-2">Donation</Nav>
                        <Nav className="nav-items py-2">Events</Nav>
                        <Nav className="nav-items py-2">Blog</Nav>
                        <Nav className="nav-items btn-style bg-primary">
                            {pathName === "/volunteer-details" ?
                                <>
                                    <Link to="/register/help-abu" className="text-white py-2 px-3 text-decoration-none">
                                        {user ? user.name : "Anonymous"}
                                    </Link>
                                </>
                                :
                                <Link to="/register/help-abu" className="text-white py-2 px-3 text-decoration-none">
                                    Register
                                </Link>
                            }
                        </Nav>
                        {pathName === "/volunteer-details" ?
                            <Nav className="nav-items btn-style bg-warning ml-2">
                                <span className="text-white py-2  text-decoration-none"
                                    onClick={() => handLogOut()}>
                                    SignOut
                                </span>
                            </Nav> : ""
                        }
                        <Nav className="nav-items btn-style bg-dark ml-2">
                            <Link to="/admin-dashboard" className="text-white py-2 px-3 text-decoration-none ">
                                Admin
                            </Link>
                        </Nav>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            { pathName === "/volunteer-details" ? "" : <div className="search-section">
                <div className="title">
                    <h3 className="text-center">I Grow By Helping People In Need</h3>
                </div>
                <Form inline className="header-search--method">
                    <div className="header-search">
                        <FormControl className="header-input" type="text" placeholder="Search" />
                        <Button variant="" className="bg-primary text-white header-search-btn">Search</Button>
                    </div>
                </Form>
            </div>
            }
        </header>
    );
};

export default Header;