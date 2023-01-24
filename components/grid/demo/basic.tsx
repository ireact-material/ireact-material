import { Col, Row } from 'ireact-material';
import React, { CSSProperties } from 'react';

const App: React.FC = () => {
  const styles1: CSSProperties = {
    height: '50px',
    lineHeight: '50px',
    background: '#5b8eff',
    color: '#fff',
    textAlign: 'center',
    margin: '8px 0',
  };

  const styles2: CSSProperties = {
    height: '50px',
    lineHeight: '50px',
    background: '#27e2b2',
    color: '#fff',
    textAlign: 'center',
    margin: '8px 0',
  };

  return (
    <>
      <Row>
        <Col span={24} style={styles1}>
          col
        </Col>
      </Row>
      <Row>
        <Col span={12} style={styles1}>
          col-12
        </Col>
        <Col span={12} style={styles2}>
          col-12
        </Col>
      </Row>
      <Row>
        <Col span={8} style={styles1}>
          col-8
        </Col>
        <Col span={8} style={styles2}>
          col-8
        </Col>
        <Col span={8} style={styles1}>
          col-8
        </Col>
      </Row>
      <Row>
        <Col span={6} style={styles1}>
          col-6
        </Col>
        <Col span={6} style={styles2}>
          col-6
        </Col>
        <Col span={6} style={styles1}>
          col-6
        </Col>
        <Col span={6} style={styles2}>
          col-6
        </Col>
      </Row>
    </>
  );
};

export default App;
