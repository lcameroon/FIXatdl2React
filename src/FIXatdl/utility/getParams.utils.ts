import { find } from 'lodash';
import { ParameterElement } from '../model/atdl';

export const getParams: any = (parameterRef: string, parameters: ParameterElement[]) => {
  const result = find(parameters, ['_attributes.name', parameterRef]);
  return result?._attributes;
};
