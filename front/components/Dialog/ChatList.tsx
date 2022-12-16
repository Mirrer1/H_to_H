import React, { useCallback, useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import { IDM } from '@typings/db';
import Chat from '@components/Dialog/Chat';

interface Props {
  chatData?: IDM[];
}

const ChatList = ({ chatData }: Props) => {
  const scrollbarRef = useRef(null);
  const onScroll = useCallback(() => {}, []);

  return (
    <>
      <Scrollbars autoHide ref={scrollbarRef} onScrollFrame={onScroll}>
        <div>chatlist</div>

        {chatData?.map(chat => (
          <Chat key={chat.id} data={chat} />
        ))}
      </Scrollbars>
    </>
  );
};

export default ChatList;
