import React from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';

import { ControlProps } from '../AtdlControl';

export const Clock_t: React.FC<ControlProps> = (props) => (
  <DatePicker
    {...props}
    value={props.value ? moment(props.value) : moment()}
    format="DD/MM/YYYY HH:mm:ss"
    showTime
  />
);
