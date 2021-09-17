import React, { Component } from 'react';
import './App.css';
import HeaderComponent from './components/HeaderComponent';
import FormComponent from './components/FormComponent';
import ResultComponent from './components/ResultComponent';

interface AppState {
  lvr: number;
}

export default class AppComponent extends Component {
  public state: AppState = {lvr: 0};

  constructor(props: any) {
    super(props);
    this.setLvr = this.setLvr.bind(this);
  }

  /**
   * sets lvr value in state
   *
   * @param {number} lvrValue
   * @memberof AppComponent
   */
  public setLvr(lvrValue: number) {
    this.setState({lvr: lvrValue});
  }

  render() {  
  return (
    <div className="App center">
      <HeaderComponent/>
      <div className="row">
        <div className="col App-calculator">
          <FormComponent  onChangeLVR={this.setLvr}/>
        </div>
        <div className="col App-result">
          <ResultComponent lvrPercentage={this.state.lvr}/>
        </div>
      </div>
    </div>
  );
  }
}
