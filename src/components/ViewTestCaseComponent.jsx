import React, { Component } from "react";
import Accordion, { Button } from "react-bootstrap/Accordion";
import "./ViewTestCaseComponent.css";
import { Card } from "react-bootstrap";

export class ViewTestCaseComponent extends Component {
  state = {};
  render() {
    return (
      <div>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle
                as={Button}
                variant="link"
                eventKey="0"
                className="testCase"
              >
                TestCase1
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <p>Hi this is the first test Case</p>
                </Card.Body>
              </Accordion.Collapse>
            </Card.Header>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle
                as={Button}
                variant="link"
                eventKey="1"
                className="testCase"
              >
                TestCase2
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <p>Hi this is the Second test Case</p>
                </Card.Body>
              </Accordion.Collapse>
            </Card.Header>
          </Card>
        </Accordion>
      </div>
    );
  }
}
export class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
