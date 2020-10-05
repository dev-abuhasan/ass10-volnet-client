import React, { useState } from 'react';
import './Register.css'
import logo from '../../../Image/logos/Group 1329.png';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UserAuthContext } from '../../FireBaseAuth/auth';
const RegisterVolunteer = () => {
    const { evtTitle } = useParams();
    const auth = useContext(UserAuthContext);
    const { user } = auth;

    //state is
    const [formData, updateFormData] = useState({
        name: user ? user.name : "abu hasan",
        email: user ? user.email : "abu@gmail.com",
        date: "",
        volunteerType: evtTitle ? evtTitle : "Please Select First",
        description: ""

    });

    //change path 
    const location = useLocation();
    const history = useHistory()
    let { from } = location.state || { from: { pathname: "/volunteer-details" } };

    const handleSubmitData = (e) => {
        fetch(`https://sheltered-journey-87504.herokuapp.com/register-volunteer/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ formData })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    alert('Your Registration is Successfully Complete');
                }
            })
            .then(() => {
                history.replace(from);
            })
        e.preventDefault();
    }
    const getData = (e) => {
        updateFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    }

    return (
        <Container>
            <div className="logo">
                <Link to="/"><img src={logo} alt="" /></Link>
            </div>
            <div className="register-area">
                <h3 className="text-center">Register as a volunteer</h3>
                <Form className=" reg-from" onSubmit={(e) => handleSubmitData(e)}>
                    <div className="">
                        <Form.Group controlId="">
                            <Form.Control type="text" placeholder="Your Name" name="name" onBlur={(e) => getData(e)} className="form-control-input" required defaultValue={user ? user.name : "abu hasan"} />
                            <br />

                            <Form.Control type="email" placeholder="Your Name" name="email" onBlur={(e) => getData(e)} className="form-control-input" required defaultValue={user ? user.email : "abu@gmail.com"} />
                            <br />
                            
                            <Form.Control type="date" placeholder="Your Name" name="date" onBlur={(e) => getData(e)} className="form-control-input" required />
                            <br />
                            
                            <Form.Label>volunteerType : {evtTitle}</Form.Label>
                            <Form.Control type="text" placeholder="volunteerType" name="volunteerType" onChange={(e) => getData(e)} className="form-control-input" required defaultValue={evtTitle} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows="3" name="description" onBlur={(e) => getData(e)} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="">
                            Submit
                        </Button>
                        <Link to="/volunteer-details" className="text-warning ml-4">Already Have Register?</Link>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default RegisterVolunteer;