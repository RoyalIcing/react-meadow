import React, { PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import FlatButton from 'material-ui/lib/flat-button';

export default function MaterialUIGroup({ title, description, level, inMultiple = false, children }) {
  return (
    <Card style={{ marginBottom: ((level === 0 || inMultiple) ? 16 : 0) }}>
      { (!!title || !!description) &&
        <CardHeader title={ title } subtitle={ description } style={{ height: 'auto', paddingBottom: 0 }} />
      }
      <CardText style={{ paddingTop: 0 }}>
        { children }
      </CardText>
    </Card>
  );
}
