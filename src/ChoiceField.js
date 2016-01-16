import React, { PropTypes } from 'react';

import FieldLabel from './FieldLabel';
import Meadow from './Meadow';

export default React.createClass({
  getDefaultProps() {
    return {
      choiceInfos: [],
      labelComponent: FieldLabel,
      value: {},
      onReplaceInfoAtKeyPath: null,
      tabIndex: 0
    };
  },

  getDefaultSelectedChoiceID() {
    // Choose first item by default.
    const choiceInfos = this.props.choiceInfos;
    if (choiceInfos.length > 0) {
      return choiceInfos[0].id;
    }
  },

  getSelectedChoiceID() {
    var value = this.props.value;
    var selectedChoiceID = value ? value.choice_selectedID : null;
    if (!selectedChoiceID) {
      selectedChoiceID = this.getDefaultSelectedChoiceID();
    }
    return selectedChoiceID;
  },

  onSelectChange(event) {
    let newSelectedChoiceID = event.target.value;
    let info = {
      choice_selectedID: newSelectedChoiceID
    };
    info[newSelectedChoiceID] = {};

    let onReplaceInfoAtKeyPath = this.props.onReplaceInfoAtKeyPath;
    if (onReplaceInfoAtKeyPath) {
      onReplaceInfoAtKeyPath(info, []);
    }
  },

  onChildFieldReplaceInfoAtKeyPath(info, keyPath) {
    let selectedChoiceID = this.getSelectedChoiceID();

    keyPath = [selectedChoiceID].concat(keyPath);

    var onReplaceInfoAtKeyPath = this.props.onReplaceInfoAtKeyPath;
    if (onReplaceInfoAtKeyPath) {
      onReplaceInfoAtKeyPath(info, keyPath);
    }
  },

  render() {
    const {
      choiceInfos,
      value,
      title,
      tabIndex,
      labelComponent: LabelComponent,
    } = this.props;

    const selectedChoiceID = this.getSelectedChoiceID();
    let selectedChoiceInfo = null;

    // Create <option> for each choice.
    const optionElements = choiceInfos.map((choiceInfo, choiceIndex) => {
      if (choiceInfo.id === selectedChoiceID) {
        selectedChoiceInfo = choiceInfo;
      }

      return (
        <option key={ choiceInfo.id } value={ choiceInfo.id }>
          { choiceInfo.title }
        </option>
      );
    });

    let element = (
      <select key='select'
        value={ selectedChoiceID }
        onChange={ this.onSelectChange }
        tabIndex={ tabIndex }
      >
        { optionElements }
      </select>
    );

    if (LabelComponent) {
      element = (
        <LabelComponent key='label' title={ title }>
          { element }
        </LabelComponent>
      );
    }

    let children = [ element ];

    // Show fields for the selected choice.
    if (selectedChoiceInfo && selectedChoiceInfo.fields) {
      children = children.concat(
        <Meadow key='fields'
          fields={ selectedChoiceInfo.fields }
          values={ value ? value[selectedChoiceID] : null }
          onReplaceInfoAtKeyPath={ this.onChildFieldReplaceInfoAtKeyPath }
        />
      );
    }

    return (
      <div>{ children }</div>
    );
  }
});
