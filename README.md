# react-meadow

React Meadow allows you to create complex forms from JSON data. It supports text fields, dropdowns, nested groups, and repeated fields.

It allows any UI components to be used, such as native web, Material UI, Bootstrap, or your own.

## Installation

```sh
npm install react-meadow --save
```

## Field Specs

A field spec is a JSON declaration for a particular field. Each field spec has an `id`, which you match a key within your JSON data.

A field spec has a `type` property, which can be one of the following:
- `text` · A text field. The `type` can also be any of the HTML 5 input types, such as `email`, `tel`, etc.
- `choice` · A dropdown menu. Additional properties alongside are:
    - `choices: [ { "id": "some-identifier", "title": "Displayed" }...]` · An array of items to be displayed in the dropdown menu.
- `boolean` · A checkbox representing a value which can be either `true` or `false`.
- `group` · A group of fields, representing a child object in the JSON data. Additional properties alongside are:
  - `"fields": [ "some-field" ]` · An array of field spec IDs matching a key within the JSON data, or optionally a entire field spec object.


## Props

### `Meadow`

- `fieldSpecs` · JSON array of field specs (see above) with all the possible fields available.
- `fields` · Ordered array of field spec IDs. These are the fields you want displayed, with their specifications pulled from `fieldSpecs`.
- `values` · Your JSON data
- `fieldComponent` · the React component used to display the individual fields.
- `groupComponent` · the React component used to wrap several components in a group.
- `multipleComponent` · the React component used to wrap multiple components in a list.
- `onReplaceInfoAtKeyPath(info, keyPath)` · a callback when a field is changed, scoped to its position in the form. More information on how to use it is provided below.

## Receiving changes

Use the `onReplaceInfoAtKeyPath` prop to receive changes. These are scoped to the particular element in the form that was changed, with a key path, an array of strings (for an object’s key) and numbers (for array’s index) denoting to the position of the information in the JSON tree.

The information can be merged with your previous JSON data using lodash’s `_.set(...)` or Immutable.js’s `Map.setIn(...)`. You then pass this merged information back to Meadow with the `values` prop.

With **lodash 4**, you can merge changes using:

```javascript
import cloneDeep from 'lodash/lang/cloneDeep';
import set from 'lodash/object/set';

function mergeInfoAtKeyPath(originalInfo, changedInfo, keyPath) {
  return set(cloneDeep(originalInfo), keyPath, changedInfo);
}
```

With **Immutable.js**, you can merge using:

```javascript
import Immutable from 'immutable';

function mergeInfoAtKeyPath(originalImmutableMap, changedInfo, keyPath) {
  return originalImmutableMap.setIn(keyPath, Immutable.fromJS(changedInfo));
}
```

You can then pass use function with Meadow’s `onReplaceInfoAtKeyPath` handler, assuming the information is kept in your component’s state:

```javascript
export default ExampleForm = React.createClass({
  getInitialState() {
    return {
      info: this.props.initialInfo
    };
  },
  
  onReplaceInfoAtKeyPath(changedInfo, keyPath) {
    this.setState(({ info }) => ({
      info: mergeInfoAtKeyPath(info, changedInfo, keyPath) // See above for declaration
    }));
  },
  
  render() {
    return (
      <Meadow /* ... */ onReplaceInfoAtKeyPath={ this.onReplaceInfoAtKeyPath } /> // Or .bind(this) if using ES6 classes
    );
  }
})
```

## UI components

The particular components for rendering fields, groups, and multiples are all customizable. You can use a pre-existing UI library:

- Native Web: `react-meadow/lib/defaultComponents`
- Material UI: `react-meadow/lib/materialUI`
- Bootstrap: to come

Then pass the result of this to Meadow:

```javascript
import Meadow from 'react-meadow';
import * as materialUIComponents from 'react-meadow/lib/materialUI';

function MaterialUIMeadow({ fields, values, onReplaceInfoAtKeyPath }) {
  return (
    <Meadow { ...materialUIComponents } fields={ fields } values={ values } onReplaceInfoAtKeyPath={ onReplaceInfoAtKeyPath } />
  );
}
```
