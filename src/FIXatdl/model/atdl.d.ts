export interface Atdl {
  Strategies?: Strategies;
}

export interface Strategies {
  _attributes?: StrategiesAttributes;
  Strategy?: Strategy[] | Strategy;
}

export interface Strategy {
  _attributes: StrategyAttributes;
  Regions?: Regions;
  Parameter?: ParameterElement[] | ParameterElement;
  StrategyLayout?: StrategyLayout;
  StrategyEdit?: StrategyEdit;
}

export interface ParameterElement {
  _attributes?: ParameterAttributes;
  EnumPair?: EnumPair[];
}

export interface EnumPair {
  _attributes?: EnumPairAttributes;
}

export interface EnumPairAttributes {
  wireValue?: string;
  enumID?: string;
}

export interface ParameterAttributes {
  type: string;
  name?: string;
  fixTag?: string;
  use?: Use;
  mutableOnCxlRpl?: string;
  revertOnCxlRpl?: string;
  wireValue?: string;
  precision: string;
  minValue: string;
  maxValue: string;
}

export interface Regions {
  Region?: Region[];
}

export interface Region {
  _attributes?: RegionAttributes;
}

export interface RegionAttributes {
  name?: RegionName;
  inclusion?: Inclusion;
}

export interface StrategyEdit {
  _attributes?: StrategyEditAttributes;
  Edit?: StrategyEditOperator;
}

export interface StrategyEditOperator {
  _attributes?: StrategyEditOperatorAttributes;
  Edit?: EditElement[] | EditElement;
}

export interface EditElement {
  _attributes?: EditAttributes;
}

export interface EditAttributes {
  field?: string;
  operator?: LogicOperator;
  field2?: string;
}

export interface StrategyEditOperatorAttributes {
  logicOperator?: LogicOperator;
}

export interface StrategyEditAttributes {
  errorMessage?: string;
}

export interface StrategyLayout {
  StrategyPanel?: StrategyLayoutStrategyPanel;
}

export interface StrategyLayoutStrategyPanel {
  _attributes?: StrategyPanelAttributes;
  StrategyPanel?: StrategyPanelStrategyPanel[] | StrategyPanelStrategyPanel;
}

export interface StrategyPanelStrategyPanel {
  _attributes?: StrategyPanelAttributes;
  Control?: Control[] | Control;
}

export interface Control {
  _attributes?: ControlAttributes;
  ListItem?: ListItem[] | ListItem;
}

export interface ListItem {
  _attributes?: ListItemAttributes;
}

export interface ListItemAttributes {
  enumID?: string;
  uiRep?: string;
}

export type ControlAttrType =
  | 'CheckBoxList_t'
  | 'CheckBox_t'
  | 'Clock_t'
  | 'DropDownList_t'
  | 'EditableDropDownList_t'
  | 'DoubleSpinner_t'
  | 'HiddenField_t'
  | 'Label_t'
  | 'MultiSelectList_t'
  | 'RadioButtonList_t'
  | 'RadioButton_t'
  | 'SingleSelectList_t'
  | 'SingleSpinner_t'
  | 'Slider_t'
  | 'TextField_t';

export interface ControlAttributes {
  type: ControlAttrType;
  ID?: string;
  parameterRef: string;
  tooltip?: string;
  label?: string;
  initValue?: string;
  orientation?: Orientation;
  innerIncrement?: string;
  outerIncrement?: string;
  increment?: string;
  initPolicy?: InitPolicy;
  initFixField?: string;
}

export interface StrategyPanelAttributes {
  orientation?: Orientation;
  border?: Border;
  collapsed?: string;
  collapsible?: string;
  title?: string;
}

export interface StrategyAttributes {
  name: string;
  uiRep?: string;
  wireValue: string;
  providerID?: string;
  version?: string;
  fixMsgType?: string;
}

export interface StrategiesAttributes {
  'xmlns:lay'?: string;
  'xmlns:val'?: string;
  'xmlns:flow'?: string;
  'xmlns:xsi'?: string;
  strategyIdentifierTag?: string;
  versionIdentifierTag?: string;
  changeStrategyOnCxlRpl?: string;
  xmlns?: string;
  schemaLocation?: string;
}

//
// Enumerations
//
export enum Use {
  Optional = 'optional',
  Required = 'required',
}

export enum Operator {
  Exist = 'EX',
  NotExist = 'NX',
  Equal = 'EQ',
  LessThan = 'LT',
  GreaterThan = 'GT',
  NotEqual = 'NE',
  LessThanOrEqual = 'LE',
  GreaterThanOrEqual = 'GE',
}

export enum Orientation {
  Horizontal = 'HORIZONTAL',
  Vertical = 'VERTICAL',
}

export enum Border {
  None,
  Line,
}

export enum Inclusion {
  Include,
  Exclude,
}

export enum IncrementPolicy {
  Static,
  LotSize,
  Tick,
}

export enum InitPolicy {
  UseValue,
  UseFixField,
}

export enum LogicOperator {
  And = 'AND',
  Or = 'OR',
  Xor = 'XOR',
  Not = 'NOT',
}

export enum RegionName {
  None,
  TheAmericas,
  EuropeMiddleEastAfrica,
  AsiaPacificJapan,
  All = RegionName.AsiaPacificJapan |
    RegionName.EuropeMiddleEastAfrica |
    RegionName.TheAmericas,
}
