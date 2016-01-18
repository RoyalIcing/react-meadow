import React, { PropTypes } from 'react';

import DefaultInput from './DefaultInput';
import FieldLabel from './FieldLabel';

export default React.createClass({
  getDefaultProps() {
    return {
      value: false,
      onValueChanged: null,
      title: null,
      description: null,
      required: false,
      recommended: false,
      tabIndex: 0,
      inputComponent: DefaultInput,
      labelComponent: FieldLabel,
    };
  },

  onChange(event) {
    let previousValue = this.props.value;
    let newValue = !previousValue;

    let onValueChanged = this.props.onValueChanged;
    if (onValueChanged) {
      onValueChanged(newValue);
    }
  },

  render() {
    const {
      value,
      inputComponent: InputComponent,
      labelComponent: LabelComponent,
      title,
      description,
      required,
      recommended,
      tabIndex
    } = this.props;

    const element = (
      <InputComponent
        key='checkbox'
        type='checkbox'
        value={ value }
        onChange={ this.onChange }
      />
    );

    return (
      <LabelComponent
        title={ title }
        description={ description }
        required={ required }
        recommended={ recommended }
        showAfterChildren
      >{ element }</LabelComponent>
    );
  }
});
