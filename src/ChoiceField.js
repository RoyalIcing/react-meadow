import React, { PropTypes } from 'react';

import Field from './Field';

export default React.createClass({
  getDefaultProps() {
    return {
      choices: [],
      tabIndex: 0
    };
  },

  getDefaultSelectedChoiceID() {
    // Choose first item by default.
    const choices = this.props.choices;
    if (choices.length > 0) {
      return choices[0].id;
    }
  },

  getSelectedChoiceID() {
    const selectedChoiceID = this.props.value;
    if (!!selectedChoiceID) {
      return selectedChoiceID;
    }

    return this.getDefaultSelectedChoiceID();
  },

  render() {
    const { choices } = this.props;

    // Expand just a value into { id: value, title: value };
    const adjustedChoices = choices.map(choice => {
      if (typeof choice === 'string' || typeof choice === 'number') {
        return { id: choice, title: choice };
      }
      else {
        return choice;
      }
    });

    return (
      <Field { ...this.props }
        value={ getSelectedChoiceID() }
        choices={ adjustedChoices }
      />
    );
  }
});
