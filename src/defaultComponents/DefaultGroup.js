import React, { PropTypes } from 'react';
import defaultStyler from 'react-sow/default';

export default function Group({ styler = defaultStyler, typeChoiceField, title, description, level, inMultiple = false, children }) {
  const {
    header: headerStyler = defaultStyler
  } = styler;

  return (
    <div { ...styler({ level }) }>
      <div { ...headerStyler({ level }) }>
        { title }
        { typeChoiceField }
      </div>
      { children }
    </div>
  )
}

Group.displayName = 'Meadow.Web.Group'
