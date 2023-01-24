import React, { useEffect, useRef, useState } from 'react';

import { Affix } from 'ireact-material';
import type { CSSProperties } from 'react';

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

const scrollable: CSSProperties = {
  height: '100px',
  overflowY: 'scroll',
};

const background: CSSProperties = {
  paddingTop: '60px',
  height: '300px',
  background: '#27E2B2',
};

const App = () => {
  const affixRef = useRef<any>(null);

  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    window.addEventListener(
      'scroll',
      () => {
        affixRef.current && affixRef.current.updatePosition();
      },
      true,
    );
  }, [affixRef]);

  return (
    <div style={scrollable} ref={setContainer}>
      <div style={background}>
        <Affix target={() => container} ref={affixRef}>
          <div style={style}>固定在最顶部</div>
        </Affix>
      </div>
    </div>
  );
};

export default App;
