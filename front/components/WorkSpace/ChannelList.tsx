import React, { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router';
import useSWR from 'swr';

import fetcher from '@utils/fetcher';
import { IChannel, IUser } from '@typings/db';
import { Channels, ChannelHeader, ChannelItem } from '@styles/ComponentsStyle/Workspace/channelList';

interface Props {
  setPageVisible: () => void;
}

const ChannelList = ({ setPageVisible }: Props) => {
  const [toggle, setToggle] = useState(false);
  const { workspace } = useParams<{ workspace: string }>();

  const { data: userData } = useSWR<IUser | false>('/api/users', fetcher);
  const { data: channelData } = useSWR<IChannel[]>(userData ? `/api/workspaces/${workspace}/channels` : null, fetcher);

  const onClickChannel = useCallback(() => {
    setToggle(prev => !prev);
  }, []);

  return (
    <Channels>
      <ChannelHeader onClick={onClickChannel}>
        <div>{toggle ? <FontAwesomeIcon icon={faAngleRight} /> : <FontAwesomeIcon icon={faAngleDown} />}</div>
        <p>Channels</p>
      </ChannelHeader>

      <ChannelItem toggle={toggle}>
        {channelData?.map(channel => {
          return (
            <NavLink key={channel.id} to={`/workspace/${workspace}/channel/${channel.name}`}>
              <button key={channel.id} onClick={setPageVisible}>
                <div>#</div>
                <p>{channel.name}</p>
              </button>
            </NavLink>
          );
        })}
      </ChannelItem>
    </Channels>
  );
};

export default ChannelList;
