import React from 'react';
import LeftMenu from '_render/containers/LeftMenu';
import SwitchLanguage from '_render/components/SwitchLanguage';
import SwitchThemes from '_render/components/SwitchThemes';

import './index.less';

const WebLayout = ({ children }) => {
  return (
    <div className="web-container">
      <div className="left">
        <LeftMenu />
        <div className="left-tools">
          <SwitchLanguage />
          <SwitchThemes />
        </div>
      </div>
      <div className="right">{children}</div>
    </div>
  );
};

export default WebLayout;
