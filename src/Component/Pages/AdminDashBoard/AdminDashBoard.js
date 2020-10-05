import React, { useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import "./AdminDashBoard.css";
import logo from "../../../Image/logos/Group 1329.png";
import manImg from "../../../Image/logos/users-alt 1.png";
import plusImg from "../../../Image/logos/plus 1.png";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import VolunteerRegister from './VolunteerRegister';
const AdminDashBoard = () => {
    const [showInfo, setShowInfo] = useState({
        Registration: true,
        Event: false
    });
    const [formData, updateFormData] = useState({});
    const handleShowModal = (e) => {
        if (e === "Registration") {
            return setShowInfo({
                Registration: true,
                Event: false
            })
        }
        if (e === "Event") {
            return setShowInfo({
                Registration: false,
                Event: true
            })
        }
    }
    const handleSubmitData = (e) => {
        var foDat = new FormData();
        foDat.append("eventTitle", formData.eventTitle);
        foDat.append("description", formData.description);
        foDat.append("eventDate", formData.eventDate);
        foDat.append("imgUpload", formData.imgUpload);

        fetch(`https://sheltered-journey-87504.herokuapp.com/createEvent/`, {
            method: 'POST',
            body: foDat
        })
            .then(res => res.json())
            .then(data => {
                if (data.exists === true) {
                    alert('This Name Image Already exists. Please Rename This File');
                }
                if (data.exists === false) {
                    alert('Your Event Added Successfully');
                }
            })
            .then(() => {
                window.location.reload()
            })
        e.preventDefault();
    }
    const getData = (e) => {
        updateFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    }
    const getUploadFils = (e) => {
        updateFormData({ ...formData, [e.target.name]: e.target.files[0] })
    }
    const [volList, seVolList] = useState([]);
    useEffect(() => {
        fetch('https://sheltered-journey-87504.herokuapp.com/all-volunteer-registration/')
            .then(res => res.json())
            .then(data => seVolList(data))
    }, [])
    return (
        <Container>
            <header className="Admin-header d-flex align-items-center">
                <div className="Admin-logo">
                    <Link to="/">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="Admin-title">
                    <h3>
                        {showInfo.Registration === true ?
                            "Volunteer Registration List"
                            : ""
                        }
                        {showInfo.Event === true ?
                            "Add Event"
                            : ""
                        }
                    </h3>
                </div>
            </header>
            <main className="pt-3">
                <aside className="Admin-side-bar float-left">
                    <div>
                        <img src={manImg} alt="" />
                        <span onClick={() => handleShowModal("Registration")}>Volunteer Registration List</span>
                    </div>
                    <div>
                        <img src={plusImg} alt="" />
                        <span onClick={() => handleShowModal("Event")}>Add Event</span>
                    </div>
                </aside>
                <section className="display-admin-sec">
                    {showInfo.Registration === true ?
                        <div className="row  text-center display-admin-info align-items-center">
                            <div className="col-md-2">
                                <div className="title">
                                    <span>Name</span>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="title">
                                    <span>Email ID</span>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="title">
                                    <span>Registration Date</span>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="title">
                                    <span>Volunteer List</span>
                                </div>
                            </div>
                            <div className="col-md-1 mb-3">
                                <div className="title">
                                    <span>Action</span>
                                </div>
                            </div>
                            {
                                volList.map(vol => <VolunteerRegister key={vol._id} volAllList={vol} />)
                            }
                        </div>
                        : ""
                    }
                    {showInfo.Event === true ?
                        <div className="Add-Event">
                            <div className="Add-event-description py-3 px-4">
                                <Form className="row" onSubmit={(e) => handleSubmitData(e)}>
                                    <div className="col-md-6">
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label><strong>Event Title</strong></Form.Label>
                                            <Form.Control type="text" placeholder="Event Title" name="eventTitle" onBlur={(e) => getData(e)} required />
                                        </Form.Group>
                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control as="textarea" rows="3" name="description" onBlur={(e) => getData(e)} required />
                                        </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label><strong>Event Date</strong></Form.Label>
                                            <Form.Control type="date" placeholder="Large text" name="eventDate" onBlur={(e) => getData(e)} required />
                                        </Form.Group>
                                        <Form.Group className="position-relative upload-img-section ">
                                            <Form.File id="exampleFormControlFile1" label="" name="imgUpload" onBlur={(e) => getUploadFils(e)} accept="image/*" required />
                                        </Form.Group>
                                    </div>
                                    <div className="submit-are col-md-12">
                                        <Button variant="primary" type="submit" className=" float-right">
                                            Submit
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                        : ""
                    }
                </section>
            </main>
        </Container>
    );
};

export default AdminDashBoard;