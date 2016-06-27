import React, { PropTypes } from 'react';

import TextualFieldMultiple from './TextualFieldMultiple';
import TextualField from './TextualField';
import ChoiceField from './ChoiceField';
import TypeChoice from './TypeChoice';

const MeadowItem = React.createClass({
  shouldComponentUpdate(nextProps, nextState) {
    const currentProps = this.props;

    return (
      nextProps.field !== currentProps.field ||
      nextProps.fieldSpecs !== currentProps.fieldSpecs ||
      nextProps.typeSpecs !== currentProps.typeSpecs ||
      nextProps.value !== currentProps.value ||
      nextProps.inMultiple != currentProps.inMultiple ||
      nextProps.fieldComponent !== currentProps.fieldComponent ||
      nextProps.groupComponent !== currentProps.groupComponent ||
      nextProps.multipleComponent !== currentProps.multipleComponent ||
      nextProps.onReplaceInfoAtKeyPath !== currentProps.onReplaceInfoAtKeyPath
    );
  },

  getKeyPath(additionalKeyPath) {
    const { field, multipleIndex } = this.props;

    let keyPath = [];

    if (typeof multipleIndex !== 'undefined') {
      keyPath.push(multipleIndex);
    }
    else {
      keyPath.push(field.id);
    }

    if (!!additionalKeyPath) {
      return keyPath.concat(additionalKeyPath);
    }
    else {
      return keyPath;
    }
  },

  onReplaceInfoAtKeyPath(info, additionalKeyPath = []) {
    this.props.onReplaceInfoAtKeyPath(info, this.getKeyPath(additionalKeyPath));
  },

  onAdd() {
    const newIndex = this.props.value.length;
    this.props.onReplaceInfoAtKeyPath({}, this.getKeyPath([newIndex]));
  },

  onRemoveAtIndex(index) {
    // FIXME:
    this.props.onReplaceInfoAtKeyPath(null, this.getKeyPath([index]));
  },

  onChangeValue(newValue) {
    this.props.onReplaceInfoAtKeyPath(newValue, this.getKeyPath());
  },

  render() {
    const {
      field: {
        type,
        id,
        multiple = false,
        title,
        description,
        ...rest,
      },
      fieldSpecs,
      typeSpecs,
      value,
      level,
      ignoreMultiple = false,
      inMultiple,
      fieldComponent: Field,
      groupComponent,
      multipleComponent: Multiple,
    } = this.props;

    console.log('field', this.props.field)

    if (multiple && !ignoreMultiple) {
      return (
        <Multiple key={ id }
          type={ type }
          title={ title }
          description={ description }
          values={ value }
          inMultiple={ inMultiple }
          itemComponent={ ({ value, index }) => (
            <MeadowItem
              field={ this.props.field }
              fieldSpecs={ fieldSpecs }
              typeSpecs={ typeSpecs }
              value={ value }
              level={ level }
              title={ title }
              description={ description }
              ignoreMultiple
              multipleIndex={ index }
              inMultiple
              fieldComponent={ Field }
              groupComponent={ groupComponent }
              multipleComponent={ Multiple }
              onReplaceInfoAtKeyPath={ this.onReplaceInfoAtKeyPath }
            />
          ) }
          onAdd={ this.onAdd }
          onRemoveAtIndex={ this.onRemoveAtIndex }
        />
      );
    }
    else if (type === 'group') {
      return (
        <Meadow key={ id }
          { ...rest }
          values={ value }
          fieldSpecs={ fieldSpecs }
          typeSpecs={ typeSpecs }
          title={ inMultiple ? undefined : title }
          description={ inMultiple ? undefined : description }
          inMultiple={ inMultiple }
          fieldComponent={ Field }
          groupComponent={ groupComponent }
          multipleComponent={ Multiple }
          level={ level + 1 }
          onReplaceInfoAtKeyPath={ this.onReplaceInfoAtKeyPath }
        />
      );
    }
    else if (type === 'typeChoice') {
      return (
        <TypeChoice key={ id }
          { ...rest }
          value={ value }
          fieldSpecs={ fieldSpecs }
          typeSpecs={ typeSpecs }
          title={ title }
          description={ description }
          inMultiple={ inMultiple }
          fieldComponent={ Field }
          groupComponent={ groupComponent }
          multipleComponent={ Multiple }
          onReplaceInfoAtKeyPath={ this.onReplaceInfoAtKeyPath }
        />
      );
    }
    else if (type === 'choice') {
      return (
        <ChoiceField key={ id }
          { ...rest }
          type={ type }
          value={ value }
          title={ title }
          description={ description }
          inMultiple={ inMultiple }
          fieldComponent={ Field }
          onChangeValue={ this.onChangeValue }
        />
      );
    }
    else if (type === 'boolean') {
      return (
        <Field key={ id }
          { ...rest }
          type={ type }
          value={ value }
          title={ title }
          description={ description }
          inMultiple={ inMultiple }
          onChangeValue={ this.onChangeValue }
        />
      );
    }
    else {
      let props = {
        key: id,
        type,
        title,
        description,
        inMultiple,
        fieldComponent: Field,
      };

      if (multiple) {
        props.values = value;
        props.onChangeValueAtIndex = (newValue, valueIndex) => {
          onReplaceInfoAtKeyPath(newValue, [id, valueIndex]);
        };

        return (
          <TextualFieldMultiple { ...props } { ...rest } />
        );
      }
      else {
        props.value = value;
        props.onChangeValue = this.onChangeValue;

        return (
          <TextualField { ...props } { ...rest } />
        );
      }
    }
  },
});

export default MeadowItem