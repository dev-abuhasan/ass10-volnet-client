import React, { useEffect } from 'react';
import { useState } from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./BodyContent.css"

const BodyContent = (props) => {
    const { eventTitle, imgUpload } = props.allData;
    const [imgs, setImgs] = useState(null);

    useEffect(() => {
        fetch('https://sheltered-journey-87504.herokuapp.com/' + imgUpload)
            .then(response => {
                setImgs(response.url)
            })
    }, [imgUpload]);
    return (
        <>
            <Col md={3} className="position-relative">
                <Link to={`/register/${eventTitle}`} className="AllEvent">
                    <div className="images">
                        <img src={imgs} alt="img..." />
                    </div>
                    <div className="Title">
                        <h3>{eventTitle}</h3>
                    </div>
                </Link>
            </Col>
        </>
    );
};

export default BodyContent;