import React, { PropTypes } from 'react';

export default function FieldLabel({
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

	if (showAfterChildren) {
    children = children.concat(elements);
	}
	else {
    children = elements.concat(children);
	}

	return (
    <label>{ children }</label>
	);
};
