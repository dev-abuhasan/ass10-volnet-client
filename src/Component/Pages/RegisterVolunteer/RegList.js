import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './Register.css';
import defaultImg from '../../../Image/logos/Group 1329.png'
const RegList = (props) => {
    const { date, volunteerType, _id } = props.volunteer;
    console.log(typeof _id, _id);
    const handleDeleteVolunteer = (id) => {
        document.getElementById(id).style.display = "none";
        fetch(`https://sheltered-journey-87504.herokuapp.com/delete-vol-reg/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                if (result.success === true) {
                    alert("Your Delete SuccessFully");
                }
            })
    }
    return (
        <Col md={6}>
            <Row className="ml-2" id={_id}>
                <Col md={12}>
                    <div className="volunteer-box row">
                        <div className="col-md-6 defaultImg">
                            <span>Stay Connected</span><br/>
                            <img src={defaultImg} alt=""/>
                            <span className="float-right">& Help SomeOne</span>
                        </div>
                        <div className="col-md-6">
                            <div className="volunteer-info">
                                <div className="volunteer-title">
                                    <h3>{volunteerType}</h3>
                                    <h5>{date}</h5>
                                    <button className="btn btn-outline-dark float-right"
                                        onClick={() => handleDeleteVolunteer(_id)}
                                    >Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Col>
    );
};

export default RegList;