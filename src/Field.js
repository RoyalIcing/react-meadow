import React, { PropTypes } from 'react';

export default React.createClass({
  getDefaultProps() {
    return {
      value: false,
      onChangeValue: null,
      title: null,
      description: null,
      required: false,
      recommended: false,
      tabIndex: 0,
    };
  },

  render() {
    const {
      type,
      value,
      choices,
      title,
      description,
      required,
      recommended,
      tabIndex,
      inputComponent: Input,
      labelComponent: Label,
      onChangeValue,
      ...rest
    } = this.props;

    let adjustedChoices;
    if (!!choices) {
      adjustedChoices = choices.map(choice => {
        if (typeof choice === 'string' || typeof choice === 'number') {
          return { id: choice, title: choice };
        }
        else {
          return choice;
        }
      })
    }

    const element = (
      <Input
        type={ type }
        value={ value }
        choices={ adjustedChoices }
        { ...rest }
        onChangeValue={ onChangeValue }
      />
    );

    return (
      <Label
        title={ title }
        description={ description }
        required={ required }
        recommended={ recommended }
        showAfterChildren
      >{ element }</Label>
    );
  }
});
