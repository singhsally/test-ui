import React, { Component } from "react";
import { Card, Accordion, Button } from "react-bootstrap";
import { SaveTestCaseComponent } from "./SaveTestCaseComponent";

export class NewTestCaseComponent extends Component {
  state = {};
  render() {
    const response = this.props.responseFromRaml
      ? JSON.parse(this.props.responseFromRaml)
      : null;
    console.log(response);
    let key = 0;
    return (
      <div>
        <Accordion>
          {response
            ? Object.keys(response.paths).map((e, i) => {
                const path = response.paths;
                return Object.keys(path[e]).map((x, y) => {
                  key = key + 1;
                  console.log("Key", key);
                  const method = path[e];
                  console.log("XXXXXX", method[x]);
                  return (
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey={key}
                          className="testCase"
                        >
                          {e} :{x}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={key}>
                          <Card.Body>
                            <div>
                              <SaveTestCaseComponent
                                parameter={JSON.stringify(method[x].parameters)}
                                swagger={JSON.stringify(response)}
                              ></SaveTestCaseComponent>
                            </div>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card.Header>
                    </Card>
                  );
                });
              })
            : null}
        </Accordion>
      </div>
    );
  }
  createForm = () => {
    var response = JSON.parse(this.props.responseFromRaml);
    var paths = response.paths;
    var res = "";
    Object.keys(paths).map((e, i) => {
      console.log("EEEE", e, "IIIII", i, paths[e]);
      Object.keys(paths[e]).map((x, y) => {
        console.log("XXXXX", x);
        res = e + "--" + x;
      });
    });
    console.log("Result", res);
    return <h1>Sally</h1>;
    // return(
    //   <Card>
    //   <Card.Header>
    //     <Accordion.Toggle
    //       as={Button}
    //       variant="link"
    //       eventKey="0"
    //       className="testCase"
    //     >
    //       {TestCase1}
    //     </Accordion.Toggle>
    //     <Accordion.Collapse eventKey="0">
    //       <Card.Body>
    //         <p>Hi this is the first test Case</p>
    //       </Card.Body>
    //     </Accordion.Collapse>
    //   </Card.Header>
    // </Card>
    // )
  };
}
