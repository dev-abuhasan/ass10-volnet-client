import React from 'react';
import delImg from '../../../Image/logos/trash-2 9.png';
const VolunteerRegister = (props) => {
    const { name, email, volunteerType, date, _id } = props.volAllList;
    const handleDeleteVolunteer = (id) => {
        fetch(`https://sheltered-journey-87504.herokuapp.com/delete-vol-reg/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                if (result.success === true) {
                    alert("Your Delete SuccessFully");
                }
            })
            .then(() => { window.location.reload() })
    }
    return (
        <>
            <div className="col-md-2 disBlock">
                <div className="content">
                    <span>{name}</span>
                </div>
            </div>
            <div className="col-md-3 bg-light disBlock">
                <div className="content">
                    <span>{email}</span>
                </div>
            </div>
            <div className="col-md-3 disBlock">
                <div className="content">
                    <span>{date}</span>
                </div>
            </div>
            <div className="col-md-3 bg-light disBlock">
                <div className="content">
                    <span>{volunteerType}</span>
                </div>
            </div>
            <div className="col-md-1 mb-1 disBlock">
                <div className="content img-area" onClick={() => handleDeleteVolunteer(_id)}>
                    <img src={delImg} alt="" />
                </div>
            </div>
        </>
    );
};

export default VolunteerRegister;