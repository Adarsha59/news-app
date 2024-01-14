import React, { Component } from 'react'
import load  from "../loading.gif";
export default class Loading extends Component {
  render() {
    return (
      <div>
        <img src={load}  />
        </div>
    )
  }
}
