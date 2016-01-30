import React, { PropTypes } from 'react';

import TextualFieldMultiple from './TextualFieldMultiple';
import TextualField from './TextualField';
import ChoiceField from './ChoiceField';
import FieldGroup from './FieldGroup';
import SwitchField from './SwitchField';
import resolveFields from './utils/resolveFields';

function createElementForField({ field, value, fieldSpecs, Field, onReplaceInfoAtKeyPath }) {
  const {
    type,
    id,
    multiple,
    ...rest
  } = field;

  if (type === 'group') {
    return (
      <FieldGroup key={ id }
        value={ value }
        fieldSpecs={ fieldSpecs }
        { ...rest }
        inputComponent={ inputComponent }
        labelComponent={ labelComponent }
        onReplaceInfoAtKeyPath={ (info, additionalKeyPath = []) => {
          const keyPath = [id].concat(additionalKeyPath);
          onReplaceInfoAtKeyPath(info, keyPath);
        } }
      />
    );
  }
  else if (type === 'typeChoice') {
    return (
      <TypeChoice key={ id }
        value={ value }
        fieldSpecs={ fieldSpecs }
        fieldComponent={ Field }
        { ...rest }
        onReplaceInfoAtKeyPath={ (info, additionalKeyPath = []) => {
          const keyPath = [id].concat(additionalKeyPath);
          onReplaceInfoAtKeyPath(info, keyPath);
        } }
      />
    );
  }
  else if (type === 'choice' || type === 'boolean') {
    return (
      <Field key={ id }
        value={ value }
        { ...rest }
        onChangeValue={ newValue => {
          onReplaceInfoAtKeyPath(newValue, [id]);
        } }
      />
    );
  }
  else {
    let props = {
      key: id,
      type,
      title,
      description,
      required,
      recommended,
      placeholder,
      inputComponent
    };

    if (multiple) {
      props.values = value;
      props.onChangeValueAtIndex = (newValue, valueIndex) => {
        onReplaceInfoAtKeyPath(newValue, [id, valueIndex]);
      };

      return (
        <TextualFieldMultiple { ...props } />
      );
    }
    else {
      props.value = value;
      props.onChangeValue = (newValue) => {
        onReplaceInfoAtKeyPath(newValue, [id]);
      };

      return (
        <TextualField { ...props } />
      );
    }
  }
}

export default React.createClass({
  getDefaultProps() {
    return {
      fields: [],
      values: {},
    }
  },

  render() {
    const {
      fields,
      fieldSpecs,
      values,
      fieldComponent: Field,
      onReplaceInfoAtKeyPath,
    } = this.props;

    const resolvedFields = resolveFields({ fields, fieldSpecs });

    const fieldElements = resolvedFields.map(field => (
      createElementForField({
        field,
        value: values[field.id],
        fieldSpecs,
        Field,
        onReplaceInfoAtKeyPath,
      })
    ));

    return (
      <div>
        { fieldElements }
      </div>
    );
  }
});
