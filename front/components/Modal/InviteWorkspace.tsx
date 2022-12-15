import React, { useCallback } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import useInput from '@hooks/useInput';
import fetcher from '@utils/fetcher';
import { IChannel, IUser } from '@typings/db';
import {
  CreateForm,
  CreateFormBtn,
  CreateFormItem,
  CreateWrapper,
  CreateXBtn,
} from '@styles/ComponentsStyle/Modal/createWorkspace';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Props {
  setInviteWorkspaceVisible: () => void;
  onClickProfile: () => void;
}

const InviteWorkspace = ({ setInviteWorkspaceVisible, onClickProfile }: Props) => {
  const [newMember, onChangeNewMember, setNewMember] = useInput('');
  const { workspace } = useParams<{ workspace: string; channel: string }>();

  const { data: userData } = useSWR<IUser | false>('/api/users', fetcher);
  const { revalidate: revalidateMembers } = useSWR<IChannel[]>(
    userData ? `/api/workspaces/${workspace}/members` : null,
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
          `/api/workspaces/${workspace}/members`,
          {
            email: newMember,
          },
          { withCredentials: true },
        )
        .then(() => {
          setNewMember('');
          revalidateMembers();
          setInviteWorkspaceVisible();
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
      <CreateXBtn onClick={setInviteWorkspaceVisible}>
        <FontAwesomeIcon icon={faXmark} />
      </CreateXBtn>

      <CreateForm>
        <form onSubmit={onInviteMember}>
          <CreateFormItem id="member-label">
            <div>EMAIL</div>
            <input id="member" type="email" value={newMember} onChange={onChangeNewMember} />
          </CreateFormItem>

          <CreateFormBtn type="submit" mainBtn>
            초대
          </CreateFormBtn>
        </form>
      </CreateForm>
    </CreateWrapper>
  );
};

export default InviteWorkspace;
