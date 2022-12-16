import React, { useCallback, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { Mention, MentionsInput, SuggestionDataItem } from 'react-mentions';
import autosize from 'autosize';
import useSWR from 'swr';
import gravatar from 'gravatar';

import fetcher from '@utils/fetcher';
import { IUser } from '@typings/db';
import styled from '@emotion/styled';

interface Props {
  chat: string;
  onSubmitForm: (e: any) => void;
  onChangeChat: (e: any) => void;
  placeholder?: string;
}

// 스타일 파일로 분리
const MentionsTextarea = styled(MentionsInput)``;

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
        <button>
          {/* focus를 props로 전달해서 선택된거는 다른 스타일 사용 */}

          <img src={gravatar.url(memberData[index].email, { d: 'mm' })} alt={memberData[index].nickname} />
          <span>{highlightedDisplay}</span>
        </button>
      );
    },
    [],
  );

  return (
    <>
      <form onSubmit={onSubmitForm}>
        <MentionsTextarea
          value={chat}
          onChange={onChangeChat}
          onKeyDown={onKeydownChat}
          id="editor-chat"
          placeholder={placeholder}
          inputRef={textareaRef}
          allowSuggestionsAboveCursor
          // 목록 아래로 나오는 문제 제로초 멘션기능만들기 질문창 참고
        >
          {/* Mention의 부모는 MentionsInput이여야한다. */}
          <Mention
            appendSpaceOnAdd
            trigger="@"
            data={memberData?.map(v => ({ id: v.id, display: v.nickname })) || []}
            renderSuggestion={renderSuggestion}
          />
        </MentionsTextarea>
        <button type="submit">전송</button>
      </form>
    </>
  );
};

export default ChatBox;
