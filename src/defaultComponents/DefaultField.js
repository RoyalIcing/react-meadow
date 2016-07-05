import React, { PropTypes } from 'react';
import defaultStyler from 'react-sow/default';

function Input({
  type, value, keyPath, onChangeValue, long, choices,
  pills = false,
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
      <input type='checkbox' checked={ value } { ...rest } { ...styler({ type, keyPath }) } onChange={ onChange } />
    );
  }
  else if (type === 'choice') {
    if (pills) {
      return (
        <div { ...styler({ type, keyPath, pills: true }) }>
          { choices.map(({ id, title }) =>
            <button key={ id }
              value={ id }
              onClick={ onChange }
              { ...(styler.choicePill || defaultStyler)({ type, keyPath, id, selected: (value == id) }) }
            >{
              title
            }</button>
          ) }
        </div>
      )
    }
    else {
      return (
        <select value={ value } { ...rest } { ...styler({ type, keyPath, pills: false }) } onChange={ onChange }>
          { choices.map((choice) =>
            <option key={ choice.id } value={ choice.id }>{ choice.title }</option>
          ) }
        </select>
      );
    }
  }
  else {
    if (long) {
      return (
        <textarea value={ value } rows={ 6 } { ...rest } { ...styler({ type, keyPath }) } onChange={ onChange } />
      );
    } else {
      return (
        <input type={ type } value={ value } { ...rest } { ...styler({ type, keyPath }) } onChange={ onChange } />
      );
    }
  }
}

function Label({
  type, keyPath, title, description, children, required = false, recommended = false, showAfterChildren = false,
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
		<span { ...titleStyler({ type, keyPath }) } key='title'>
      { title }
    </span>
	);

	if (description) {
    elements.push(
			<span { ...descriptionStyler({ type, keyPath }) } key='description'>
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
    <label { ...styler({ type, keyPath, required, recommended }) }>{ children }</label>
	);
}

export default function Field({
  type,
  keyPath,
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
      keyPath={ keyPath }
      title={ title }
      description={ description }
      required={ required }
      recommended={ recommended }
      showAfterChildren={ type === 'boolean' }
      styler={ labelStyler }
    >
      <Input
        type={ type }
        keyPath={ keyPath }
        styler={ inputStyler }
        { ...rest }
        onChangeValue={ onChangeValue }
      />
    </Label>
  );
};

Field.displayName = 'Meadow.Web.Field'
