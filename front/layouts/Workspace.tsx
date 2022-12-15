import React, { useCallback, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { Switch, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faAngleDown, faAngleRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import useSWR from 'swr';
import gravatar from 'gravatar';
import loadable from '@loadable/component';

import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import Profile from '@components/Modal/Profile';
import CreateWorkspace from '@components/Modal/CreateWorkspace';
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
  Channels,
  ChannelHeader,
  ChannelItem,
  // DM,
  // DMItem,
  Footer,
  DesktopWorkspace,
  SwitchWrapper,
} from '@styles/LayoutsStyle/workspace';

const Workspace = () => {
  const [channelToggle, setChannelToggle] = useState(false);
  const [dmToggle, setDMToggle] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [createWorkspaceVisible, setCreateWorkspaceVisible] = useState(false);
  const { workspace } = useParams<{ workspace: string }>();

  const { data: userData, error, revalidate, mutate } = useSWR<IUser | false>('/api/users', fetcher);
  const { data: channelData } = useSWR<IChannel[]>(userData ? `/api/workspaces/${workspace}/channels` : null, fetcher);

  const onClickProfile = useCallback(() => {
    setProfileVisible(prev => !prev);
  }, []);

  const onClickChannel = useCallback(() => {
    setChannelToggle(prev => !prev);
  }, []);

  const onClickDM = useCallback(() => {
    setDMToggle(prev => !prev);
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

        <Channels>
          <ChannelHeader onClick={onClickChannel}>
            <div>
              {channelToggle ? <FontAwesomeIcon icon={faAngleRight} /> : <FontAwesomeIcon icon={faAngleDown} />}
            </div>
            <p>Channels</p>
          </ChannelHeader>

          <ChannelItem channelToggle={channelToggle}>
            {channelData?.map(v => {
              return (
                <button key={v.id} onClick={onClickPage}>
                  <div>#</div>
                  <p key={v.id}>{v.name}</p>
                </button>
              );
            })}
          </ChannelItem>
        </Channels>

        {/* <DM>
          <DMItem onClick={onClickDM}>
            <div>{dmToggle ? <FontAwesomeIcon icon={faAngleRight} /> : <FontAwesomeIcon icon={faAngleDown} />}</div>
            <p>Direct message</p>
          </DMItem>

          <DMItem dmToggle={dmToggle}>
            <div>
              <img src={gravatar.url(userData.email, { d: 'mm' })} alt="chanel1" />
            </div>
            <p>Slackbot</p>
          </DMItem>
          <DMItem dmToggle={dmToggle}>
            <div>
              <img src={gravatar.url(userData.email, { d: 'mm' })} alt="chanel1" />
            </div>
            <p>zerocho</p>
          </DMItem>
          <DMItem dmToggle={dmToggle}>
            <div>
              <img src={gravatar.url(userData.email, { d: 'mm' })} alt="chanel1" />
            </div>
            <p>zerocho1</p>
          </DMItem>
          <DMItem dmToggle={dmToggle}>
            <div>
              <FontAwesomeIcon icon={faSquarePlus} />
            </div>
            <p>Add teammates</p>
          </DMItem>
        </DM> */}

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
          <Route path="/workspace/:workspace/message/:id" component={Message} />
        </Switch>
      </SwitchWrapper>
    </Container>
  );
};

export default Workspace;
