import React, { FC, useCallback } from 'react';
import { Redirect, Switch, Route } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import useSWR from 'swr';
import axios from 'axios';
import gravatar from 'gravatar';
import loadable from '@loadable/component';

import fetcher from '@utils/fetcher';

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
    <>
      {/* <button onClick={onLogout}>로그아웃</button> */}
      <div>
        <header>H to H</header>
        <button>
          <img src={gravatar.url(data.email, { s: '28px', d: 'mm' })} alt={data.nickname} />
        </button>
      </div>

      <label id="search-label">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input type="text" placeholder="Search messages or users" />
      </label>

      <div>
        <button>
          <img src={gravatar.url(data.email, { s: '28px', d: 'retro' })} alt="chanel1" />
        </button>
        <button>
          <img src={gravatar.url(data.email, { s: '28px', d: 'retro' })} alt="chanel1" />
        </button>
        <button>
          <img src={gravatar.url(data.email, { s: '28px', d: 'retro' })} alt="chanel1" />
        </button>
        <button>
          <FontAwesomeIcon icon={faSquarePlus} />
        </button>
      </div>

      <div>
        <button>
          <FontAwesomeIcon icon={faAngleDown} />
          Channels
        </button>
        <button># 일반</button>
        <button>
          <FontAwesomeIcon icon={faSquarePlus} />
          Add channels
        </button>
      </div>

      <div>
        <button>
          <FontAwesomeIcon icon={faAngleDown} />
          Direct message
        </button>
        <button>
          <img src={gravatar.url(data.email, { s: '28px', d: 'retro' })} alt="chanel1" />
          Slackbot
        </button>
        <button>
          <img src={gravatar.url(data.email, { s: '28px', d: 'retro' })} alt="chanel1" />
          zerocho
        </button>
        <button>
          <img src={gravatar.url(data.email, { s: '28px', d: 'retro' })} alt="chanel1" />
          zerocho1
        </button>

        <button>
          <FontAwesomeIcon icon={faSquarePlus} />
          Add teammates
        </button>
      </div>

      <header>NodeJS KR Developer Group</header>
      <FontAwesomeIcon icon={faAngleDown} />
      <FontAwesomeIcon icon={faPenToSquare} />

      <Switch>
        <Route path="/workspace/channel" component={Channel} />
        <Route path="/workspace/message" component={Message} />
      </Switch>
    </>
  );
};

export default Workspace;
