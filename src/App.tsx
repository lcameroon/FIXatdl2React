import React, { useState } from 'react';
import { Row, Col, Divider, Layout, Button, message } from 'antd';

import { FIXatdlTexarea, FIXatdl2Json, FIXatdlBuilder, sampleFIXatdl } from './FIXatdl';
import { Convert } from './FIXatdl/utility/model.utils';

function App() {
  const [json, setJson] = useState('');

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
    setXml2Json(event.target.value);
  };

  const buildWidget = () => {
    if (json === '') {
      setXml2Json(sampleFIXatdl);
    }
  };

  return (
    <Layout>
      <Layout.Header>
        <h3 style={{ color: '#FFF' }}>FIXatdl 2 React Widget</h3>
      </Layout.Header>
      <Layout.Content style={{ height: 'calc(100vh - 64px)', padding: '24px 50px' }}>
        <Row gutter={24}>
          <Col span={12}>
            <FIXatdlTexarea onChange={onChange} />
          </Col>
          <Col span={12}>
            <FIXatdl2Json data={json} />
            <Button onClick={buildWidget} type="primary" size="large" block>
              Build Widget
            </Button>
            <Divider />
            <FIXatdlBuilder atdlJson={json} />
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
}

export default App;
