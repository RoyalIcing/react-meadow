import React, { PropTypes } from 'react';

import Meadow from './Meadow';

export default React.createClass({
  displayName: 'Meadow.TypeChoice',

  getDefaultProps() {
    return {
      types: [],
      onReplaceInfoAtKeyPath: null,
      tabIndex: 0
    };
  },

  getDefaultSelectedType() {
    // Choose first item by default.
    const { types } = this.props;
    if (types.length > 0) {
      return types[0].id;
    }
  },

  getSelectedType() {
    const { value } = this.props;
    let selectedType = value ? value.type : null;
    if (!selectedType) {
      selectedType = this.getDefaultSelectedType();
    }
    return selectedType;
  },

  onChangeType(newSelectedType) {
    const info = {
      type: newSelectedType
    };

    const { onReplaceInfoAtKeyPath } = this.props;
    if (onReplaceInfoAtKeyPath) {
      onReplaceInfoAtKeyPath(info, []);
    }
  },

  onChildFieldReplaceInfoAtKeyPath(info, keyPath) {
    let selectedType = this.getSelectedType();

    keyPath = [selectedType].concat(keyPath);

    var onReplaceInfoAtKeyPath = this.props.onReplaceInfoAtKeyPath;
    if (onReplaceInfoAtKeyPath) {
      onReplaceInfoAtKeyPath(info, keyPath);
    }
  },

  render() {
    const {
      types,
      value,
      title,
      description,
      tabIndex,
      inputComponent: InputComponent,
      labelComponent: LabelComponent,
    } = this.props;

    const selectedType = this.getSelectedType();
    let selectedTypeSpec = null;

    types.some(typeSpec => {
      if (typeSpec.id === selectedType) {
        selectedTypeSpec = typeSpec;
        return false;
      }

      return true;
    });

    let element = (
      <InputComponent key='typeChoice'
        type='choice'
        value={ selectedType }
        choices={ types }
        onChangeValue={ this.onChangeType }
        tabIndex={ tabIndex }
      />
    );

    if (LabelComponent) {
      element = (
        <LabelComponent key='label' title={ title } description={ description }>
          { element }
        </LabelComponent>
      );
    }

    let children = [ element ];

    // Show fields for the selected choice.
    if (!!selectedTypeSpec && selectedTypeSpec.fields) {
      children = children.concat(
        <Meadow key='fields'
          fields={ selectedTypeSpec.fields }
          values={ value }
          onReplaceInfoAtKeyPath={ this.onChildFieldReplaceInfoAtKeyPath }
        />
      );
    }

    return (
      <div>{ children }</div>
    );
  }
});
