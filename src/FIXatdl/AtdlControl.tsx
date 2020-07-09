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

import { ControlAttributes, ParameterElement } from './model/atdl';

interface AntdListField {
  key: number;
  name: number;
  isListField?: boolean;
  fieldKey?: number;
}
export interface ControlProps {
  id?: string;
  value?: any;
  ref?: any;
  onChange?: (value: any) => {};
  control: ControlAttributes;
  field?: AntdListField;
  params?: ParameterElement['_attributes'];
}

interface ControlType {
  [key: string]: React.ComponentType<ControlProps>;
}

const controlType: ControlType = {
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

export const AtdlControl: React.FC<ControlProps> = React.forwardRef((props, ref) => {
  const Component = controlType[props.control.type];

  return (
    <Component
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      field={props.field}
      control={props.control}
      params={props.params}
    />
  );
});
