import React, { useCallback } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import useSWR from 'swr';

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

interface Props {
  setCreateChannelVisible: () => void;
  onClickProfile: () => void;
}

const CreateChannel = ({ setCreateChannelVisible, onClickProfile }: Props) => {
  const [newChannel, onChangeChannel, setNewChannel] = useInput('');
  const { workspace } = useParams<{ workspace: string; channel: string }>();

  const { data: userData } = useSWR<IUser | false>('/api/users', fetcher);

  const { data: channelData, revalidate: revalidateChannel } = useSWR<IChannel[]>(
    userData ? `/api/workspaces/${workspace}/channels` : null,
    fetcher,
  );

  const onCreateChannel = useCallback(
    e => {
      e.preventDefault();
      axios
        .post(
          `/api/workspaces/${workspace}/channels`,
          {
            name: newChannel,
          },
          {
            withCredentials: true,
          },
        )
        .then(() => {
          setNewChannel('');
          revalidateChannel();
          setCreateChannelVisible();
          onClickProfile();
        })
        .catch(error => {
          console.dir(error);
          toast.error(error.response?.data, { position: 'top-center' });
        });
    },
    [newChannel],
  );

  return (
    <>
      <CreateWrapper>
        <CreateXBtn onClick={setCreateChannelVisible}>
          <FontAwesomeIcon icon={faXmark} />
        </CreateXBtn>

        <CreateForm>
          <form onSubmit={onCreateChannel}>
            <CreateFormItem id="channel-label">
              <div>채널 이름</div>
              <input id="channel" value={newChannel} onChange={onChangeChannel} />
            </CreateFormItem>

            <CreateFormBtn type="submit" mainBtn>
              Create
            </CreateFormBtn>
          </form>
        </CreateForm>
      </CreateWrapper>
    </>
  );
};

export default CreateChannel;
