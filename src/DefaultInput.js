import React, { PropTypes } from 'react';

export default function DefaultInput({ long, type, value, ...rest }) {
  if (long) {
    return (
      <textarea value={ value } rows={ 6 } { ...rest } />
    );
  }
  else if (type === 'checkbox') {
    return (
      <input type={ type } checked={ value } { ...rest } />
    );
  }
  else {
    return (
      <input type={ type } value={ value } { ...rest } />
    );
  }
}
