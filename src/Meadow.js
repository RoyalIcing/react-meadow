import React, { PropTypes } from 'react';

import TextualFieldMultiple from './TextualFieldMultiple';
import TextualField from './TextualField';
import ChoiceField from './ChoiceField';
import SwitchField from './SwitchField';
import resolveFields from './utils/resolveFields';

const Meadow = React.createClass({
  getDefaultProps() {
    return {
      fields: [],
      values: {},
      groupComponent: 'div',
      level: 0,
    }
  },

  renderField({ field, value, level }) {
    const { fieldSpecs, fieldComponent: Field, onReplaceInfoAtKeyPath } = this.props;

    const {
      type,
      id,
      multiple,
      ...rest
    } = field;

    if (type === 'group') {
      const { groupComponent, level } = this.props;

      return (
        <Meadow key={ id }
          { ...rest }
          values={ value }
          fieldComponent={ Field }
          groupComponent={ groupComponent }
          level={ level + 1 }
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
          { ...rest }
          value={ value }
          fieldSpecs={ fieldSpecs }
          fieldComponent={ Field }
          onReplaceInfoAtKeyPath={ (info, additionalKeyPath = []) => {
            const keyPath = [id].concat(additionalKeyPath);
            onReplaceInfoAtKeyPath(info, keyPath);
          } }
        />
      );
    }
    else if (type === 'choice') {
      return (
        <ChoiceField key={ id }
          { ...rest }
          type={ type }
          value={ value }
          onChangeValue={ newValue => {
            onReplaceInfoAtKeyPath(newValue, [id]);
          } }
        />
      );
    }
    else if (type === 'boolean') {
      return (
        <Field key={ id }
          { ...rest }
          type={ type }
          value={ value }
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
  },

  render() {
    const {
      fields, values, fieldSpecs, level, title, description, required, recommended, groupComponent: Group
    } = this.props;

    const resolvedFields = resolveFields({ fields, fieldSpecs });
    const fieldElements = resolvedFields.map(field => (
      renderField({
        field,
        value: values[field.id],
        level,
      })
    ));

    return (
      <Group level={ level } title={ title } description={ description } required={ required } recommended={ recommended }>
        { fieldElements }
      </Group>
    );
  }
});

export default Meadow;
