import React, { PropTypes } from 'react';

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
      labelComponent: LabelComponent,
      title,
      description,
      required,
      recommended,
      tabIndex
    } = this.props;

    const element = (
      <input
        key='checkbox'
        type='checkbox'
        checked={ value }
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
