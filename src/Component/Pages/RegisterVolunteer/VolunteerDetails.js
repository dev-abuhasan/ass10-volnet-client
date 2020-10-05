import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { UserAuthContext } from '../../FireBaseAuth/auth';
import Header from '../Header/Header';
import './Register.css';
import RegList from './RegList';

const VolunteerDetails = () => {
    const [volList, setVolList] = useState([]);
    const auth = useContext(UserAuthContext);
    const { user } = auth;

    useEffect(() => {
        fetch('https://sheltered-journey-87504.herokuapp.com/user-volunteer-registration?email=' + user.email)
            .then(res => res.json())
            .then(data => setVolList(data))
    }, [user.email])

    return (
        <Container>
            <Header />
            <br /><br />
            {volList < 1 ?
                <div>
                    <h3>You Don't have any volunteer registration</h3>
                    <p className="text-danger">Please register first</p>
                </div> : ""
            }
            <Row>
                {
                    volList.map(vol => <RegList key={vol._id} volunteer={vol} />)
                }
            </Row>
        </Container>
    );
};

export default VolunteerDetails;