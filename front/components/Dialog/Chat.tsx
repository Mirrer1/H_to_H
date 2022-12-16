import React, { memo, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import gravatar from 'gravatar';
import dayjs from 'dayjs';
import regexifyString from 'regexify-string';

import { IDM } from '@typings/db';

interface Props {
  data: IDM;
}

const Chat = ({ data }: Props) => {
  const { workspace } = useParams<{ workspace: string }>();
  const user = data.Sender;

  const result = useMemo(
    () =>
      regexifyString({
        input: data.content,
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
      }),
    [data.content],
  );
  return (
    <>
      <img src={gravatar.url(user.email, { d: 'mm' })} alt={user.nickname} />

      <div>{user.nickname}</div>
      <span>{dayjs(data.createdAt).format('h:mm A')}</span>
      <p>{result}</p>
    </>
  );
};

export default memo(Chat);
