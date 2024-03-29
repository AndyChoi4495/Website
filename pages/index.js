/*********************************************************************************
 * *  BTI425 – Assignment 6
 * *  I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * *  No part of this assignment has been copied manually or electronically from any other source
 * *  (including web sites) or distributed to other students. *
 * *  Name: ____Yunseok Choi________ Student ID: 148765175  Date: 4/7/2023
 * * ********************************************************************************/

import { Row, Col, Image } from 'react-bootstrap'

export default function Home() {
  return (
    <>
      <Row>
        <Col md>
          <Image
            fluid
            rounded
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg/1920px-Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
            alt="The Metropolitan Museum of Art"
          />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
        <br/>
          <p>
            The Metropolitan Museum of Art in New York City, colloquially "the Met",[a] is the largest art museum in the Americas and the most-visited museum in the Western Hemisphere. Its permanent collection contains over two million works,[1] divided among 17 curatorial departments. The main building at 1000 Fifth Avenue, along the Museum Mile on the eastern edge of Central Park on Manhattan's Upper East Side, is by area one of the world's largest art museums. The first portion of the approximately 2-million-square-foot (190,000 m2) building was built in 1880. A much smaller second location, The Cloisters at Fort Tryon Park in Upper Manhattan, contains an extensive collection of art, architecture, and artifacts from medieval Europe.
          </p>
          <p>
            The Metropolitan Museum of Art was founded in 1870 with its mission to bring art and art education to the American people. The museum's permanent collection consists of works of art from classical antiquity and ancient Egypt, paintings, and sculptures from nearly all the European Old Masters, and an extensive collection of American and modern art. The Met maintains extensive holdings of African, Asian, Oceanian, Byzantine, and Islamic art. The museum is home to encyclopedic collections of musical instruments, costumes, and accessories, as well as antique weapons and armor from around the world. Several notable interiors, ranging from 1st-century Rome through modern American design, are installed in its galleries.
          </p>
        </Col>
          <Col md={6}>
          <br/>
          <p>
          The Fifth Avenue building opened on March 30, 1880. 
          In 2021, despite the COVID-19 pandemic in New York City, the museum attracted 1,958,000 visitors, 
          ranking fourth on the list of most-visited art museums in the world.
          </p>
          <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art</a>
        </Col>
      </Row>
    </>
  )
}
