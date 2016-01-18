import React, { PropTypes } from 'react';

import TextualFieldMultiple from './TextualFieldMultiple';
import TextualField from './TextualField';
import ChoiceField from './ChoiceField';
import FieldGroup from './FieldGroup';
import SwitchField from './SwitchField';
import fieldTypeIsTextual from './utils/fieldTypeIsTextual';

function createElementForField({ fieldJSON, value, inputComponent, onReplaceInfoAtKeyPath }) {
  const type = fieldJSON.type || 'text';
  const ID = fieldJSON.id;
  const title = fieldJSON.title;
  const description = fieldJSON.description;
  let multiple = fieldJSON.multiple || false;
  let required = fieldJSON.required || false;
  let recommended = fieldJSON.recommended || false;
  let placeholder = fieldJSON.placeholder;

  if (fieldTypeIsTextual(type)) {
    let props = {
      key: ID,
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
      props.onValueChangedAtIndex = (newValue, valueIndex) => {
        onReplaceInfoAtKeyPath(newValue, [ID, valueIndex]);
      };

      return (
        <TextualFieldMultiple { ...props } />
      );
    }
    else {
      props.value = value;
      props.onValueChanged = (newValue) => {
        onReplaceInfoAtKeyPath(newValue, [ID]);
      };

      return (
        <TextualField { ...props } />
      );
    }
  }
  else if (type === 'choice') {
    return (
      <ChoiceField key={ ID }
        choiceInfos={ fieldJSON.choices }
        value={ value }
        title={ title }
        onReplaceInfoAtKeyPath={ (info, additionalKeyPath = []) => {
          let keyPath = [ID].concat(additionalKeyPath);
          onReplaceInfoAtKeyPath(info, keyPath);
        } }
      />
    );
  }
  else if (type === 'boolean') {
    return (
      <SwitchField key={ ID }
        value={ value }
        title={ title }
        inputComponent={ inputComponent }
        onValueChanged={ (newValue) => {
          onReplaceInfoAtKeyPath(newValue, [ID]);
        } }
      />
    );
  }
  else if (type === 'group') {
    return (
      <FieldGroup key={ ID }
        fields={ fieldJSON.fields }
        value={ value }
        title={ title }
        inputComponent={ inputComponent }
        onReplaceInfoAtKeyPath={ (info, additionalKeyPath = []) => {
          let keyPath = [ID].concat(additionalKeyPath);
          onReplaceInfoAtKeyPath(info, keyPath);
        } }
      />
    );
  }
  else {
    console.error('unknown field type', type);
  }
}

export default React.createClass({
  getDefaultProps() {
    return {
      fields: [],
      values: {},
      onChangeInfo: null
    }
  },

  render() {
    const { fields, values, inputComponent, onReplaceInfoAtKeyPath } = this.props;

    const fieldElements = fields.map((fieldJSON) => (
      createElementForField({
        fieldJSON,
        valueForField: values ? values[fieldJSON.id] : null,
        inputComponent,
        onReplaceInfoAtKeyPath
      })
    ));

    return (
      <div>
        { fieldElements }
      </div>
    );
  }
});
