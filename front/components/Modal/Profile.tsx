import React, { useCallback, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import gravatar from 'gravatar';

import fetcher from '@utils/fetcher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { ProfileWrapper, ProfileContent, ProfileBtn } from '@styles/ComponentsStyle/Modal/profile';

interface Props {
  onClickProfile: () => void;
}

const Profile = ({ onClickProfile }: Props) => {
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

  return (
    <ProfileWrapper>
      <FontAwesomeIcon icon={faXmark} onClick={onClickProfile} />

      <ProfileContent>
        <img src={gravatar.url(data.email, { d: 'mm' })} alt={data.nickname} />
        <div>
          <h2>{data.nickname}</h2>
          <p>Active</p>
        </div>
      </ProfileContent>

      <ProfileBtn>
        <button onClick={onLogout}>로그아웃</button>
      </ProfileBtn>
    </ProfileWrapper>
  );
};

export default Profile;
