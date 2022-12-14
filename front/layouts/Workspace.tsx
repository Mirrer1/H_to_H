import React, { FC, useCallback, useState } from 'react';
import { Redirect } from 'react-router';
import { Switch, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faAngleDown, faAngleRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import useSWR from 'swr';
import gravatar from 'gravatar';
import loadable from '@loadable/component';

import { IUser } from '@typings/db';
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
  Menu,
  MenuItem,
  Channels,
  ChannelItem,
  DM,
  DMItem,
  Footer,
  DesktopWorkspace,
  SwitchWrapper,
} from '@styles/LayoutsStyle/workspace';

const Workspace: FC = ({ children }) => {
  const {
    data: userData,
    error,
    revalidate,
    mutate,
  } = useSWR<IUser | false>('http://localhost:3095/api/users', fetcher);
  const [channelToggle, setChannelToggle] = useState(false);
  const [dmToggle, setDMToggle] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [createWorkspaceVisible, setCreateWorkspaceVisible] = useState(false);

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
          <CreateWorkspace setCreateWorkspaceVisible={onClickCreateWorkspace} />
          {/* {createWorkspaceVisible && <CreateWorkspace setCreateWorkspaceVisible={onClickCreateWorkspace} />} */}
        </WorkSpaceWrapper>

        <Menu>
          <MenuItem>
            <div>@</div>
            <p>Threads</p>
          </MenuItem>
          <MenuItem>
            <div>@</div>
            <p>Mentions & reactions</p>
          </MenuItem>
          <MenuItem>
            <div>@</div>
            <p>Saved Items</p>
          </MenuItem>
          <MenuItem>
            <div>:</div>
            <p>More</p>
          </MenuItem>
        </Menu>

        <Channels>
          <ChannelItem onClick={onClickChannel}>
            <div>
              {channelToggle ? <FontAwesomeIcon icon={faAngleRight} /> : <FontAwesomeIcon icon={faAngleDown} />}
            </div>
            <p>Channels</p>
          </ChannelItem>

          <ChannelItem channelToggle={channelToggle} onClick={onClickPage}>
            <div>#</div>
            <p>일반</p>
          </ChannelItem>

          <ChannelItem channelToggle={channelToggle}>
            <div>
              <FontAwesomeIcon icon={faSquarePlus} />
            </div>
            <p>Add channels</p>
          </ChannelItem>
        </Channels>

        <DM>
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
        </DM>

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

        <WorkSpace>
          <FontAwesomeIcon icon={faSquarePlus} />
        </WorkSpace>
        <CreateWorkspace setCreateWorkspaceVisible={onClickCreateWorkspace} />
        {/* {createWorkspaceVisible && <CreateWorkspace setCreateWorkspaceVisible={onClickCreateWorkspace} />} */}
      </DesktopWorkspace>

      <SwitchWrapper pageVisible={pageVisible}>
        <button onClick={onClickReturnPage}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <Switch>
          <Route path="/workspace/channel" component={Channel} />
          <Route path="/workspace/message" component={Message} />
        </Switch>
      </SwitchWrapper>
    </Container>
  );
};

export default Workspace;
