import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Textfit } from "react-textfit";

const CharCard = (props) => {
  return (
    <Container className="character-container d-flex align-content-center">
      <Row>
        <Col className="col-12 mt-5">
          <Card className="card-horizontal mb-5">
            <Row>
              <Col className="col-12 col-md-5">
                <Card.Img className="character-image" src={props.img} alt="" />
              </Col>
              <Col>
                {" "}
                <Card.Body>
                  <Card.Title className="character-name">
                    <Textfit
                      style={{ height: "100%" }}
                      forceSingleModeWidth={false}
                    >
                      {"\u00A0" + props.name}
                    </Textfit>
                  </Card.Title>
                  <Card.Text className="character-description text-left mb-0">
                    <Textfit mode="multi" style={{ height: "100%" }}>
                      {props.description === ""
                        ? `Much is still unknown about ${props.name}. There are many mysteries in this universe, and many more to still be discovered. Click "Read More" below to find the answers you may be looking for...`
                        : props.description}
                    </Textfit>
                  </Card.Text>
                  <Card.Link
                    className="wiki-link"
                    href={props.wikiLink}
                    target="_blank"
                  >
                    Read More...
                  </Card.Link>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CharCard;
