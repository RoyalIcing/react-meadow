import React, { PropTypes } from 'react';

export default React.createClass({
  displayName: 'Meadow.Web.Multiple',

  shouldComponentUpdate(nextProps, nextState) {
    const currentProps = this.props;

    return (
      nextProps.values != currentProps.values ||
      nextProps.title !== currentProps.title ||
      nextProps.description !== currentProps.description
      //nextProps.itemComponent !== currentProps.itemComponent
    );
  },

  render() {
    const { values, title, description, level, itemComponent: Item, onAdd, onRemoveAtIndex } = this.props;

    const items = values.map((value, index) => (
      <li key={ index }>
        <Item value={ value } index={ index } />
        <button children='Remove' onTouchTap={ () => onRemoveAtIndex(index) } />
      </li>
    ));

    return (
      <div>
        <div>{ title }</div>
        <div>{ description }</div>
        <ol>
          { items }
        </ol>
        <div>
          <button children='Add' onTouchTap={ () => onAdd() } />
        </div>
      </div>
    );
  }
});
