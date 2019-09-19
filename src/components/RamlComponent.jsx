import React, { Component } from "react";
import { Button, Tabs, Tab } from "react-bootstrap";
import "react-tabs/style/react-tabs.css";
import { FormControl } from "react-bootstrap";
import "./RamlComponent.css";
import { NewTestCaseComponent } from "./NewTestCaseComponent";
import { ViewTestCaseComponent } from "./ViewTestCaseComponent";
import axios from "axios";

export default class RamlComponent extends Component {
  state = {
    ramlUrl: "",
    response: ""
  };
  render() {
    return (
      <div>
        <div className="firstbar">
          <FormControl
            id="Raml"
            placeholder="Enter Raml"
            className="ramltextbox"
            onChange={event => this.setramlUrl(event.target.value)}
          />
          <Button onClick={this.sendData}>Submit</Button>
        </div>
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="profile" title="View TestCases">
            <ViewTestCaseComponent></ViewTestCaseComponent>
          </Tab>
          <Tab eventKey="home" title="Create New TestCases">
            New Test Cases
            <NewTestCaseComponent
              responseFromRaml={this.state.response}
            ></NewTestCaseComponent>
          </Tab>
        </Tabs>
      </div>
    );
  }

  sendData = () => {
    console.log("Button Clicked", this.state.ramlUrl);
    axios
      .get(this.state.ramlUrl, { header: [{ con: "application/json" }] })
      .then(response => {
        console.log("response", response.data);
        console.log("name: ", response.data);
        this.setState({ response: JSON.stringify(response.data) });
      });
  };
  setramlUrl = ramlUrl => {
    console.log("onChange");
    this.setState({ ramlUrl });
  };
}
