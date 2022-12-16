import React, { useCallback } from 'react';
import { useParams } from 'react-router';
import gravatar from 'gravatar';
import useSWR from 'swr';
import axios from 'axios';

import fetcher from '@utils/fetcher';
import useInput from '@hooks/useInput';
import ChatList from '@components/Dialog/ChatList';
import ChatBox from '@components/Dialog/ChatBox';
import { IDM } from '@typings/db';

const Message = () => {
  const [chat, onChangeChat, setChat] = useInput('');

  const { workspace, id } = useParams<{ workspace: string; id: string }>();
  const { data: userData } = useSWR(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  const { data: myData } = useSWR('/api/users', fetcher);
  const {
    data: chatData,
    mutate: mutateChat,
    revalidate,
  } = useSWR<IDM[]>(`/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=1`, fetcher);

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();

      if (chat?.trim()) {
        axios
          .post(`/api/workspaces/${workspace}/dms/${id}/chats`, {
            content: chat,
          })
          .then(() => {
            revalidate();
            setChat('');
          })
          .catch(console.error);
      }
    },
    [chat],
  );

  if (!userData || !myData) return null;

  return (
    <>
      <div>
        <img src={gravatar.url(userData.email, { d: 'mm' })} alt={userData.nickname} />
        <span>{userData.nickname}</span>

        <ChatList chatData={chatData} />
        <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
      </div>
    </>
  );
};

export default Message;
