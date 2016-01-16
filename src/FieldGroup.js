import React, { PropTypes } from 'react';

import FieldLabel from './FieldLabel';

export default React.createClass({
  getDefaultProps() {
    return {
      fields: [],
      value: {},
      title: null,
      description: null,
      onReplaceInfoAtKeyPath: null,
      tabIndex: 0,
      labelComponent: FieldLabel,
    };
  },

  onChildFieldReplaceInfoAtKeyPath(info, keyPath) {
    var onReplaceInfoAtKeyPath = this.props.onReplaceInfoAtKeyPath;
    if (onReplaceInfoAtKeyPath) {
      onReplaceInfoAtKeyPath(info, keyPath);
    }
  },

  render() {
    let {
      fields,
      value,
      title,
      description,
      tabIndex,
      labelComponent: LabelComponent
    } = this.props;

    let element = (
      <FieldsHolder
        key='fields'
        fields={ fields }
        values={ value }
        onReplaceInfoAtKeyPath={ this.onChildFieldReplaceInfoAtKeyPath }
      />
    );

    if (LabelComponent) {
      element = (
        <LabelComponent key='label' title={ title } description={ description }>
          { element }
        </LabelComponent>
      );
    }

    return (
      <div>{ children }</div>
    );
  }
});
