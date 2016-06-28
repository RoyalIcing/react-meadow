import React, { PropTypes } from 'react';
import defaultStyler from 'react-sow/default';

function Input({
  type, value, onChangeValue, long, choices,
  styler = defaultStyler,
  ...rest
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
      <input type='checkbox' checked={ value } { ...rest } { ...styler({ type }) } onChange={ onChange } />
    );
  }
  else if (type === 'choice') {
    return (
      <select value={ value } { ...rest } { ...styler({ type }) } onChange={ onChange }>
        { choices.map(choice =>
          <option key={ choice.id } value={ choice.id }>{ choice.title }</option>
        ) }
      </select>
    );
  }
  else {
    if (long) {
      return (
        <textarea value={ value } rows={ 6 } { ...rest } { ...styler({ type }) } onChange={ onChange } />
      );
    } else {
      return (
        <input type={ type } value={ value } { ...rest } { ...styler({ type }) } onChange={ onChange } />
      );
    }
  }
}

function Label({
  type, title, description, children, required = false, recommended = false, showAfterChildren = false,
  styler = defaultStyler
}) {
  const { 
    title: titleStyler = defaultStyler,
    description: descriptionStyler = defaultStyler 
  } = styler;

  if (required) {
		title += ' (required)'
	}
	else if (recommended) {
		title += ' (recommended)'
	}

  let elements = [];

	elements.push(
		<span { ...titleStyler({ type }) } key='title'>
      { title }
    </span>
	);

	if (description) {
    elements.push(
			<span { ...descriptionStyler({ type }) } key='description'>
        { description }
      </span>
		);
	}

  children = React.Children.toArray(children);

  children = (showAfterChildren) ? (
    children.concat(elements)
  ) : (
    elements.concat(children)
  );

	return (
    <label { ...styler({ type, required }) }>{ children }</label>
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
  inputStyler,
  labelStyler,
  ...rest
}) {
  return (
    <Label
      type={ type }
      title={ title }
      description={ description }
      required={ required }
      recommended={ recommended }
      showAfterChildren={ type === 'boolean' }
      styler={ labelStyler }
    >
      <Input
        type={ type }
        styler={ inputStyler }
        { ...rest }
        onChangeValue={ onChangeValue }
      />
    </Label>
  );
};
