import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useParams } from 'react-router';
import useSWR from 'swr';

import fetcher from '@utils/fetcher';
import { IChannel, IUser } from '@typings/db';
import { ChannelItemLink } from '@styles/ComponentsStyle/Workspace/channelList';

interface Props {
  channel: IChannel;
  setPageVisible: () => void;
}
const EachChannel = ({ channel, setPageVisible }: Props) => {
  const location = useLocation();
  const { workspace } = useParams<{ workspace?: string }>();

  const { data: userData } = useSWR<IUser>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const date = localStorage.getItem(`${workspace}-${channel.name}`) || 0;

  const { data: count, mutate } = useSWR<number>(
    userData ? `/api/workspaces/${workspace}/channels/${channel.name}/unreads?after=${date}` : null,
    fetcher,
  );

  useEffect(() => {
    if (location.pathname === `/workspace/${workspace}/channel/${channel.name}`) {
      mutate(0);
    }
  }, [mutate, location.pathname, workspace, channel]);

  return (
    <NavLink key={channel.id} to={`/workspace/${workspace}/channel/${channel.name}`}>
      <ChannelItemLink key={channel.id} onClick={setPageVisible}>
        <div>
          <div>#</div>
          <p>{channel.name}</p>
        </div>

        <span>{count && (count > 100 ? +99 : count)}</span>
      </ChannelItemLink>
    </NavLink>
  );
};

export default EachChannel;
