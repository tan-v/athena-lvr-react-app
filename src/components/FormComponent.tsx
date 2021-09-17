import React, { Component } from 'react';
import { ESTIMATED_PROPERTY_VALUE_ERROR_MSG, BORROW_AMOUNT_VALUE_ERROR_MSG } from '../constants/errors.constants';
import { 
  BORROW_AMOUNT_MAX, 
  BORROW_AMOUNT_MIN, 
  ESTIMATED_PROPERTY_VALUE_MAX, 
  ESTIMATED_PROPERTY_VALUE_MIN 
} from '../constants/range.constants';
import './Form.css';
import InputComponent  from './InputComponent';

interface FormProps {
  onChangeLVR: (lvrPercentage: number) => void;
}

interface FormState {
  estimatedPropertyValue: string;
  borrowAmount: string;
  errors: {
    estimatedPropertyValue: string,
    borrowAmount: string
  };
}

export default class FormComponent extends Component<FormProps> {
  private onChangeLVR: any;
  public state: FormState = this.getInitialState();

  constructor(props: FormProps) {
    super(props);
    this.onChangeLVR = props.onChangeLVR;
    this.onChangeEstimatedPropValue = this.onChangeEstimatedPropValue.bind(this);
    this.onChangeBorrowAmount = this.onChangeBorrowAmount.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  /**
   * handles form submission
   *
   * @param {e} event
   * @memberof FormComponent
   */
  public onSubmit(e: any): void {
    e.preventDefault();
    this.calculateLVR();
  }

  /**
   * handles estimatedPropertyValue change event 
   *
   * @param {React.ChangeEvent} event
   * @memberof FormComponent
   */
  public onChangeEstimatedPropValue(event: React.ChangeEvent<HTMLInputElement>): void {
    this.onValueChange('estimatedPropertyValue', event.target.value);
  }

  /**
   * handles borrowAmount change event 
   *
   * @param {React.ChangeEvent} event
   * @memberof FormComponent
   */
  public onChangeBorrowAmount(event: React.ChangeEvent<HTMLInputElement>): void {
    this.onValueChange('borrowAmount', event.target.value);
  }

  /**
   * calculates lvr based on form input 
   *
   * @memberof FormComponent
   */
  public calculateLVR(): void {
    let lvrPercentage = 0;
    let {estimatedPropertyValue, borrowAmount} = this.state;

    let {
      estimatedPropertyValue: estimatedPropertyValueError, 
      borrowAmount: borrowAmountError 
    } = this.state.errors;
    if (!estimatedPropertyValueError && !borrowAmountError) {
      const estimatedPropValue = +this.removeCommaFromValue(estimatedPropertyValue);
      const borrowAmountValue = +this.removeCommaFromValue(borrowAmount);
      if (estimatedPropertyValue && borrowAmount) {
        lvrPercentage = Number((borrowAmountValue / estimatedPropValue));
      }
    }
    this.onChangeLVR(lvrPercentage);
  }

  /**
   * resets state to initial state
   *
   * @memberof FormComponent
   */
  public onReset(): void {
    this.setState(this.getInitialState());
  }

  /**
   * handles generic property change event and update state
   *
   * @param {string} propertyName
   * @param {string} propertyValue
   * @memberof FormComponent
   */
  private onValueChange(propertyName: string, propertyValue: string): void {
    this.clearErrorMessage(propertyName);
    const value = this.removeCommaFromValue(propertyValue);
    if (!value.match(/\d+/)) {
      this.setState({ [propertyName]: '' });
      return;
    }
    this.handleErrors(propertyName, +this.removeCommaFromValue(propertyValue)); 
    this.setState({ [propertyName]: this.insertCommaToValue(propertyValue) });
  }

  /**
   * clears error messages in state
   *
   * @param {string} property
   * @memberof FormComponent
   */
  private clearErrorMessage(property: string): void {
    const errors = this.state.errors;
    this.setState({errors, [property]: ''});
  }

  /**
   * validates and updates error messages in state
   *
   * @param {string} property
   * @param {number} value
   * @memberof FormComponent
   */
  private handleErrors(property: string, value: number): void {
    let errors = this.state.errors;

    switch (property) {
      case 'estimatedPropertyValue': 
        errors.estimatedPropertyValue = 
        value < ESTIMATED_PROPERTY_VALUE_MIN || value > ESTIMATED_PROPERTY_VALUE_MAX
            ? ESTIMATED_PROPERTY_VALUE_ERROR_MSG
            : '';
        break;
      case 'borrowAmount': 
        errors.borrowAmount = 
        value < BORROW_AMOUNT_MIN || value > BORROW_AMOUNT_MAX
            ? BORROW_AMOUNT_VALUE_ERROR_MSG
            : '';
        break;
      default:
        break;
    }
    this.setState({errors, [property]: value});
  }

  /**
   * returns comma inserted value. Eg. 99,999,999
   *
   * @param {string} value
   * @returns string 
   * @memberof FormComponent
   */
  private insertCommaToValue(value: string): string {
    value = this.removeCommaFromValue(value);
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',') || value;
  }

  /**
   * returns comma removed value. Eg. 99999999
   *
   * @param {string} value
   * @returns string 
   * @memberof FormComponent
   */
  private removeCommaFromValue(value: string = ''): string {
    return (value.toString())?.replace(/,/g, "").replace(/^0+/, '') || value;
  }

  render() {
    return (
      <form className="Form" onSubmit={this.onSubmit}>
        <h4 className="Form-header">Calculate your LVR</h4>
        <div className="Form-sub-header">Enter the values below to calculate your loan to value ratio.</div>
        <InputComponent
          label={'Estimated property value'}
          value={this.state.estimatedPropertyValue}
          onChange={this.onChangeEstimatedPropValue}
          error={this.state.errors.estimatedPropertyValue}
          />
        <InputComponent
          label={'Borrow amount'}
          value={this.state.borrowAmount}
          onChange={this.onChangeBorrowAmount} 
          error={this.state.errors.borrowAmount}/>
        <div className="row">
          <div className="col p-2">
            <button type="submit" className="btn btn-primary"> Calculate</button>
            </div>
          <div className="col p-2">
            <button className="btn btn-outline-primary" onClick={this.onReset}> Reset</button>
            </div>
        </div>
      </form>
    );
  }

  private getInitialState(): FormState {
    return {
      estimatedPropertyValue: '',
      borrowAmount: '',
      errors: {
        estimatedPropertyValue: '',
        borrowAmount: ''
      }
    };
  }
}