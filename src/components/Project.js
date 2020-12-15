import React from 'react';
import { Card } from 'react-bootstrap';

import './Project.css';

function Project() {
    return (
        <div className='project'>
            <Card  className='project__card'>
                <Card.Img className='proect__card_img' variant="top" src="/assets/images/logo-minimal-md.png" />
                <Card.Body>
                    <Card.Title className='project__card_title'>Card Title</Card.Title>
                    <Card.Text className='project__card_text'>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Project
