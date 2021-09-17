import React, { Component } from "react";
import './Input.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";


interface InputProps {
  label: string;
  value: string | number;
  type?: string;
  error?: string;
  maxLength?: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default class InputComponent extends Component<InputProps> {
  constructor(public props: InputProps) {
    super(props);
  }

  render() {
    return (
      <div className="mb-5">
        <div><label>{this.props.label}</label></div>
        <div className="input-group form-group mb-3">
          <span className="input-group-text Input-prefix">$</span>
          <input width="80"
            maxLength={this.props.maxLength}
            className="form-control Input"
            placeholder="Value"
            type={this.props.type}
            value={this.props.value || ''}
            onChange={this.props.onChange} />
        </div>
        {this.props.error ? <span className='Input-error'><FontAwesomeIcon icon={faExclamationCircle} /> {this.props.error}</span> : ''}
      </div>
    );
  }
}