import { Carousel } from 'react-bootstrap';
import React from 'react'

import './Home.css';
import Project from './Project';

function Home() {
    return (
        <div className='home'>
            <div className='home__welcome'>
                <h2>Bienvenue sur le portail de gestion</h2>
                <span className='home__welcomeSpan'>Of Altechs Engineering</span>
            </div>
            <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="/assets/images/homepage.jpg"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="/assets/images/homepage.jpg"
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="/assets/images/homepage.jpg"
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <div className='home__project'>
                <h2>Présentation De Nos Projets</h2>
                <p>Lorem ipsum dolor sit amet, an pro aeque meliore feugait. Et his zril consul scripserit, at mei lobortis assueverit persequeris. Mei amet laudem constituam ei. Eum explicari dissentiunt et, falli utamur legendos pro id.

                    Agam viris prodesset quo ad. Pro quaeque bonorum te. Duo ne justo molestie tractatos. Fuisset volutpat eu qui, habemus vivendum in eum. Assum inani iusto his ne, autem noluisse oporteat cum ea, has inermis fuisset pertinax ea. Ut minimum detraxit repudiare mei, te quodsi albucius ius. Deserunt molestiae consequat usu ex, meis eruditi blandit ei per.
                </p>
            </div>
            <div className="home__cardProject">
                <Project />
            </div>
        </div>
    )
}

export default Home
