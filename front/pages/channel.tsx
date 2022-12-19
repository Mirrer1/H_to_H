import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import useSWR, { useSWRInfinite } from 'swr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Scrollbars from 'react-custom-scrollbars';
import axios from 'axios';

import useInput from '@hooks/useInput';
import ChatList from '@components/Dialog/ChatList';
import ChatBox from '@components/Dialog/ChatBox';
import fetcher from '@utils/fetcher';
import useSocket from '@hooks/useSocket';
import makeSection from '@utils/makeSection';
import InviteChannel from '@components/Modal/InviteChannel';
import { IChat, IUser, IChannel } from '@typings/db';
import { ChannelWrapper, ChannelPageHeader, ChannelPageName, ChannelPageInfo } from '@styles/PageStyle/channel';
import { DragOver } from '@styles/ComponentsStyle/Dialog/chat';

interface Props {
  onClickReturnPage: () => void;
}

const Channel = ({ onClickReturnPage }: Props) => {
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();
  const scrollbarRef = useRef<Scrollbars>(null);
  const [chat, onChangeChat, setChat] = useInput('');
  const [inviteChannelVisible, setInviteChannelVisible] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const { data: myData } = useSWR('/api/users', fetcher);
  const { data: channelData } = useSWR<IChannel>(`/api/workspaces/${workspace}/channels/${channel}`, fetcher);
  const {
    data: chatData,
    mutate: mutateChat,
    revalidate,
    setSize,
  } = useSWRInfinite<IChat[]>(
    index => `/api/workspaces/${workspace}/channels/${channel}/chats?perPage=20&page=${index + 1}`,
    fetcher,
  );
  const { data: channelMembersData } = useSWR<IUser[]>(
    myData ? `/api/workspaces/${workspace}/channels/${channel}/members` : null,
    fetcher,
  );

  const [socket] = useSocket(workspace);
  const isEmpty = chatData?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (chatData && chatData[chatData.length - 1]?.length < 20) || false;

  const onClickInviteChannel = useCallback(() => {
    setInviteChannelVisible(prev => !prev);
  }, []);

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();

      if (chat?.trim() && chatData && channelData) {
        const savedChat = chat;
        mutateChat(prevChatData => {
          prevChatData?.[0].unshift({
            id: (chatData[0][0]?.id || 0) + 1,
            content: savedChat,
            UserId: myData.id,
            User: myData,
            ChannelId: channelData.id,
            Channel: channelData,
            createdAt: new Date(),
          });
          return prevChatData;
        }, false).then(() => {
          setChat('');
          scrollbarRef.current?.scrollToBottom();
        });

        axios
          .post(`/api/workspaces/${workspace}/channels/${channel}/chats`, {
            content: chat,
          })
          .then(() => {
            revalidate();
          })
          .catch(console.error);
      }
    },
    [chat, chatData, myData, channelData, workspace, channel],
  );

  const onMessage = useCallback(
    (data: IChat) => {
      if ((data.Channel.name === channel && data.content.startsWith('uploads\\')) || data.UserId !== myData?.id) {
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
    },
    [channel, myData],
  );

  useEffect(() => {
    socket?.on('message', onMessage);
    return () => {
      socket?.off('message', onMessage);
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
          console.log(e.dataTransfer.items[i]);
          if (e.dataTransfer.items[i].kind === 'file') {
            const file = e.dataTransfer.items[i].getAsFile();
            console.log(e, '.... file[' + i + '].name = ' + file.name);
            formData.append('image', file);
          }
        }
      } else {
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
          console.log(e, '... file[' + i + '].name = ' + e.dataTransfer.files[i].name);
          formData.append('image', e.dataTransfer.files[i]);
        }
      }
      axios.post(`/api/workspaces/${workspace}/channels/${channel}/images`, formData).then(() => {
        setDragOver(false);
        localStorage.setItem(`${workspace}-${channel}`, new Date().getTime().toString());
      });
    },
    [workspace, channel],
  );

  const onDragOver = useCallback(e => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const onDragLeave = useCallback(e => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  if (!myData) return null;

  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);

  return (
    <ChannelWrapper onDrop={onDrop} onDragOver={onDragOver}>
      <ChannelPageHeader>
        <ChannelPageName>
          <button onClick={onClickReturnPage}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <h1># {channel}</h1>
        </ChannelPageName>

        <ChannelPageInfo>
          <p>{channelMembersData?.length}</p>
          <button onClick={onClickInviteChannel}>
            <FontAwesomeIcon icon={faUserPlus} />
          </button>
        </ChannelPageInfo>
      </ChannelPageHeader>

      <ChatList chatSections={chatSections} ref={scrollbarRef} setSize={setSize} isReachingEnd={isReachingEnd} />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />

      {dragOver && (
        <DragOver onDragLeave={onDragLeave} dragOver>
          업로드할 이미지를 드래그해주세요.
        </DragOver>
      )}
      {inviteChannelVisible && <InviteChannel onClickInviteChannel={onClickInviteChannel} />}
    </ChannelWrapper>
  );
};

export default Channel;
