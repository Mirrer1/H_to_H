import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import gravatar from 'gravatar';
import useSWR, { useSWRInfinite } from 'swr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import fetcher from '@utils/fetcher';
import useInput from '@hooks/useInput';
import ChatList from '@components/Dialog/ChatList';
import ChatBox from '@components/Dialog/ChatBox';
import makeSection from '@utils/makeSection';
import Scrollbars from 'react-custom-scrollbars';
import useSocket from '@hooks/useSocket';
import { IDM } from '@typings/db';
import { MessageHeader } from '@styles/PageStyle/message';
import { DragOver } from '@styles/ComponentsStyle/Dialog/chat';

interface Props {
  onClickReturnPage: () => void;
}

const Message = ({ onClickReturnPage }: Props) => {
  const scrollbarRef = useRef<Scrollbars>(null);
  const [chat, onChangeChat, setChat] = useInput('');
  const [dragOver, setDragOver] = useState(false);

  const { workspace, id } = useParams<{ workspace: string; id: string }>();
  const { data: userData } = useSWR(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  const { data: myData } = useSWR('/api/users', fetcher);
  const {
    data: chatData,
    mutate: mutateChat,
    revalidate,
    setSize,
  } = useSWRInfinite<IDM[]>(
    index => `/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=${index + 1}`,
    fetcher,
  );

  const [socket] = useSocket(workspace);
  const isEmpty = chatData?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (chatData && chatData[chatData.length - 1]?.length < 20) || false;

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();

      if (chat?.trim() && chatData) {
        const savedChat = chat;
        mutateChat(prevChatData => {
          prevChatData?.[0].unshift({
            id: (chatData[0][0]?.id || 0) + 1,
            content: savedChat,
            SenderId: myData.id,
            Sender: myData,
            ReceiverId: userData.id,
            Receiver: userData,
            createdAt: new Date(),
          });
          return prevChatData;
        }, false).then(() => {
          setChat('');
          scrollbarRef.current?.scrollToBottom();
        });

        axios
          .post(`/api/workspaces/${workspace}/dms/${id}/chats`, {
            content: chat,
          })
          .then(() => {
            revalidate();
          })
          .catch(console.error);
      }
    },
    [chat, chatData, myData, userData, workspace, id],
  );

  const onMessage = useCallback((data: IDM) => {
    if (data.SenderId === Number(id) && myData.id !== Number(id)) {
      mutateChat(chatData => {
        chatData?.[0].unshift(data);
        return chatData;
      }, false).then(() => {
        if (scrollbarRef.current) {
          if (
            scrollbarRef.current.getScrollHeight() <
            scrollbarRef.current.getScrollHeight() + scrollbarRef.current.getScrollTop() + 150
          ) {
            setTimeout(() => {
              scrollbarRef.current?.scrollToBottom();
            }, 50);
          }
        }
      });
    }
  }, []);

  useEffect(() => {
    socket?.on('dm', onMessage);
    return () => {
      socket?.off('dm', onMessage);
    };
  }, [socket, onMessage]);

  useEffect(() => {
    if (chatData?.length === 1) {
      scrollbarRef.current?.scrollToBottom();
    }
  }, [chatData]);

  const onDrop = useCallback(
    e => {
      e.preventDefault();
      console.log(e);
      const formData = new FormData();
      if (e.dataTransfer.items) {
        for (let i = 0; i < e.dataTransfer.items.length; i++) {
          if (e.dataTransfer.items[i].kind === 'file') {
            const file = e.dataTransfer.items[i].getAsFile();
            console.log('... file[' + i + '].name = ' + file.name);
            formData.append('image', file);
          }
        }
      } else {
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
          console.log('... file[' + i + '].name = ' + e.dataTransfer.files[i].name);
          formData.append('image', e.dataTransfer.files[i]);
        }
      }
      axios.post(`/api/workspaces/${workspace}/dms/${id}/images`, formData).then(() => {
        setDragOver(false);
        localStorage.setItem(`${workspace}-${id}`, new Date().getTime().toString());
        mutateChat();
      });
    },
    [workspace, id, mutateChat],
  );

  const onDragOver = useCallback(e => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const onDragLeave = useCallback(e => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  if (!userData || !myData) return null;

  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);

  return (
    <div style={{ position: 'relative' }} onDrop={onDrop} onDragOver={onDragOver}>
      <MessageHeader>
        <button onClick={onClickReturnPage}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <img src={gravatar.url(userData.email, { d: 'mm' })} alt={userData.nickname} />
        <p>{userData.nickname}</p>
        <div></div>
      </MessageHeader>

      <ChatList chatSections={chatSections} ref={scrollbarRef} setSize={setSize} isReachingEnd={isReachingEnd} />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />

      {dragOver && (
        <DragOver onDragLeave={onDragLeave} dragOver>
          업로드할 이미지를 드래그해주세요.
        </DragOver>
      )}
      {dragOver && <div>이미지를 업로드하시겠습니까?</div>}
    </div>
  );
};

export default Message;
