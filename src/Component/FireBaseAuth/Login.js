import React, { useContext } from 'react';
import './Css/Style.css'
import { Container } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import googleIcon from '../../Image/Icon/google.png';
import fbIcon from '../..//Image/Icon/fb.png';
import logo from '../../Image/logos/Group 1329.png';
import { UserAuthContext } from './auth';


const Login = () => {
    //get user login form auth.js file
    const auth = useContext(UserAuthContext);
    const { handleGoogleSignIn, facebookRegistration } = auth;

    //redirect to path settings
    const location = useLocation();
    const history = useHistory()
    let { from } = location.state || { from: { pathname: "/" } };

    //google sign in 
    const handGoogleSign = () => {

        handleGoogleSignIn()
            .then(r => {

                history.replace(from);
            })
    }

    //facebook sign in
    const handFacebookSign = () => {
        facebookRegistration()
            .then(r => {
                history.replace(from);
            })
    }

    return (
        <Container id="login" className="app">
            <div className="logo-img">
                <Link to="/">
                    <img src={logo} alt="logo..." />
                </Link>
            </div>
            <div className="signed-in-option">
                <div className="title">
                    <h3>Login With</h3>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <button className="login-sign-up-btn" onClick={() => handFacebookSign()}>
                        <span className="float-left pl-3"><img src={fbIcon} alt="" /></span>
                        <span className="text-center mt-2 d-block">Continue with Facebook</span>
                    </button>
                    <button className="login-sign-up-btn" onClick={() => handGoogleSign()}>
                        <span className="float-left pl-3 google-icon"><img src={googleIcon} alt="" /></span>
                        <span className="text-center mt-2 d-block">Continue with Google</span>
                    </button>
                </div>
                <div className="title-footer text-center py-2">
                    <p>Don't have account? <Link to="/" className="create-account">Create an account</Link> </p>
                </div>
            </div>
        </Container>
    );
};
export default Login;