import React, { useState, Fragment } from 'react';
import { Row, Col, Layout, Button, message, Input } from 'antd';

import { FIXatdl } from './FIXatdl';
import { Convert } from './FIXatdl/utility/model.utils';

import { sampleFIXatdl } from './FIXatdl/resource/atdl-simple-example';

const App = () => {
  const [json, setJson] = useState('');
  const [xml, setXml] = useState('');

  const setXml2Json = (xml: string) => {
    let result = '';
    try {
      result = Convert.toJson(xml);
    } catch {
      message.error('Error parsing FIXatdl XML');
    }
    setJson(result);
  };

  const onChange = (event: any) => {
    setXml(event.target.value);
  };

  const buildWidget = () => {
    setXml2Json('');
    setXml2Json(xml || sampleFIXatdl);
  };

  return (
    <Layout>
      <Layout.Header>
        <h3 style={{ color: '#FFF' }}>FIXatdl 2 React Widget</h3>
      </Layout.Header>
      <Layout.Content
        style={{ height: 'calc(100vh - 64px)', padding: '24px 50px', overflow: 'auto' }}>
        <Row gutter={24}>
          <Col span={12}>
            <FIXatdlTexarea onChange={onChange} />
          </Col>
          <Col span={12}>
            <FIXatdl2Json data={json} />
            <Button
              onClick={buildWidget}
              type="primary"
              size="large"
              block
              style={{ marginBottom: 16 }}>
              Build Widget
            </Button>
            <FIXatdl atdlJson={json} />
            <ValidateOutput onSubmit={() => {}} />
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export const ValidateOutput = ({ onSubmit }: any) => {
  const [state, setState] = useState('');
  const buildFixMsg = (msg = {}) => {
    return '8=FIX.4.2|9=51|35=0|34=703|49=ABC|52=20100130-10:53:40.830|56=XYZ|10=249|';
  };
  const handleClick = () => {
    const sampleJsonMsg = {};
    const fixMsg = buildFixMsg(sampleJsonMsg);
    setState(fixMsg);
    onSubmit();
  };
  return (
    <Row style={{ marginTop: 24 }} gutter={12}>
      <Col span={8}>
        <Button onClick={handleClick} block>
          Validate Output
        </Button>
      </Col>
      <Col span={16}>
        <Input value={state} readOnly placeholder="FIX Message" />
      </Col>
    </Row>
  );
};

export const FIXatdl2Json = ({ data = '' }) => (
  <Fragment>
    <strong>FIXatdl JSON</strong> <br />
    <pre
      style={{
        height: 150,
        fontSize: 10,
        background: '#333',
        color: '#FFF',
        padding: 8,
      }}>
      {data}
    </pre>
  </Fragment>
);

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

export default App;
