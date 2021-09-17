import { Component } from 'react';
import './Result.css';

interface ResultProps {
  lvrPercentage: number;
}

export default class ResultComponent extends Component<ResultProps>  {
  constructor(public props: ResultProps) {
    super(props);
  }

  
  render() {
    return (
      <div className="Result">
        <div className="Result-image">
          <img src="./images/IC-HACKS.svg" width="100px" height="100px" alt="flashImage_logo" />
        </div>
        <h3 className="Result-heading">Your LVR is</h3>
        <h3 className="Result-lvr-percentage">
          {Math.round(this.props.lvrPercentage * 100) / 100 || "--"} %
        </h3>
      </div>
    )
  }
}