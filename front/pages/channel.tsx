import React, { useCallback } from 'react';

import useInput from '@hooks/useInput';
import ChatList from '@components/Dialog/ChatList';
import ChatBox from '@components/Dialog/ChatBox';

const Channel = () => {
  const [chat, onChangeChat, setChat] = useInput('');

  const onSubmitForm = useCallback(e => {
    e.preventDefault();
    console.log('submit');
    setChat('');
  }, []);

  return (
    <>
      <div>채널페이지</div>
      {/* <ChatList /> */}
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </>
  );
};

export default Channel;
