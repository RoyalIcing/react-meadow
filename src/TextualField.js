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
      value,
      continuous,
      fieldComponent: Field,
      ...rest,
    } = this.props;

    const { pendingValue } = this.state;

    if (!!pendingValue) {
      value = pendingValue;
    }

    return (
      <Field
        type={ type }
        value={ value }
        { ...rest }
        onKeyDown={ this.onKeyDown }
        onBlur={ this.onBlur }
        onChangeValue={ continuous ? this.onCommitValue : this.onChangePendingValue }
      />
    );
  }
});
