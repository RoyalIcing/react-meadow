import React, { PropTypes } from 'react';

export default React.createClass({
  getDefaultProps() {
    return {
      value: false,
    };
  },

  render() {
    const { fieldComponent: Field, ...rest } = this.props;

    return (
      <Field { ...rest } />
    );
  }
});
