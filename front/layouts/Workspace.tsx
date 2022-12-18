import React, { useCallback, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { Scrollbars } from 'react-custom-scrollbars';
import useSWR from 'swr';

import fetcher from '@utils/fetcher';
import Profile from '@components/Modal/Profile';
import CreateWorkspace from '@components/Modal/CreateWorkspace';
import ChannelList from '@components/WorkSpace/ChannelList';
import DMList from '@components/WorkSpace/DMList';
import useSocket from '@hooks/useSocket';
import Heading from '@components/WorkSpace/Heading';
import WorkspaceList from '@components/WorkSpace/WorkspaceList';
import DesktopWorkspace from '@components/WorkSpace/DesktopWorkspace';
import { IUser, IChannel } from '@typings/db';
import {
  Container,
  Sidebar,
  HeaderWapper,
  Footer,
  SwitchWrapper,
  ScrollbarWrapper,
} from '@styles/LayoutsStyle/workspace';
import Switcher from '@components/WorkSpace/Switcher';

const Workspace = () => {
  const { workspace } = useParams<{ workspace: string }>();
  const [pageVisible, setPageVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [createWorkspaceVisible, setCreateWorkspaceVisible] = useState(false);
  const [socket, disconnect] = useSocket(workspace);

  const {
    data: userData,
    error,
    revalidate,
    mutate,
  } = useSWR<IUser | false>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const { data: channelData } = useSWR<IChannel[]>(userData ? `/api/workspaces/${workspace}/channels` : null, fetcher);

  useEffect(() => {
    if (channelData && userData && socket) {
      socket.emit('login', { id: userData.id, channels: channelData.map(v => v.id) });
    }
  }, [socket, channelData, userData]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [workspace, disconnect]);

  const onClickProfile = useCallback(() => {
    setProfileVisible(prev => !prev);
  }, []);

  const onClickCreateWorkspace = useCallback(() => {
    setCreateWorkspaceVisible(prev => !prev);
  }, []);

  const onClickPage = useCallback(() => {
    setPageVisible(true);
  }, []);

  const onClickReturnPage = useCallback(() => {
    setPageVisible(false);
  }, []);

  if (!userData) {
    return <Redirect to="/login" />;
  }

  return (
    <Container>
      <Sidebar pageVisible={pageVisible}>
        <HeaderWapper>
          <Heading onClickProfile={onClickProfile} />
          {profileVisible && <Profile onClickProfile={onClickProfile} />}

          <WorkspaceList onClickCreateWorkspace={onClickCreateWorkspace} />
          {createWorkspaceVisible && (
            <CreateWorkspace setCreateWorkspaceVisible={onClickCreateWorkspace} revalidate={revalidate} />
          )}
        </HeaderWapper>

        <ScrollbarWrapper>
          <Scrollbars autoHide>
            <ChannelList setPageVisible={onClickPage} />
            <DMList setPageVisible={onClickPage} />
          </Scrollbars>
        </ScrollbarWrapper>

        <Footer>
          <div>{workspace}</div>
        </Footer>
      </Sidebar>

      <DesktopWorkspace onClickCreateWorkspace={onClickCreateWorkspace} />
      {createWorkspaceVisible && (
        <CreateWorkspace setCreateWorkspaceVisible={onClickCreateWorkspace} revalidate={revalidate} />
      )}

      <SwitchWrapper pageVisible={pageVisible}>
        <Switcher onClickReturnPage={onClickReturnPage} />
      </SwitchWrapper>
    </Container>
  );
};

export default Workspace;
