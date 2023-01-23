import React from 'react';
// import { Tabs } from 'antd';

// const { TabPane } = Tabs;

const LANGS = {
  tsx: 'TypeScript',
  jsx: 'JavaScript',
};

interface CodePreviewProps {
  codes?: Record<PropertyKey, string>;
  toReactComponent?: (node: any) => React.ReactNode;
  onCodeTypeChange?: (activeKey: string) => void;
}

const CodePreview: React.FC<CodePreviewProps> = ({ toReactComponent, codes, onCodeTypeChange }) => {
  const langList = Object.keys(codes).sort().reverse();

  let content: React.ReactNode;

  if (langList.length === 1) {
    content = toReactComponent(['pre', { lang: langList[0], highlighted: codes[langList[0]] }]);
  } else {
    // content = (
    //   <Tabs centered onChange={onCodeTypeChange}>
    //     {langList.map((lang) => (
    //       <TabPane tab={LANGS[lang]} key={lang}>
    //         {toReactComponent(['pre', { lang, highlighted: codes[lang] }])}
    //       </TabPane>
    //     ))}
    //   </Tabs>
    // );
  }

  return <div className="highlight">{content}</div>;
};

export default CodePreview;
