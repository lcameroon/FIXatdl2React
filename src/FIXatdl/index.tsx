import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { find, isArray, flattenDeep } from 'lodash';
import { Input, Card, Form, Select, Button, Divider } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

import { AtdlControl } from './AtdlControl';

export const FIXatdl = ({ atdlJson = '' }) => {
  let atdl: any = {};

  try {
    atdl = atdlJson && JSON.parse(atdlJson);
  } catch {
    atdl = { error: 'Error!!!' };
  }
  return atdl.error ? <p>{atdl.error}</p> : atdl && <Widget atdl={atdl} />;
};

const Widget = ({ atdl }: any) => {
  const [form] = Form.useForm();
  const [state, setState] = useState(0);
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const { Option } = Select;

  const { Strategies } = atdl;
  let { Strategy } = Strategies;
  Strategy = isArray(Strategy) ? Strategy : [Strategy];
  const initialValues = buildInitialValues(Strategy);

  const onFinish = (val?: any) => {
    const values = val || form.getFieldsValue();
    const newValues = parseFormValues(values);
    console.log('Received values of form:', newValues);
  };

  const onChange = useCallback(
    (value: any) => {
      setState(value);
      form.setFieldsValue({
        fixMsgType: initialValues[value].fixMsgType,
        providerID: initialValues[value].providerID,
        uiRep: initialValues[value].uiRep,
        version: initialValues[value].version,
        wireValue: initialValues[value].wireValue,
        panels: initialValues[value].panels,
      });
      console.log('initialValues', initialValues);
    },
    [form, initialValues]
  );

  useEffect(() => {
    onChange(state);
  }, [atdl, onChange, state]);

  return (
    <Card
      style={{ borderColor: '#d9d9d9' }}
      bordered
      hoverable
      type="inner"
      title="Order Widget"
      extra={<MoreOutlined />}>
      <Form.Item label="Strategy">
        <Select
          placeholder="Select a strategy"
          defaultValue={Number(state)}
          onChange={onChange}>
          {Strategy.map(({ _attributes }: any, idx: number) => (
            <Option key={idx} value={idx}>
              {_attributes.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form
        {...layout}
        initialValues={initialValues[state]}
        form={form}
        name="control-hooks"
        onFinish={onFinish}>
        <Form.Item name="fixMsgType" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="providerID" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="uiRep" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="version" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="wireValue" hidden>
          <Input />
        </Form.Item>
        <Form.List name="panels">
          {(panelsFieldList) => (
            <Fragment>
              {panelsFieldList.map((field) => (
                <Fragment key={field.key}>
                  <Divider />
                  <Form.List name={[field.name, 'controls']}>
                    {(controlsFieldList) => (
                      <ControlsFieldList
                        fields={controlsFieldList}
                        initialValues={initialValues}
                        currentPanel={field.key}
                        currentStrategy={state}
                      />
                    )}
                  </Form.List>
                </Fragment>
              ))}
            </Fragment>
          )}
        </Form.List>
        <Form.Item
          wrapperCol={{ span: 16, offset: 8 }}
          style={{ marginBottom: 0, paddingBottom: 0 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

const ControlsFieldList = ({
  fields,
  initialValues,
  currentStrategy,
  currentPanel,
}: any) => (
  <Fragment>
    {fields.map((field: any, idx: number) => {
      const { _attributes, _params } = initialValues[currentStrategy].panels[
        currentPanel
      ].controls[idx];
      return (
        <Form.Item
          {...field}
          name={[field.name, _attributes.parameterRef]}
          label={_attributes.label}
          rules={[
            {
              required: true,
              message: `${_attributes.parameterRef} is required`,
            },
          ]}>
          <AtdlControl field={field} control={_attributes} params={_params} />
        </Form.Item>
      );
    })}
  </Fragment>
);

export const buildInitialValues = (Strategy: any) => {
  const initValues: any[] = [];
  Strategy.forEach((strategy: any) => {
    const {
      _attributes,
      Parameter,
      StrategyLayout: { StrategyPanel },
    } = strategy;
    let strategyPanel: any[] = StrategyPanel;
    if (StrategyPanel.StrategyPanel) {
      strategyPanel = [StrategyPanel.StrategyPanel];
    }
    strategyPanel = isArray(strategyPanel) ? strategyPanel : [strategyPanel];

    initValues.push({
      ..._attributes,
      panels: strategyPanel.map(({ Control }) => {
        console.log('Control', Control);
        return {
          controls: Control.map(({ _attributes }: any) => {
            const _params = getParams(_attributes.parameterRef, Parameter);
            const value: any = _params?.type === 'Percentage_t' ? 1 : undefined;
            return {
              [_attributes.parameterRef]: value,
              _attributes,
              _params,
            };
          }),
        };
      }),
    });
  });
  return initValues;
};

export const getParams = (parameterRef: string, Parameter: any) => {
  const params = isArray(Parameter) ? Parameter : [Parameter];
  const result = find(params, ['_attributes.name', parameterRef]);
  return result?._attributes || {};
};

const parseFormValues = (values: any) => {
  const controls = flattenDeep(
    values.panels.map(({ controls }: any) =>
      controls.map((control: any) => control).flat()
    )
  );
  return {
    strategy: {
      fixMsgType: values.fixMsgType,
      providerID: values.providerID,
      uiRep: values.uiRep,
      version: values.version,
      wireValue: values.wireValue,
    },
    controls,
  };
};
