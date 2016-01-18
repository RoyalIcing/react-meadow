import React, { PropTypes } from 'react';

import FieldLabel from './FieldLabel';

export default function TextualFieldMultiple({
  type = 'text',
  values = [],
  title,
  description,
  required,
  recommended,
  placeholder,
  continuous = false,
  tabIndex = 0,
  onValueChangedAtIndex,
  inputComponent,
  labelComponent = FieldLabel,
}) {
  // Add additional value ready to be filled in.
  if (values.length === 0 || (values[values.length - 1] || '').length !== 0) {
    values = values.concat('');
  }

  const fieldElements = values.map((value, valueIndex) => (
    <TextualField key={ `field-${valueIndex}` }
      inputComponent={ inputComponent }
      labelComponent={ null }
      type={ type }
      required={ required }
      recommended={ recommended }
      placeholder={ placeholder }
      continuous={ continuous }
      value={ value }
      tabIndex={ tabIndex }
      onValueChanged={ (newValue) => {
        onValueChangedAtIndex(newValue, valueIndex)
      } }
    />
  ));

  const children = [
    <FieldLabel key='label' title={ title } description={ description } />
  ].concat(fieldElements);

  return (
    <div>{ children }</div>
  );
};
