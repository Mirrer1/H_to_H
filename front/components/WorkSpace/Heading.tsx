import React from 'react';
import useSWR from 'swr';
import gravatar from 'gravatar';

import fetcher from '@utils/fetcher';
import { Header } from '@styles/LayoutsStyle/workspace';
import { IUser } from '@typings/db';

interface Props {
  onClickProfile: () => void;
}

const Heading = ({ onClickProfile }: Props) => {
  const { data: userData } = useSWR<IUser>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  return (
    <Header>
      <header>H to H</header>
      <button onClick={onClickProfile}>
        {userData && <img src={gravatar.url(userData.email, { d: 'mm' })} alt={userData.nickname} />}
      </button>
    </Header>
  );
};

export default Heading;
