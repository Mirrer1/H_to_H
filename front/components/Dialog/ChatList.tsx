import React, { forwardRef, useCallback } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import { IDM } from '@typings/db';
import Chat from '@components/Dialog/Chat';

interface Props {
  chatSections: { [key: string]: IDM[] };
  setSize: (f: (size: number) => number) => Promise<IDM[][] | undefined>;
  isEmpty: boolean;
  isReachingEnd: boolean;
}

const ChatList = forwardRef<Scrollbars, Props>(({ chatSections, setSize, isEmpty, isReachingEnd }: Props, ref) => {
  const onScroll = useCallback(values => {
    if (values.scrollTop === 0 && !isReachingEnd) {
      console.log('가장 위');
      setSize(prevSize => prevSize + 1).then(() => {});
    }
  }, []);

  return (
    <>
      <Scrollbars autoHide ref={ref} onScrollFrame={onScroll}>
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
});

export default ChatList;
