import React, { Component } from "react";
import { FormControl, Form, Button } from "react-bootstrap";
import { element } from "prop-types";

export class SaveTestCaseComponent extends Component {
  state = {
    request: {}
  };
  render() {
    const parameter = this.props.parameter
      ? JSON.parse(this.props.parameter)
      : null;
    const formParam = this.getFirstDocument(parameter)[0];
    const request = this.getFirstDocument(parameter)[1];
    // return <h1>Sally Singh</h1>;
    return (
      <Form>
        {formParam.map(element => {
          return (
            <FormControl
              id={element}
              placeholder={element}
              className="ramltextbox"
            />
          );
        })}
        <Button onClick={this.sendData}>Save</Button>
      </Form>
    );
  }
  sendData = () => {
    console.log("Button Clicked");
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
      req = req + "Something" + '":';
      array.push("Something");
    } else {
      console.log("This Request", req);
      array = array.concat(this.recursiveFunction(doc, req)[0]);
      req = this.recursiveFunction(doc, req)[1];
    }
    console.log("Array", array);
    console.log("Request Created", req.slice(0, -1) + "}");
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
}
