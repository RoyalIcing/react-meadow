import React, { PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';
import Divider from 'material-ui/lib/divider';

export default function MaterialUIMultiple({ values, title, description, level, itemComponent: Item, onAdd, onRemoveAtIndex }) {
  const items = values.map((value, index) => (
    <div>
      <Item value={ value } index={ index } />
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
