import React, { PropTypes } from 'react';
import defaultStyler from 'react-sow/default';

export default function Group({ styler = defaultStyler, keyPath, typeChoiceField, title, description, level, inMultiple = false, children }) {
  const {
    header: headerStyler = defaultStyler,
    title: titleStyler = defaultStyler,
    description: descriptionStyler = defaultStyler,
    items: itemsStyler = defaultStyler
  } = styler;

  return (
    <div { ...styler({ keyPath, level }) }>
      <div { ...headerStyler({ keyPath, level }) }>
        { !!title && <div { ...titleStyler({ keyPath, children: title }) } /> }
        { !!description && <div { ...descriptionStyler({ children: description }) } /> }
        { typeChoiceField }
      </div>
      <div { ...itemsStyler({ keyPath, level }) }>
        { children }
      </div>
    </div>
  )
}

Group.displayName = 'Meadow.Web.Group'
