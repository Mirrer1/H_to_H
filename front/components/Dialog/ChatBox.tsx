import React, { useCallback, useEffect, useRef } from 'react';
import autosize from 'autosize';

interface Props {
  chat: string;
  onSubmitForm: (e: any) => void;
  onChangeChat: (e: any) => void;
  placeholder?: string;
}

const ChatBox = ({ chat, onSubmitForm, onChangeChat, placeholder }: Props) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  }, []);

  const onKeydownChat = useCallback(
    e => {
      if (e.key === 'Enter') {
        if (!e.shiftKey) {
          e.preventDefault();
          onSubmitForm(e);
        }
      }
    },
    [onSubmitForm],
  );

  return (
    <>
      <form onSubmit={onSubmitForm}>
        <textarea
          value={chat}
          onChange={onChangeChat}
          onKeyDown={onKeydownChat}
          id="editor-chat"
          placeholder={placeholder}
          ref={textareaRef}
        />
        <button type="submit">전송</button>
      </form>
    </>
  );
};

export default ChatBox;
