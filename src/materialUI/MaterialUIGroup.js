import React, { PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';

export default function MaterialUIGroup({ title, description, level, children }) {
  return (
    <Card style={{ marginBottom: (level === 0 ? 16 : 0) }}>
      <CardHeader title={ title } subtitle={ description } style={{ height: 'auto', paddingBottom: 0 }} />
      <CardText style={{ paddingTop: 0 }}>
        { children }
      </CardText>
    </Card>
  );
}
