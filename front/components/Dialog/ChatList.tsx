import Chat from '@components/Dialog/Chat';

import { IDM, IChat } from '@typings/db';
import React, { useCallback, forwardRef, MutableRefObject } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

interface Props {
  chatSections: { [key: string]: (IDM | IChat)[] };
  setSize: (f: (size: number) => number) => Promise<(IDM | IChat)[][] | undefined>;
  isReachingEnd: boolean;
}
const ChatList = forwardRef<Scrollbars, Props>(({ chatSections, setSize, isReachingEnd }, scrollRef) => {
  const onScroll = useCallback(
    values => {
      if (values.scrollTop === 0 && !isReachingEnd) {
        console.log('가장 위');
        setSize(prevSize => prevSize + 1).then(() => {
          // 스크롤 위치 유지
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
});

export default ChatList;
