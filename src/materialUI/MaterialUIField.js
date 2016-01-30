import React, { PropTypes } from 'react';
import TextField from 'material-ui/lib/text-field';
import Checkbox from 'material-ui/lib/checkbox';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default function MaterialUIField({
  type, value, title, description, placeholder, required, recommended, onChangeValue, long, choices, ...rest
}) {
  // TODO: present description?
  
  let errorText;

  if (required && !!value) {
    errorText = 'Required';
  }

  const onChange = (event) => {
    const { target } = event;

    onChangeValue((typeof target.value !== 'undefined') ? target.value : target.checked);

    if (!!rest.onChange) {
      rest.onChange(event);
    }
  }

  if (type === 'boolean') {
    return (
      <Checkbox checked={ value } label={ title } errorText={ errorText } { ...rest } onChange={ onChange } />
    );
  }
  else if (type === 'choice') {
    return (
      <SelectField value={ value } floatingLabelText={ title } errorText={ errorText } { ...rest } onChange={ onChange }>
        { choices.map(choice =>
          <MenuItem key={ choice.id } value={ choice.id } primaryText={ choice.title } />
        ) }
      </SelectField>
    );
  }
  else {
    if (long) {
      return (
        <TextField value={ value } floatingLabelText={ title } hintText={ placeholder} multiLine rows={ 2 } rowsMax={ 6 } errorText={ errorText } { ...rest } onChange={ onChange } />
      )
    } else {
      return (
        <TextField type={ type } value={ value } floatingLabelText={ title } hintText={ placeholder} errorText={ errorText } { ...rest } onChange={ onChange } />
      );
    }
  }
}
