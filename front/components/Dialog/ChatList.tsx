import React, { useCallback, useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import { IDM } from '@typings/db';
import Chat from '@components/Dialog/Chat';

interface Props {
  chatSections: { [key: string]: IDM[] };
}

const ChatList = ({ chatSections }: Props) => {
  const scrollbarRef = useRef(null);
  const onScroll = useCallback(() => {}, []);

  return (
    <>
      <Scrollbars autoHide ref={scrollbarRef} onScrollFrame={onScroll}>
        <div>chatlist</div>

        {Object.entries(chatSections).map(([date, chats]) => {
          return (
            <section key={date}>
              <div style={{ position: 'sticky', top: '14px', textAlign: 'center' }}>
                <button>{date}</button>
              </div>
              {chats.map(chat => (
                <Chat key={chat.id} data={chat} />
              ))}
            </section>
          );
        })}
      </Scrollbars>
    </>
  );
};

export default ChatList;
