import React from 'react';

import {
  CheckBoxList_t,
  CheckBox_t,
  Clock_t,
  DoubleSpinner_t,
  DropDownList_t,
  EditableDropDownList_t,
  HiddenField_t,
  Label_t,
  MultiSelectList_t,
  RadioButtonList_t,
  RadioButton_t,
  SingleSelectList_t,
  SingleSpinner_t,
  Slider_t,
  TextField_t,
} from './components';

import { Control } from './model/atdl';

const ControlType: { [key: string]: React.ComponentType<{ control: Control }> } = {
  CheckBoxList_t,
  CheckBox_t,
  Clock_t,
  DropDownList_t,
  EditableDropDownList_t,
  DoubleSpinner_t,
  HiddenField_t,
  Label_t,
  MultiSelectList_t,
  RadioButtonList_t,
  RadioButton_t,
  SingleSelectList_t,
  SingleSpinner_t,
  Slider_t,
  TextField_t,
};

interface Props {
  type: string;
  control: Control;
}

export const AtdlControl: React.FC<Props> = ({ type, control }) => {
  const Component = ControlType[type];

  return <Component control={control} />;
};
