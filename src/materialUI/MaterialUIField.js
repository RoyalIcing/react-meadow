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

  const onSelectChange = (event, index, value) => {
    onChangeValue(value);
  }

  const onFieldChange = (event) => {
    onChangeValue(event.target.value);
  }

  const onCheckedChange = (event) => {
    onChangeValue(event.target.checked);
  }

  if (type === 'boolean') {
    return (
      <Checkbox checked={ value } label={ title } errorText={ errorText } { ...rest } onChange={ onCheckedChange } />
    );
  }
  else if (type === 'choice') {
    return (
      <SelectField value={ value } floatingLabelText={ title } fullWidth errorText={ errorText } { ...rest } onChange={ onSelectChange }>
        { choices.map(choice =>
          <MenuItem key={ choice.id } value={ choice.id } primaryText={ choice.title } />
        ) }
      </SelectField>
    );
  }
  else {
    if (long) {
      return (
        <TextField value={ value } floatingLabelText={ title } hintText={ placeholder} fullWidth multiLine rows={ 2 } rowsMax={ 6 } errorText={ errorText } { ...rest } onChange={ onFieldChange } />
      )
    } else {
      return (
        <TextField type={ type } value={ value } floatingLabelText={ title } hintText={ placeholder} fullWidth errorText={ errorText } { ...rest } onChange={ onFieldChange } />
      );
    }
  }
}
