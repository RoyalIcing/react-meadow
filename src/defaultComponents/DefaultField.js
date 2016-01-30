import React, { PropTypes } from 'react';

function Input({
  type, value, onChangeValue, long, choices, ...rest
}) {
  const onChange = (event) => {
    const { target } = event;

    onChangeValue((typeof target.value !== 'undefined') ? target.value : target.checked);

    if (!!rest.onChange) {
      rest.onChange(event);
    }
  }

  if (type === 'boolean') {
    return (
      <input type='checkbox' checked={ value } { ...rest } onChange={ onChange } />
    );
  }
  else if (type === 'choice') {
    return (
      <select value={ value } { ...rest } onChange={ onChange }>
        { choices.map(choice =>
          <option key={ choice.id } value={ choice.id }>{ choice.title }</option>
        ) }
      </select>
    );
  }
  else {
    if (long) {
      return (
        <textarea value={ value } rows={ 6 } { ...rest } onChange={ onChange } />
      );
    } else {
      return (
        <input type={ type } value={ value } { ...rest } onChange={ onChange } />
      );
    }
  }
}

function Label({
  title, description, children, required = false, recommended = false, showAfterChildren = false
}) {
  if (required) {
		title += ' (required)'
	}
	else if (recommended) {
		title += ' (recommended)'
	}

  let elements = [];

	elements.push(
		<span key='title'>
      { title }
    </span>
	);

	if (description) {
    elements.push(
			<span key='description'>
        { description }
      </span>
		);
	}

  children = (showAfterChildren) ? (
    children.concat(elements)
  ) : (
    elements.concat(children)
  );

	return (
    <label>{ children }</label>
	);
}

export default function Field({
  type,
  title,
  description,
  required,
  recommended,
  tabIndex,
  onChangeValue,
  ...rest
}) {
  return (
    <Label
      title={ title }
      description={ description }
      required={ required }
      recommended={ recommended }
      showAfterChildren={ type === 'boolean' }
    >
      <Input
        type={ type }
        { ...rest }
        onChangeValue={ onChangeValue }
      />
    </Label>
  );
};
