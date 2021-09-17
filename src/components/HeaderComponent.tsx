import React, { Component } from 'react';

export default class HeaderComponent extends Component {
  render() {
    return (
      <header className="App-header">
        <div className="row">
          <div className="col">
            <a href="http://athena.com.au" target="_blank" rel="noreferrer">
              <img src="./images/logo.svg" className="" alt="logo" id="logo"/>
            </a>
          </div>
          <div className="col text-end"><button className="btn btn-primary"> Get Started</button></div>
        </div>
      </header>
    );
  }
}