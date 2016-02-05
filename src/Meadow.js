import React, { PropTypes } from 'react';

import TextualFieldMultiple from './TextualFieldMultiple';
import TextualField from './TextualField';
import ChoiceField from './ChoiceField';
import TypeChoice from './TypeChoice';
import resolveFields from './utils/resolveFields';

const MeadowItem = React.createClass({
  shouldComponentUpdate(nextProps, nextState) {
    const currentProps = this.props;

    return false;
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

  render() {
    const {
      field: {
        type,
        id,
        multiple,
        title,
        description,
        ...rest,
      },
      fieldSpecs,
      typeSpecs,
      value,
      level,
      inMultiple,
      fieldComponent: Field,
      groupComponent,
      multipleComponent: Multiple,
      onReplaceInfoAtKeyPath,
    } = this.props;

    if (multiple) {
      return (
        <Multiple key={ id }
          type={ type }
          title={ title }
          description={ description }
          values={ value }
          inMultiple={ inMultiple }
          itemComponent={ ({ value, index, title, description }) => (
            <MeadowItem
              field={{
                type,
                id: index,
                value,
                ...rest,
              }}
              fieldSpecs={ fieldSpecs }
              typeSpecs={ typeSpecs }
              value={ value }
              level={ level }
              title={ title }
              description={ description }
              inMultiple
              fieldComponent={ Field }
              groupComponent={ groupComponent }
              multipleComponent={ Multiple }
              onReplaceInfoAtKeyPath={ (info, additionalKeyPath = []) => {
                const keyPath = [id].concat(additionalKeyPath);
                onReplaceInfoAtKeyPath(info, keyPath);
              } }
            />
          ) }
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
          title={ title }
          description={ description }
          inMultiple={ inMultiple }
          fieldComponent={ Field }
          groupComponent={ groupComponent }
          multipleComponent={ Multiple }
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
          typeSpecs={ typeSpecs }
          title={ title }
          description={ description }
          inMultiple={ inMultiple }
          fieldComponent={ Field }
          groupComponent={ groupComponent }
          multipleComponent={ Multiple }
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
          inMultiple={ inMultiple }
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
          inMultiple={ inMultiple }
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
        props.onChangeValue = (newValue) => {
          onReplaceInfoAtKeyPath(newValue, [id]);
        };

        return (
          <TextualField { ...props } { ...rest } />
        );
      }
    }
  },
});

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

  shouldComponentUpdate(nextProps, nextState) {
    const currentProps = this.props;

    return (
      nextProps.fields !== currentProps.fields ||
      nextProps.fieldSpecs !== currentProps.fieldSpecs ||
      nextProps.typeSpecs !== currentProps.typeSpecs ||
      nextProps.values !== currentProps.values ||
      nextProps.title != currentProps.title ||
      nextProps.description != currentProps.description ||
      nextProps.fieldComponent !== currentProps.fieldComponent ||
      nextProps.groupComponent !== currentProps.groupComponent ||
      nextProps.multipleComponent !== currentProps.multipleComponent ||
      nextProps.onReplaceInfoAtKeyPath !== currentProps.onReplaceInfoAtKeyPath
    );
  },

  render() {
    const {
      fields,
      fieldSpecs,
      typeSpecs,
      values,
      level,
      typeChoiceField,
      title,
      description,
      required,
      recommended,
      inMultiple,
      fieldComponent,
      groupComponent: Group,
      multipleComponent,
      onReplaceInfoAtKeyPath,
    } = this.props;

    const resolvedFields = resolveFields({ fields, fieldSpecs });
    const fieldElements = resolvedFields.map(field => (
      <MeadowItem
        field={ field }
        fieldSpecs={ fieldSpecs }
        typeSpecs={ typeSpecs }
        value={ values ? values[field.id] : undefined }
        level={ level }
        fieldComponent={ fieldComponent }
        groupComponent={ Group }
        multipleComponent={ multipleComponent }
        onReplaceInfoAtKeyPath={ onReplaceInfoAtKeyPath }
      />
    ));

    return (
      <Group level={ level } typeChoiceField={ typeChoiceField } title={ title } description={ description } required={ required } recommended={ recommended } inMultiple={ inMultiple }>
        { fieldElements }
      </Group>
    );
  }
});

export default Meadow;
