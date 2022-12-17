import React, { useCallback, forwardRef, MutableRefObject } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import Chat from '@components/Dialog/Chat';
import { IDM, IChat } from '@typings/db';
import { ChatListWrapper, ChatTimeLine } from '@styles/ComponentsStyle/Dialog/chatList';

interface Props {
  chatSections: { [key: string]: (IDM | IChat)[] };
  setSize: (f: (size: number) => number) => Promise<(IDM | IChat)[][] | undefined>;
  isReachingEnd: boolean;
}
const ChatList = forwardRef<Scrollbars, Props>(({ chatSections, setSize, isReachingEnd }, scrollRef) => {
  const onScroll = useCallback(
    values => {
      if (values.scrollTop === 0 && !isReachingEnd) {
        setSize(prevSize => prevSize + 1).then(() => {
          const current = (scrollRef as MutableRefObject<Scrollbars>)?.current;
          if (current) {
            current.scrollTop(current.getScrollHeight() - values.scrollHeight);
          }
        });
      }
    },
    [scrollRef, isReachingEnd, setSize],
  );

  return (
    <>
      <Scrollbars autoHide ref={scrollRef} onScrollFrame={onScroll}>
        {Object.entries(chatSections).map(([date, chats]) => {
          return (
            <ChatListWrapper key={date}>
              <ChatTimeLine>
                <button>{date}</button>
                <div></div>
              </ChatTimeLine>
              {chats.map(chat => (
                <Chat key={chat.id} data={chat} />
              ))}
            </ChatListWrapper>
          );
        })}
      </Scrollbars>
    </>
  );
});

export default ChatList;
