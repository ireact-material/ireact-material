import React from 'react';
import type { CSSProperties } from 'react';

import { Affix } from 'ireact-material';

const style: CSSProperties = {
  width: '100px',
  height: '30px',
  textAlign: 'center',
  lineHeight: '30px',
  fontSize: '12px',
  borderRadius: '5px',
  background: '#5b8eff',
  color: '#fff',
};

const App: React.FC = () => (
  <Affix>
    <div style={style}>固定在最顶部</div>
  </Affix>
);

export default App;
