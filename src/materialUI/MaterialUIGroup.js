import React, { PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

export default function MaterialUIGroup({ title, description, level, children }) {
  return (
    <Card>
      <CardHeader title={ title } subtitle={ description } />
      <CardText>
        { children }
      </CardText>
    </Card>
  );
}
