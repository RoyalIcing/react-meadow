import React, { PropTypes } from 'react';

import TextualFieldMultiple from './TextualFieldMultiple';
import TextualField from './TextualField';
import ChoiceField from './ChoiceField';
import TypeChoice from './TypeChoice';
import resolveFields from './utils/resolveFields';

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
    const newIndex = value.length;
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
          title={ title }
          description={ description }
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

  getInitialState() {
    const { fields, fieldSpecs } = this.props;
    return {
      resolvedFields: resolveFields({ fields, fieldSpecs }),
    };
  },

  componentWillReceiveProps(nextProps) {
    const currentProps = this.props;

    if (
      nextProps.fields !== currentProps.fields ||
      nextProps.fieldSpecs !== currentProps.fieldSpecs
    ) {
      this.setState({
        resolvedFields: resolveFields({ fields: nextProps.fields, fieldSpecs: nextProps.fieldSpecs }),
      });
    }
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

    const fieldElements = this.state.resolvedFields.map(field => (
      <MeadowItem
        key={ field.id }
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
  },
});

export default Meadow;
