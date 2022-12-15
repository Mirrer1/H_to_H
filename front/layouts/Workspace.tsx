import React, { useCallback, useState } from 'react';
import { Redirect } from 'react-router';
import { Switch, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import useSWR from 'swr';
import gravatar from 'gravatar';
import loadable from '@loadable/component';

import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import Profile from '@components/Modal/Profile';
import CreateWorkspace from '@components/Modal/CreateWorkspace';
import ChannelList from '@components/WorkSpace/ChannelList';
import DMList from '@components/WorkSpace/DMList';

const Channel = loadable(() => import('@pages/channel'));
const Message = loadable(() => import('@pages/message'));

import {
  Container,
  Sidebar,
  Header,
  SearchWrapper,
  Search,
  WorkSpaceWrapper,
  WorkSpace,
  WorkSpaceItem,
  // DM,
  // DMItem,
  Footer,
  DesktopWorkspace,
  SwitchWrapper,
} from '@styles/LayoutsStyle/workspace';

const Workspace = () => {
  // const [dmToggle, setDMToggle] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [createWorkspaceVisible, setCreateWorkspaceVisible] = useState(false);

  const {
    data: userData,
    error,
    revalidate,
    mutate,
  } = useSWR<IUser | false>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  const onClickProfile = useCallback(() => {
    setProfileVisible(prev => !prev);
  }, []);

  // const onClickDM = useCallback(() => {
  //   setDMToggle(prev => !prev);
  // }, []);

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
        <Header>
          <header>H to H</header>
          <button onClick={onClickProfile}>
            <img src={gravatar.url(userData.email, { d: 'mm' })} alt={userData.nickname} />
          </button>

          {profileVisible && <Profile onClickProfile={onClickProfile} />}
        </Header>
        <SearchWrapper>
          <Search id="search-label">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input type="text" placeholder="Search messages or users" />
          </Search>
        </SearchWrapper>
        <WorkSpaceWrapper>
          {userData.Workspaces?.map(ws => {
            return (
              <Link key={ws.id} to={`/workspace/${123}/channel/일반`}>
                <WorkSpace>
                  <WorkSpaceItem>
                    <h2>{ws.name.slice(0, 1).toUpperCase()}</h2>
                    <p>{ws.name}</p>
                  </WorkSpaceItem>
                </WorkSpace>
              </Link>
            );
          })}

          <WorkSpace onClick={onClickCreateWorkspace}>
            <FontAwesomeIcon icon={faSquarePlus} />
          </WorkSpace>
          {createWorkspaceVisible && (
            <CreateWorkspace setCreateWorkspaceVisible={onClickCreateWorkspace} revalidate={revalidate} />
          )}
        </WorkSpaceWrapper>

        <ChannelList setPageVisible={onClickPage} />
        <DMList setPageVisible={onClickPage} />

        <Footer>
          <div>NodeJS KR Developer Group</div>
          <button>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </Footer>
      </Sidebar>

      <DesktopWorkspace>
        {userData.Workspaces?.map(ws => {
          return (
            <Link key={ws.id} to={`/workspace/${123}/channel/일반`}>
              <WorkSpace>
                <WorkSpaceItem>
                  <h2>{ws.name.slice(0, 1).toUpperCase()}</h2>
                  <p>{ws.name}</p>
                </WorkSpaceItem>
              </WorkSpace>
            </Link>
          );
        })}

        <WorkSpace onClick={onClickCreateWorkspace}>
          <FontAwesomeIcon icon={faSquarePlus} />
        </WorkSpace>
        {createWorkspaceVisible && (
          <CreateWorkspace setCreateWorkspaceVisible={onClickCreateWorkspace} revalidate={revalidate} />
        )}
      </DesktopWorkspace>

      <SwitchWrapper pageVisible={pageVisible}>
        <button onClick={onClickReturnPage}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <Switch>
          <Route path="/workspace/:workspace/channel/:channel" component={Channel} />
          <Route path="/workspace/:workspace/dm/:id" component={Message} />
        </Switch>
      </SwitchWrapper>
    </Container>
  );
};

export default Workspace;
