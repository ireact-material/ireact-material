import type { CSSProperties } from 'react';
import React from 'react';

import { Affix } from 'ireact-material';

const style: CSSProperties = {
  width: '250px',
  height: '30px',
  textAlign: 'center',
  lineHeight: '30px',
  fontSize: '12px',
  borderRadius: '5px',
  background: '#5b8eff',
  color: '#fff',
};

const App: React.FC = () => (
  <Affix offsetTop={100} offsetBottom={20}>
    <div style={style}>固定距离底部20和距离顶部100</div>
  </Affix>
);

export default App;
