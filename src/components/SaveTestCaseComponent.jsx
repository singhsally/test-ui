import React, { Component } from "react";

export class SaveTestCaseComponent extends Component {
  state = {};
  render() {
    const parameters = this.props.parameters;
    console.log(parameters);
    return <h1>Parameter : {parameters}</h1>;
  }
}
// export function SaveTestCaseComponent() {
//   const parameters = props.parameters;
//   return (
//     <div>
//       <h1>Sally123</h1>
//       {parameters}
//     </div>parameter={method[x].parameters}
//   );
// }
