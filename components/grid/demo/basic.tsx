import React from 'react';
import { Grid } from 'ireact-material';

const { useBreakpoint } = Grid;

const App: React.FC = () => {
  const screens = useBreakpoint();

  return (
    <>
      Current break point:{' '}
      {Object.entries(screens)
        .filter((screen) => !!screen[1])
        .map((screen) => (
          <div color="blue" key={screen[0]}>
            {screen[0]}
          </div>
        ))}
    </>
  );
};

export default App;
