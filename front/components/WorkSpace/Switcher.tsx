import React from 'react';
import { Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';

const Channel = loadable(() => import('@pages/channel'));
const Message = loadable(() => import('@pages/message'));

interface Props {
  onClickReturnPage: () => void;
}

const Switcher = ({ onClickReturnPage }: Props) => {
  return (
    <Switch>
      <Route
        path="/workspace/:workspace/channel/:channel"
        component={() => <Channel onClickReturnPage={onClickReturnPage} />}
      />
      <Route path="/workspace/:workspace/dm/:id" component={() => <Message onClickReturnPage={onClickReturnPage} />} />
    </Switch>
  );
};

export default Switcher;
