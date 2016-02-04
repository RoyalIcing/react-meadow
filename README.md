# react-meadow

React Meadow allows you to create complex forms with nested groups, repeating fields, and connect it to JSON.

It allows any UI components to be used, such as native web, Material UI, Bootstrap, or your own.

## Installation

```sh
npm install react-meadow --save
```

## Props

### `Meadow`

- `fieldSpecs` · JSON array with all the possible fields available. Each field spec has:
  - `id` · the unique identifier for this field.
  - `type`, one the following with additional properties:
    - `"type": "choice"` · A dropdown menu
    - `"choices": [ { "id": "some-identifier", "title": "Displayed" }...]` · An array of items to be displayed in the dropdown menu.
    - `"type": "text"` · A text field. The `type` can also be any of the HTML 5 input types, such as `email`, `tel`, etc.
    - `"type": "group"` · A group of fields.
  - `multiple` · a boolean for whether this field supports a single value (`false`) or multiple values (`true`) as an array.
- `fields` · Ordered array of field spec IDs. These are the fields you want displayed, with their specifications pulled from `fieldSpecs`.
- `values` · JSON object
- `fieldComponent` · the React component used to display the individual fields.
- `groupComponent` · the React component used to wrap several components in a group.
- `multipleComponent` · the React component used to wrap multiple components in a list.
- `onReplaceInfoAtKeyPath(info, keyPath)` · a callback when a field is changed, scoped to its position in the form. More information on how to use it is provided below.

## Receiving changes

Use the `onReplaceInfoAtKeyPath` prop to receive changes. These are scoped to the particular element in the form that was changed, with a key path, an array of strings (for an object’s key) and numbers (for array’s index) denoting to the position of the information in the JSON tree.

The information can be merged with your previous JSON data using lodash’s `_.set(...)` or Immutable.js’s `Map.setIn(...)`. You then pass this merged information back to Meadow with the `values` prop.

With lodash 4, you just achieve this by:

```
import cloneDeep from 'lodash/lang/cloneDeep';
import set from 'lodash/object/set';
  
function replaceInfoAtKeyPath(originalInfo, changedInfo, keyPath) {
  return set(cloneDeep(originalInfo), keyPath, changedInfo);
}
```

## UI components

The particular components for rendering fields, groups, and multiples are all customizable. You can use a pre-existing UI library:

- Native Web: `react-meadow/lib/defaultComponents`
- Material UI: `react-meadow/lib/materialUI`
- Bootstrap: to come

Then pass the result of this to Meadow:

```
import Meadow from 'react-meadow';
import * as materialUIMeadow from 'react-meadow/lib/materialUI';

function Example() {
  return (
    <Meadow { ...materialUIMeadow } fields={ fields } values={ values } />
  );
}
```
