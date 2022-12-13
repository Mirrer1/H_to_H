import React, { FC, useCallback, useState } from 'react';
import { Redirect, Switch, Route } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import useSWR from 'swr';
import axios from 'axios';
import gravatar from 'gravatar';
import loadable from '@loadable/component';

import fetcher from '@utils/fetcher';
import {
  Container,
  // DesktopWorkspace,
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
  SwitchWrapper,
} from '@styles/LayoutsStyle/workspace';

const Channel = loadable(() => import('@pages/channel'));
const Message = loadable(() => import('@pages/message'));

const Workspace: FC = ({ children }) => {
  const { data, error, revalidate, mutate } = useSWR('http://localhost:3095/api/users', fetcher);
  const [channelToggle, setChannelToggle] = useState(false);
  const [dmToggle, setDMToggle] = useState(false);

  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        mutate(false, false);
      });
  }, []);

  const onClickChannel = useCallback(() => {
    setChannelToggle(prev => !prev);
  }, []);

  const onClickDM = useCallback(() => {
    setDMToggle(prev => !prev);
  }, []);

  if (!data) {
    return <Redirect to="/login" />;
  }

  return (
    <Container>
      {/* <button onClick={onLogout}>로그아웃</button> */}

      <Header>
        <header>H to H</header>
        <button>
          <img src={gravatar.url(data.email, { d: 'mm' })} alt={data.nickname} />
        </button>
      </Header>

      <SearchWrapper>
        <Search id="search-label">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input type="text" placeholder="Search messages or users" />
        </Search>
      </SearchWrapper>

      <WorkSpaceWrapper>
        <WorkSpace>
          <WorkSpaceItem>
            <img src={gravatar.url(data.email, { d: 'mm' })} alt="mm" />
            <p>Name1</p>
          </WorkSpaceItem>
        </WorkSpace>

        <WorkSpace>
          <WorkSpaceItem>
            <img src={gravatar.url(data.email, { d: 'mm' })} alt="mm" />
            <p>Name2</p>
          </WorkSpaceItem>
        </WorkSpace>

        <WorkSpace>
          <WorkSpaceItem>
            <img src={gravatar.url(data.email, { d: 'mm' })} alt="mm" />
            <p>Name3</p>
          </WorkSpaceItem>
        </WorkSpace>

        <WorkSpace>
          <FontAwesomeIcon icon={faSquarePlus} />
        </WorkSpace>
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
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
          <p>Channels</p>
        </ChannelItem>

        <ChannelItem channelToggle={channelToggle}>
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
          <div>
            <FontAwesomeIcon icon={faAngleDown} />
          </div>
          <p>Direct message</p>
        </DMItem>

        <DMItem dmToggle={dmToggle}>
          <div>
            <img src={gravatar.url(data.email, { d: 'mm' })} alt="chanel1" />
          </div>
          <p>Slackbot</p>
        </DMItem>
        <DMItem dmToggle={dmToggle}>
          <div>
            <img src={gravatar.url(data.email, { d: 'mm' })} alt="chanel1" />
          </div>
          <p>zerocho</p>
        </DMItem>
        <DMItem dmToggle={dmToggle}>
          <div>
            <img src={gravatar.url(data.email, { d: 'mm' })} alt="chanel1" />
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
        <button>
          <div>
            <FontAwesomeIcon icon={faAngleUp} />
          </div>
          <span>NodeJS KR Developer Group</span>
        </button>
        <FontAwesomeIcon icon={faPenToSquare} />
      </Footer>

      <SwitchWrapper>
        <Switch>
          <Route path="/workspace/channel" component={Channel} />
          <Route path="/workspace/message" component={Message} />
        </Switch>
      </SwitchWrapper>
    </Container>
  );
};

export default Workspace;
