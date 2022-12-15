import React, { useCallback, useState } from 'react';
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
  const { workspace } = useParams<{ workspace: string }>();
  const [channelToggle, setChannelToggle] = useState(false);

  const { data: userData } = useSWR<IUser | false>('/api/users', fetcher);
  const { data: channelData } = useSWR<IChannel[]>(userData ? `/api/workspaces/${workspace}/channels` : null, fetcher);

  const onClickChannel = useCallback(() => {
    setChannelToggle(prev => !prev);
  }, []);

  return (
    <Channels>
      <ChannelHeader onClick={onClickChannel}>
        <div>{channelToggle ? <FontAwesomeIcon icon={faAngleRight} /> : <FontAwesomeIcon icon={faAngleDown} />}</div>
        <p>Channels</p>
      </ChannelHeader>

      <ChannelItem channelToggle={channelToggle}>
        {channelData?.map(v => {
          return (
            <button key={v.id} onClick={setPageVisible}>
              <div>#</div>
              <p key={v.id}>{v.name}</p>
            </button>
          );
        })}
      </ChannelItem>
    </Channels>
  );
};

export default ChannelList;
