import React, { PropTypes } from 'react';

import TextualFieldMultiple from './TextualFieldMultiple';
import TextualField from './TextualField';
import ChoiceField from './ChoiceField';
import TypeChoice from './TypeChoice';
import resolveFields from './utils/resolveFields';

function renderField({
  field,
  fieldSpecs,
  value,
  level,
  fieldComponent: Field,
  groupComponent,
  multipleComponent,
  onRemoveAtIndex,
}) {
  const {
    type,
    id,
    multiple,
    title,
    description,
    ...rest,
  } = field;

  if (multiple) {
    return (
      <Multiple
        title={ title }
        description={ description }
        values={ values }
        itemComponent={
          ({ value, index }) => renderField({
            field: {
              type,
              id: index,
              value,
              ...rest,
            },
            fieldSpecs,
            value,
            level,
            fieldComponent: Field,
            groupComponent,
            multipleComponent,
            onReplaceInfoAtKeyPath: (value, additionalKeyPath = []) => {
              const keyPath = [id].concat(additionalKeyPath);
              onReplaceInfoAtKeyPath(newValue, keyPath);
            },
          })
        }
      />
    );
  }
  else if (type === 'group') {
    return (
      <Meadow key={ id }
        { ...rest }
        values={ value }
        fieldSpecs={ fieldSpecs }
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
        title={ title }
        description={ description }
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
        title={ title }
        description={ description }
        fieldComponent={ Field }
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
        title={ title }
        description={ description }
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
      props.onChangeValue = (newValue) => {
        onReplaceInfoAtKeyPath(newValue, [id]);
      };

      return (
        <TextualField { ...props } { ...rest } />
      );
    }
  }
}

const Meadow = React.createClass({
  getDefaultProps() {
    return {
      groupComponent: 'div',
      level: 0,
    };
  },

  getPropTypes() {
    return {
      fields: PropTypes.arrayOf(PropTypes.oneOf([
        PropTypes.string.isRequired,
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
        })
      ])).isRequired,
      fieldSpecs: PropTypes.objectOf(
        PropTypes.shape({
          type: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
        })
      ),
      values: PropTypes.object.isRequired,
      fieldComponent: PropTypes.object.isRequired,
      groupComponent: PropTypes.object.isRequired,
      //multipleComponent: PropTypes.object.isRequired,
      title: PropTypes.string,
      description: PropTypes.string,
      onReplaceInfoAtKeyPath: PropTypes.func.isRequired,
    };
  },

  render() {
    const {
      fields,
      fieldSpecs,
      values,
      level,
      title,
      description,
      required,
      recommended,
      fieldComponent,
      groupComponent: Group,
      multipleComponent,
      onReplaceInfoAtKeyPath,
    } = this.props;

    const resolvedFields = resolveFields({ fields, fieldSpecs });
    const fieldElements = resolvedFields.map(field => (
      field.multiple ? (
        this.renderMultiple({
          field,
          fieldSpecs,
          values: values[field.id],
          level,
          fieldComponent,
          groupComponent: Group,
          multipleComponent,
          onReplaceInfoAtKeyPath,
        })
      ) : (
        this.renderField({
          field,
          fieldSpecs,
          value: values[field.id],
          level,
          fieldComponent,
          groupComponent: Group,
          multipleComponent,
          onReplaceInfoAtKeyPath,
        })
      )
    ));

    return (
      <Group level={ level } title={ title } description={ description } required={ required } recommended={ recommended }>
        { fieldElements }
      </Group>
    );
  }
});

export default Meadow;
