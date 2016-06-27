import React, { PropTypes } from 'react';

import Meadow from './Meadow';

export default React.createClass({
  displayName: 'Meadow.TypeChoice',

  getDefaultProps() {
    return {
      types: [],
      onReplaceInfoAtKeyPath: null,
      tabIndex: 0,
    };
  },

  shouldComponentUpdate(nextProps, nextState) {
    const currentProps = this.props;

    return (
      nextProps.types !== currentProps.types ||
      nextProps.value != currentProps.value ||
      nextProps.typeSpecs !== currentProps.typeSpecs ||
      nextProps.fieldSpecs !== currentProps.fieldSpecs ||
      nextProps.fieldComponent !== currentProps.fieldComponent ||
      nextProps.onReplaceInfoAtKeyPath !== currentProps.onReplaceInfoAtKeyPath
    );
  },

  getSelectedType() {
    const { value } = this.props;
    return value ? value.type : null;
  },

  onChangeType(newSelectedType) {
    const { value } = this.props;

    if (!!value && (value.type === newSelectedType)) {
      return;
    }

    const info = {
      type: newSelectedType,
    };

    this.props.onReplaceInfoAtKeyPath(info, []);
  },

  render() {
    const {
      types,
      value,
      typeSpecs,
      fieldSpecs,
      level,
      fieldComponent: Field,
      groupComponent,
      multipleComponent,
      onReplaceInfoAtKeyPath,
      ...rest,
    } = this.props;

    const selectedType = this.getSelectedType();
    let selectedTypeSpec = null;

    types.some(typeID => {
      if (typeID === selectedType) {
        selectedTypeSpec = typeSpecs[typeID];
      }

      return false;
    });

    const typeChoices = types.map(typeID => ({
      id: typeID,
      title: typeSpecs[typeID].title,
    }));

    const typeChoiceField = (
      <Field key='typeChoice'
        type='choice'
        value={ selectedType }
        choices={ typeChoices }
        { ...rest }
        title='Type'
        onChangeValue={ this.onChangeType }
      />
    );

    console.log('typeChoiceField', typeChoiceField)

    return (
      <Meadow key='fields'
        fields={ !!selectedTypeSpec ? selectedTypeSpec.fields : [] }
        values={ value }
        typeSpecs={ typeSpecs }
        fieldSpecs={ fieldSpecs }
        level={ level + 1 }
        typeChoiceField={ typeChoiceField }
        fieldComponent={ Field }
        groupComponent={ groupComponent }
        multipleComponent={ multipleComponent }
        onReplaceInfoAtKeyPath={ onReplaceInfoAtKeyPath }
      />
    );
  },
});
