import React, { useCallback, Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import gravatar from 'gravatar';

import fetcher from '@utils/fetcher';
import CreateChannel from '@components/Modal/CreateChannel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InviteWorkspace from '@components/Modal/InviteWorkspace';
import InviteChannel from '@components/Modal/InviteChannel';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ProfileWrapper, ProfileContent, ProfileBtn } from '@styles/ComponentsStyle/Modal/profile';

interface Props {
  onClickProfile: () => void;
}

const Profile = ({ onClickProfile }: Props) => {
  const { data, error, revalidate, mutate } = useSWR('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const [inviteWorkspaceVisible, setInviteWorkspaceVisible] = useState(false);
  const [inviteChannelVisible, setInviteChannelVisible] = useState(false);
  const [createChannelVisible, setCreateChannelVisible] = useState(false);

  const onLogout = useCallback(() => {
    axios
      .post('/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        mutate(false, false);
      });
  }, []);

  const onClickInviteWorkspace = useCallback(() => {
    setInviteWorkspaceVisible(prev => !prev);
  }, []);

  const onClickInviteChannel = useCallback(() => {
    setInviteChannelVisible(prev => !prev);
  }, []);

  const onClickCreateChannel = useCallback(() => {
    setCreateChannelVisible(prev => !prev);
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
        <button onClick={onClickInviteWorkspace}>워크스페이스에 사용자 초대</button>
        <button onClick={onClickInviteChannel}>채널에 사용자 초대</button>
        <button onClick={onClickCreateChannel}>채널 생성</button>
        <button onClick={onLogout}>로그아웃</button>
      </ProfileBtn>

      {inviteWorkspaceVisible && (
        <InviteWorkspace setInviteWorkspaceVisible={onClickInviteWorkspace} onClickProfile={onClickProfile} />
      )}

      {inviteChannelVisible && (
        <InviteChannel setInviteChannelVisible={onClickInviteChannel} onClickProfile={onClickProfile} />
      )}

      {createChannelVisible && (
        <CreateChannel setCreateChannelVisible={onClickCreateChannel} onClickProfile={onClickProfile} />
      )}
    </ProfileWrapper>
  );
};

export default Profile;
