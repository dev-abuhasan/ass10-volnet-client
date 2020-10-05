import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import BodyContent from '../BodyContent/BodyContent';
import Header from '../Header/Header';
import './Home.css';
const Home = () => {
    const [getData, setData] = useState([]);
    useEffect(() => {
        fetch('https://sheltered-journey-87504.herokuapp.com/allEvent')
            .then(res => res.json())
            .then(data => {
                setData(data);
            });
    }, []);
    return (
        <Container>
            <Header />
            <Row>
                {
                    getData.map(allData => <BodyContent  key={allData._id} allData={allData}/>)
                }
            </Row>
        </Container>
    );
};

export default Home;