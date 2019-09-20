import React, { Component } from "react";
import { FormControl, Form, Button } from "react-bootstrap";
import { element } from "prop-types";
import { populateJSON } from "../util";
import "./SaveComponent.css";

export class SaveTestCaseComponent extends Component {
  state = {
    fields: {},
    testCaseName: "",
    status: "",
    apiName: "",
    buttonStatus: "disabled"
  };
  render() {
    const parameter = this.props.parameter
      ? JSON.parse(this.props.parameter)
      : null;
    const formParam = this.getFirstDocument(parameter)[0];
    const request = this.getFirstDocument(parameter)[1];
    return (
      <Form>
        <FormControl
          id="Test Case Name"
          placeholder="Test Case Name"
          className="ramltextbox"
          onChange={event => this.setTestCaseName(event.target.value)}
        />
        <FormControl
          id="ApiName"
          placeholder="Api Name"
          className="ramltextbox"
          onChange={event => this.setApiName(event.target.value)}
        />
        {formParam.map((element, i) => {
          return (
            <FormControl
              id={element}
              placeholder={element}
              className="ramltextbox"
              onChange={event => this.setField(event.target.value, element)}
            />
          );
        })}

        <FormControl
          id="Expected Result"
          placeholder="Expected Result"
          className="ramltextbox"
          onChange={event => this.setStatus(event.target.value)}
        />
        <div>
          <Button
            onClick={() => this.sendData(JSON.parse(request))}
            className="button"
          >
            Save
          </Button>
          <Button disabled className="button">
            Run
          </Button>
        </div>
      </Form>
    );
  }
  setField(value, element) {
    const fields = this.state.fields;
    fields[element] = value;
    this.setState({ fields });
  }
  setApiName(apiName) {
    this.setState({ apiName });
  }
  setTestCaseName(testCaseName) {
    this.setState({ testCaseName });
  }
  setStatus(status) {
    this.setState({ status });
  }
  sendData = request => {
    request = populateJSON(request, this.state.fields);
    request = JSON.stringify(request);
    request = request.replace('"', "&#47;");
    console.log("New Request", request);
    console.log(this.createRequest(request));
  };
  getFirstDocument(parameters) {
    var req = "{";
    let array = [];
    let doc;
    if (parameters) {
      Object.keys(parameters[0]).map((e, i) => {
        // console.log("E", e);
        if (e === "schema") {
          const schema = parameters[0].schema;
          //   console.log("Schema", schema);
          const ref = parameters[0].schema.$ref;
          //   console.log("ref", ref);
          var array = ref.split("/");
          //   console.log("Final", array[array.length - 1]);
          doc = array[array.length - 1];
        }
      });
    }
    // console.log("doc", doc);
    if (!doc) {
      req = req + '"Something' + '":""}';
      array.push("Something");
    } else {
      console.log("This Request", req);
      array = array.concat(this.recursiveFunction(doc, req)[0]);
      req = this.recursiveFunction(doc, req)[1];
      req = req.slice(0, -1);
      req = req + "}";
    }
    console.log("Array", array);
    console.log("Request Created", req);
    let res = [];
    if (array.length != 0) res.push(array);
    res.push(req);
    return res;
  }
  recursiveFunction(document, req) {
    // console.log("In the recursion.......");
    let array = [];
    const response = JSON.parse(this.props.swagger);
    Object.keys(response.definitions).forEach(element => {
      //   console.log("Current Elemnt", element);
      if (element == document) {
        // console.log("Matches");
        const properties = response.definitions[element].properties;
        // console.log("Properties", response.definitions[element].properties);
        if (properties) {
          Object.keys(properties).forEach(element => {
            console.log("Request Being Created", req);

            console.log("Property Elements", element);
            const prop = properties[element];
            if (prop.$ref) {
              req = req + '"' + element + '":{';
              let ref = prop.$ref;
              let refArray = ref.split("/");
              //   console.log("NextDocument", refArray[array.length - 1]);
              let doc = refArray[refArray.length - 1];
              //   array.push(doc + "Recursion");
              let result = [];
              result = this.recursiveFunction(doc, req);
              array = array.concat(result[0]);
              //   array = array.concat(this.recursiveFunction(doc, req)[0]);
              req = result[1].slice(0, -1) + "},";
              console.log("After author------------------------", req);
            } else {
              req = req + '"' + element + '":"",';

              array.push(element);
            }
          });
        }
      }
    });
    // console.log("Request Created:", req);
    // console.log("Hellllllllooooo", array);
    let res = [];
    if (array.length != 0) res.push(array);
    res.push(req);
    return res;
  }
  createRequest(requestBody) {
    let request = {};
    request["TestCaseName"] = this.state.testCaseName;
    request["httpMethod"] = this.props.httpMethod;
    request["baseUrl"] = JSON.parse(this.props.swagger).host;
    request["path"] = this.props.path;
    request["apiRequest"] = requestBody;
    request["expectedResult"] = this.state.status;
    request["header"] = JSON.parse(this.props.swagger).header
      ? JSON.parse(this.props.swagger).header
      : null;
    return request;
  }
}
