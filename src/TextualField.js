import React, { PropTypes } from 'react';

import * as keyCodes from './utils/keyCodes';

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
      onChangeValue: null,
      tabIndex: 0,
    };
  },

  getInitialState() {
    return {
      pendingValue: null
    };
  },

  commitPendingValue() {
    this.props.onChangeValue(this.state.pendingValue || this.props.value);

    this.setState({ pendingValue: null });
  },

  onKeyDown(event) {
    let keyCode = event.which;
    if (keyCode === keyCodes.returnOrEnter) {
      this.commitPendingValue();
    }
  },

  onBlur(event) {
    this.commitPendingValue();
  },

  onChangePendingValue(value) {
    this.setState({ pendingValue: value });
  },

  onCommitValue(value) {
    this.props.onChangeValue(value);

    this.setState({ pendingValue: null });
  },

  revertValue() {
    this.setState({ pendingValue: null });
  },

  render() {
    let {
      type,
      long,
      required,
      recommended,
      title,
      description,
      placeholder,
      continuous,
      value,
      tabIndex,
      fieldComponent: Field,
    } = this.props;

    const {
      pendingValue
    } = this.state;

    if (typeof pendingValue === 'string') {
      value = pendingValue;
    }

    return (
      <Field
        type={ type }
        value={ value }
        placeholder={ placeholder }
        onKeyDown={ this.onKeyDown }
        onBlur={ this.onBlur }
        onChangeValue={ continuous ? this.onCommitValue : this.onChangePendingValue }
        tabIndex={ tabIndex }
      />
    );
  }
});
