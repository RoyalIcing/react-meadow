import React, { PropTypes } from 'react';

import Meadow from './Meadow';

export default React.createClass({
  getDefaultProps() {
    return {
      fields: [],
      value: {},
      title: null,
      description: null,
      onReplaceInfoAtKeyPath: null,
      tabIndex: 0,
    };
  },

  onChildFieldReplaceInfoAtKeyPath(info, keyPath) {
    var onReplaceInfoAtKeyPath = this.props.onReplaceInfoAtKeyPath;
    if (onReplaceInfoAtKeyPath) {
      onReplaceInfoAtKeyPath(info, keyPath);
    }
  },

  render() {
    const {
      fields,
      fieldSpecs,
      value,
      title,
      description,
      tabIndex,
      inputComponent: InputComponent,
      labelComponent: LabelComponent
    } = this.props;

    let element = (
      <Meadow
        key='fields'
        fields={ fields }
        fieldSpecs={ fieldSpecs }
        values={ value }
        inputComponent={ inputComponent }
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
