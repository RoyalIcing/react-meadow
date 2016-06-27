import React, { PropTypes } from 'react';

import MeadowItem from './MeadowItem';
import resolveFields from './utils/resolveFields';

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
      multipleComponent: PropTypes.object.isRequired,
      title: PropTypes.string,
      description: PropTypes.string,
      onReplaceInfoAtKeyPath: PropTypes.func.isRequired,
    };
  },

  getInitialState() {
    let { fields, fieldSpecs, typeSpecs, values } = this.props;

    if (fields == null && !!values.type) {
      fields = typeSpecs[values.type].fields;
    }

    return {
      resolvedFields: resolveFields({ fields, fieldSpecs }),
    };
  },

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps')
    const currentProps = this.props;

    if (
      nextProps.fields !== currentProps.fields ||
      nextProps.fieldSpecs !== currentProps.fieldSpecs ||
      nextProps.typeSpecs !== currentProps.typeSpecs ||
      nextProps.values !== currentProps.values
    ) {
      let { fields, fieldSpecs, typeSpecs, values } = nextProps;
      if (fields == null && !!values.type) {
        fields = typeSpecs[values.type].fields;
      }

      this.setState({
        resolvedFields: resolveFields({ fields, fieldSpecs }),
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

    console.log(this.props, 'this.state.resolvedFields', this.state.resolvedFields)

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

Meadow.Item = MeadowItem;

export default Meadow;
