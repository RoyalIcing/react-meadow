import React, { PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';
import Divider from 'material-ui/lib/divider';

export default React.createClass({
  displayName: 'Meadow.MaterialUI.Multiple',

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
      <div key={ index }>
        <Item value={ value } index={ index } title={ title } description={ description } />
        <FlatButton label='Remove' onTouchTap={ () => onRemoveAtIndex(index) } />
        <Divider />
      </div>
    ));

    return (
      <Card>
        <CardHeader title={ title } subtitle={ description } style={{ height: 'auto', paddingBottom: 0 }} />
        <CardText>
          { items }
        </CardText>
        <CardActions>
          <FlatButton label='Add' onTouchTap={ () => onAdd() } />
        </CardActions>
      </Card>
    );
  }
});
