import React, { FC, useCallback } from 'react';
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
  Header,
  SearchWrapper,
  Search,
  WorkSpace,
  WorkSpaceItem,
  Menu,
  Channels,
  ChannelItem,
  DM,
  DMItem,
  Footer,
} from '@styles/LayoutsStyle/workspace';

const Channel = loadable(() => import('@pages/channel'));
const Message = loadable(() => import('@pages/message'));

const Workspace: FC = ({ children }) => {
  const { data, error, revalidate, mutate } = useSWR('http://localhost:3095/api/users', fetcher);

  const onLogout = useCallback(() => {
    axios
      .post('http://localhost:3095/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        mutate(false, false);
      });
  }, []);

  if (!data) {
    return <Redirect to="/login" />;
  }

  return (
    <Container>
      {/* <button onClick={onLogout}>로그아웃</button> */}
      <div>
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

        <WorkSpace>
          <button>
            <WorkSpaceItem>
              <img src={gravatar.url(data.email, { d: 'mm' })} alt="mm" />
              <p>Name1</p>
            </WorkSpaceItem>
          </button>

          <button>
            <WorkSpaceItem>
              <img src={gravatar.url(data.email, { d: 'mm' })} alt="mm" />
              <p>Name2</p>
            </WorkSpaceItem>
          </button>

          <button>
            <WorkSpaceItem>
              <img src={gravatar.url(data.email, { d: 'mm' })} alt="mm" />
              <p>Name3</p>
            </WorkSpaceItem>
          </button>

          <button>
            <FontAwesomeIcon icon={faSquarePlus} />
          </button>
        </WorkSpace>

        <Menu>
          <button>
            <div>@</div>
            <p>Threads</p>
          </button>
          <button>
            <div>@</div>
            <p>Mentions & reactions</p>
          </button>
          <button>
            <div>@</div>
            <p>Saved Items</p>
          </button>
          <button>
            <div>:</div>
            <p>More</p>
          </button>
        </Menu>

        <Channels>
          <button>
            <div>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            <p>Channels</p>
          </button>

          <ChannelItem>
            <button>
              <div>#</div>
              <p>일반</p>
            </button>

            <button>
              <div>
                <FontAwesomeIcon icon={faSquarePlus} />
              </div>
              <p>Add channels</p>
            </button>
          </ChannelItem>
        </Channels>

        <DM>
          <button>
            <div>
              <FontAwesomeIcon icon={faAngleDown} />
            </div>
            <p>Direct message</p>
          </button>

          <DMItem>
            <button>
              <div>
                <img src={gravatar.url(data.email, { d: 'mm' })} alt="chanel1" />
              </div>
              <p>Slackbot</p>
            </button>
            <button>
              <div>
                <img src={gravatar.url(data.email, { d: 'mm' })} alt="chanel1" />
              </div>
              <p>zerocho</p>
            </button>
            <button>
              <div>
                <img src={gravatar.url(data.email, { d: 'mm' })} alt="chanel1" />
              </div>
              <p>zerocho1</p>
            </button>
            <button>
              <div>
                <FontAwesomeIcon icon={faSquarePlus} />
              </div>
              <p>Add teammates</p>
            </button>
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
      </div>

      <div>
        <Switch>
          <Route path="/workspace/channel" component={Channel} />
          <Route path="/workspace/message" component={Message} />
        </Switch>
      </div>
    </Container>
  );
};

export default Workspace;
