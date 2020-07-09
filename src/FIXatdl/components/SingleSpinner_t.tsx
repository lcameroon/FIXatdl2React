import React from 'react';
import { InputNumber } from 'antd';

import { ControlProps } from '../AtdlControl';

export const SingleSpinner_t: React.FC<ControlProps> = (props) => {
  const { params } = props;
  const isPercent = params?.type === 'Percentage_t';
  const isFloat = params?.type === 'Float_t';
  let min = isPercent ? 1 : undefined;
  let max = isPercent ? 100 : undefined;
  let step = 1;

  if (isPercent) {
    if (params?.minValue) {
      min = Number(params?.minValue.replace('.', ''));
    }
    if (params?.maxValue) {
      max = Number(params?.maxValue.replace('.', ''));
    }
  }
  if (isFloat) {
    if (params?.precision === '2') {
      step = 0.01;
    }
  }
  return (
    <InputNumber
      {...props}
      min={min}
      max={max}
      step={step}
      parser={isPercent ? (value: any) => value.replace('%', '') : (value: any) => value}
      formatter={(value) => (isPercent ? `${value}%` : `${value}`)}
    />
  );
};
