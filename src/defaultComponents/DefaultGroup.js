import React, { PropTypes } from 'react';

export default function Group({ typeChoiceField, title, description, level, inMultiple = false, children }) {
  console.log('group children', children)
  return (
    <div>
      <div>
        { title }
        { typeChoiceField }
      </div>
      { children }
    </div>
  )
}
