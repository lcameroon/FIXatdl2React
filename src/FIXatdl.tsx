import React, { Fragment } from 'react';
import moment from 'moment';
import { find, isArray } from 'lodash';
import {
  Input,
  Card,
  Form,
  Select,
  DatePicker,
  TimePicker,
  Space,
  InputNumber,
} from 'antd';

export const FIXatdl2Json = ({ data = '' }) => {
  const styles = {
    height: 300,
    background: '#333',
    color: '#fff',
    padding: 8,
  };
  return (
    <Fragment>
      <strong>FIXatdl JSON</strong> <br />
      <pre style={styles}>{data}</pre>
    </Fragment>
  );
};

export const sampleFIXatdl = `<Strategies>
  <Strategy name="Tazer" uiRep="Tazer" wireValue="3000" fixMsgType="D">
  <Parameter name="EffectiveTime" xsi:type="UTCTimestamp_t" fixTag="168"/>
  <Parameter name="VolTarget" xsi:type="Percentage_t" fixTag="7641" minValue="0.01" maxValue="0.75"/>
  <lay:StrategyLayout>
      <lay:StrategyPanel>
          <lay:Control xsi:type="lay:Clock_t" ID="StartTimeClock" label="Start Time" parameterRef="EffectiveTime"/>
          <lay:Control xsi:type="lay:SingleSpinner_t" ID="VolSpinner" label="Target (1-75%)" parameterRef="VolTarget"/>
      </lay:StrategyPanel>
  </lay:StrategyLayout>
  </Strategy>
</Strategies>`;

export const FIXatdlTexarea: React.FC<any> = ({ value, onChange }) => {
  const { TextArea } = Input;
  return (
    <Fragment>
      <strong>FIXatdl XML</strong> <br />
      <TextArea
        defaultValue={sampleFIXatdl}
        style={{ height: '80vh', marginBottom: 16 }}
        onChange={onChange}
      />
    </Fragment>
  );
};

export const FIXatdlBuilder = ({ atdlJson = '' }) => {
  let atdl: any = {};

  try {
    atdl = atdlJson && JSON.parse(atdlJson);
  } catch {
    atdl = { error: 'Error!!!' };
  }
  return (
    <Fragment>
      {atdl.error ? <p>{atdl.error}</p> : atdl.Strategies && <Widget atdl={atdl} />}
    </Fragment>
  );
};

const Widget = ({ atdl }: any) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const { Strategies } = atdl;
  const { Strategy } = Strategies;
  const { Parameter } = Strategy;
  return (
    <Card
      style={{
        boxShadow: `0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)`,
      }}
      bordered
      title="Order Widget">
      <Form {...layout} form={form} name="control-hooks">
        {buildStrategy(Strategy, Parameter)}
      </Form>
    </Card>
  );
};

const buildStrategy = (Strategy: any | any[], Parameter: any) => {
  const { Option } = Select;
  const rederStrategyForm = ({ _attributes, StrategyLayout: { StrategyPanel } }: any) => (
    <>
      <Form.Item name="Strategy" label="Strategy" rules={[{ required: true }]}>
        <Select
          defaultValue={_attributes.wireValue}
          placeholder="Select a strategy"
          allowClear>
          <Option value={_attributes.wireValue}>
            {_attributes.name}
            <small style={{ paddingLeft: 16 }}>
              (value: {_attributes.wireValue} | fixType: {_attributes.fixMsgType})
            </small>
          </Option>
        </Select>
      </Form.Item>
      {buildControlPanel(StrategyPanel, Parameter)}
    </>
  );
  return isArray(Strategy)
    ? Strategy.map((strategy) => rederStrategyForm(strategy))
    : rederStrategyForm(Strategy);
};

const buildControlPanel = (StrategyPanel: any, Parameter: any) => {
  const controls: any[] = StrategyPanel.Control || [];

  const getParams = (parameterRef: string) => {
    const result = find(Parameter, ['_attributes.name', parameterRef]);
    return result?._attributes;
  };

  return controls.map(({ _attributes: attr }) => (
    <Form.Item key={attr.parameterRef} label={attr.label} rules={[{ required: true }]}>
      {attr.ID === 'StartTimeClock' ? (
        <Space>
          <DatePicker defaultValue={moment()} />
          <TimePicker use12Hours format="h:mm:ss A" defaultValue={moment()} />
        </Space>
      ) : null}
      {attr.ID === 'VolSpinner' ? (
        <InputNumber
          defaultValue={100}
          min={getParams(attr.parameterRef)?.minValue.replace('.', '') || 1}
          max={getParams(attr.parameterRef)?.maxValue.replace('.', '') || 100}
          formatter={(value) => `${value}%`}
          parser={(value: any) => value.replace('%', '')}
        />
      ) : null}
    </Form.Item>
  ));
};
