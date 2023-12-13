
/*********************************************************************************
*  WEB422 – Assignment 6

*  Name: Yash Vaghani
*  Student ID: 158336214
*  Date: 4/12/23
*
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
*  Github Link : 
********************************************************************************/ 


import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';

export default function Home () {
  return (
    <div>
      <Row>
        <Col md={6}>
          <Image
            src="https://www.metmuseum.org/-/media/images/visit/plan-your-visit/pyv_fifthave-promo_1200x810.jpg?la=en&hash=A46023D46B6F0DD512384C153151ADDC"
            alt='something'
            fluid
            rounded
          />
        </Col>
        <Col md={6}>
          <p>
          The Metropolitan Museum of Art in New York City, colloquially "the Met",[a] is the largest art museum in the Americas. In 2022 it welcomed 3,208,832 visitors, ranking it the third most visited U.S museum, and eighth on the list of most-visited art museums in the world.
          </p>
          <p>
            For more information, visit {' '}
            <a
              href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
              target="_blank"
              rel="noreferrer"
            >
              Metropolitan Museum of Art Wikipedia page
            </a>
          </p>
        </Col>
      </Row>
    </div>
  );
};


