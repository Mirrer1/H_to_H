import React, { useCallback, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { useParams } from 'react-router';
import { Mention, SuggestionDataItem } from 'react-mentions';
import autosize from 'autosize';
import useSWR from 'swr';
import gravatar from 'gravatar';

import fetcher from '@utils/fetcher';
import { IUser } from '@typings/db';
import { Form, MentionsTextarea, UserSuggestion } from '@styles/ComponentsStyle/Dialog/chatBox';

interface Props {
  chat: string;
  onSubmitForm: (e: any) => void;
  onChangeChat: (e: any) => void;
  placeholder?: string;
}

const ChatBox = ({ chat, onSubmitForm, onChangeChat, placeholder }: Props) => {
  const textareaRef = useRef(null);
  const { workspace } = useParams<{ workspace: string }>();

  const { data: userData } = useSWR<IUser | false>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const { data: memberData } = useSWR<IUser[]>(userData ? `/api/workspaces/${workspace}/members` : null, fetcher);

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

  const renderSuggestion = useCallback(
    (
      suggestion: SuggestionDataItem,
      search: string,
      highlightedDisplay: React.ReactNode,
      index: number,
      focus: boolean,
    ): React.ReactNode => {
      if (!memberData) return;

      return (
        <UserSuggestion focus={focus}>
          <img src={gravatar.url(memberData[index].email, { d: 'mm' })} alt={memberData[index].nickname} />
          <span>{highlightedDisplay}</span>
        </UserSuggestion>
      );
    },
    [],
  );

  return (
    <>
      <Form onSubmit={onSubmitForm}>
        <MentionsTextarea
          value={chat}
          onChange={onChangeChat}
          onKeyDown={onKeydownChat}
          id="editor-chat"
          // placeholder={placeholder}
          placeholder="Enter Message..."
          inputRef={textareaRef}
          allowSuggestionsAboveCursor
        >
          <Mention
            appendSpaceOnAdd
            trigger="@"
            data={memberData?.map(v => ({ id: v.id, display: v.nickname })) || []}
            renderSuggestion={renderSuggestion}
          />
        </MentionsTextarea>

        <button type="submit">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </Form>
    </>
  );
};

export default ChatBox;
