import React, { PropTypes } from 'react';

import FieldLabel from './FieldLabel';
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
      inputComponent: InputComponent,
      labelComponent: LabelComponent
    } = this.props;

    let element = (
      <Meadow
        key='fields'
        fields={ fields }
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
