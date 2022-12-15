import React, { useCallback } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import useSWR from 'swr';
import axios from 'axios';

import useInput from '@hooks/useInput';
import fetcher from '@utils/fetcher';
import { IUser } from '@typings/db';
import {
  CreateForm,
  CreateFormBtn,
  CreateFormItem,
  CreateWrapper,
  CreateXBtn,
} from '@styles/ComponentsStyle/Modal/createWorkspace';

interface Props {
  setInviteChannelVisible: () => void;
  onClickProfile: () => void;
}

const InviteChannel = ({ setInviteChannelVisible, onClickProfile }: Props) => {
  const [newMember, onChangeNewMember, setNewMember] = useInput('');
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();

  const { data: userData } = useSWR<IUser>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const { revalidate: revalidateMembers } = useSWR<IUser[]>(
    userData && channel ? `/api/workspaces/${workspace}/channels/${channel}/members` : null,
    fetcher,
  );

  const onInviteMember = useCallback(
    e => {
      e.preventDefault();

      if (!newMember || !newMember.trim()) {
        return;
      }

      axios
        .post(
          `/api/workspaces/${workspace}/channels/${channel}/members`,
          {
            email: newMember,
          },
          {
            withCredentials: true,
          },
        )
        .then(() => {
          setNewMember('');
          revalidateMembers();
          setInviteChannelVisible();
          onClickProfile();
        })
        .catch(error => {
          console.dir(error);
          toast.error(error.response?.data, { position: 'top-center' });
        });
    },
    [newMember],
  );
  return (
    <CreateWrapper>
      <CreateXBtn onClick={setInviteChannelVisible}>
        <FontAwesomeIcon icon={faXmark} />
      </CreateXBtn>

      <CreateForm>
        <form onSubmit={onInviteMember}>
          <CreateFormItem id="member-label">
            <div>채널 멤버 초대</div>
            <input id="member" value={newMember} onChange={onChangeNewMember} />
          </CreateFormItem>

          <CreateFormBtn type="submit" mainBtn>
            초대
          </CreateFormBtn>
        </form>
      </CreateForm>
    </CreateWrapper>
  );
};

export default InviteChannel;
