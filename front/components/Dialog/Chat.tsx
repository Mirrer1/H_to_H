import React, { memo, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import gravatar from 'gravatar';
import dayjs from 'dayjs';
import regexifyString from 'regexify-string';

import { IDM, IChat } from '@typings/db';
import { ChatWrapper, ChatInfo, ChatContent, ChatImage } from '@styles/ComponentsStyle/Dialog/chat';

interface Props {
  data: IDM | IChat;
}

const BACK_URL = process.env.NODE_ENV === 'development' && 'http://localhost:3095';
const Chat = ({ data }: Props) => {
  const { workspace } = useParams<{ workspace: string }>();
  const user = 'Sender' in data ? data.Sender : data.User;

  const result = useMemo<(string | JSX.Element)[] | JSX.Element>(
    () =>
      data.content.startsWith('uploads\\') || data.content.startsWith('uploads/') ? (
        <ChatImage src={`${BACK_URL}/${data.content}`} />
      ) : (
        regexifyString({
          pattern: /@\[(.+?)]\((\d+?)\)|\n/g,
          decorator(match, index) {
            const arr: string[] | null = match.match(/@\[(.+?)]\((\d+?)\)/)!;
            if (arr) {
              return (
                <Link key={match + index} to={`/workspace/${workspace}/dm/${arr[2]}`}>
                  @{arr[1]}
                </Link>
              );
            }
            return <br key={index} />;
          },
          input: data.content,
        })
      ),
    [workspace, data.content],
  );

  return (
    <ChatWrapper>
      <ChatInfo>
        <img src={gravatar.url(user.email, { d: 'mm' })} alt={user.nickname} />
        <p>{user.nickname}</p>
      </ChatInfo>

      <ChatContent>
        <p>{result}</p>
        <div>{dayjs(data.createdAt).format('h:mm A')}</div>
      </ChatContent>
    </ChatWrapper>
  );
};

export default memo(Chat);
