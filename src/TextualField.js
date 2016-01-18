import React, { PropTypes } from 'react';

import DefaultInput from './DefaultInput';
import FieldLabel from './FieldLabel';
import * as keyCodes from '../utils/keyCodes';

export default React.createClass({
  getDefaultProps() {
    return {
      type: 'text',
      long: false,
      value: null,
      required: false,
      recommended: false,
      placeholder: null,
      continuous: false,
      onValueChanged: null,
      tabIndex: 0,
      inputComponent: DefaultInput,
      labelComponent: FieldLabel,
    };
  },

  getInitialState() {
    return {
      pendingValue: null
    };
  },

  onKeyDown(event) {
    let keyCode = event.which;
    if (keyCode === keyCodes.returnOrEnter) {
      this.onCommitChange(event);
    }
  },

  onBlur(event) {
    this.onCommitChange(event);
  },

  onMakePendingChange(event) {
    this.setState({ pendingValue: event.target.value });
  },

  onCommitChange(event) {
    this.props.onValueChanged(event.target.value);

    this.setState({ pendingValue: null });
  },

  revertValue() {
    this.setState({ pendingValue: null });
  },

  render() {
    let {
      type,
      inputComponent: InputComponent,
      labelComponent: LabelComponent,
      long,
      required,
      recommended,
      title,
      description,
      placeholder,
      continuous,
      value,
      tabIndex,
      onValueChanged
    } = this.props;
    let {
      pendingValue
    } = this.state;

    if (typeof pendingValue === 'string') {
      value = pendingValue;
    }

    let inputElement;

    const onChange = continuous ?
      this.onCommitChange : this.onMakePendingChange;

    if (long) {
      inputElement = (
        <textarea
          value={ value }
          placeholder={ placeholder }
          rows={ 6 }
          onKeyDown={ this.onKeyDown }
          onBlur={ this.onBlur }
          onChange={ onChange }
          tabIndex={ tabIndex }
        />
      );
    }
    else {
      inputElement = (
        <InputComponent
          type={ type }
          value={ value }
          placeholder={ placeholder }
          onKeyDown={ this.onKeyDown }
          onBlur={ this.onBlur }
          onChange={ onChange }
          tabIndex={ tabIndex }
        />
      );
    }

    if (LabelComponent) {
      return (
        <LabelComponent
          title={ title }
          description={ description }
          required={ required }
          recommended={ recommended }
        >{ inputElement }</LabelComponent>
      );
    }
    else {
      return inputElement;
    }
  }
});
