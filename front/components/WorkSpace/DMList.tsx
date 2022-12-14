import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import useSWR from 'swr';

import EachDM from './EachDM';
import fetcher from '@utils/fetcher';
import useSocket from '@hooks/useSocket';
import { IUser, IUserWithOnline } from '@typings/db';
import { DMHeader, DMItem, DMs } from '@styles/ComponentsStyle/Workspace/dmList';

interface Props {
  setPageVisible: () => void;
}

const DMList = ({ setPageVisible }: Props) => {
  const { workspace } = useParams<{ workspace?: string }>();
  const [toggle, setToggle] = useState(false);
  const [onlineList, setOnlineList] = useState<number[]>([]);
  const [socket] = useSocket(workspace);

  const { data: userData } = useSWR<IUser>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const { data: memberData } = useSWR<IUserWithOnline[]>(
    userData ? `/api/workspaces/${workspace}/members` : null,
    fetcher,
  );

  useEffect(() => {
    setOnlineList([]);
  }, [workspace]);

  const onClickDM = useCallback(() => {
    setToggle(prev => !prev);
  }, []);

  useEffect(() => {
    socket?.on('onlineList', (data: number[]) => {
      setOnlineList(data);
    });

    return () => {
      socket?.off('onlineList');
    };
  }, [socket]);

  return (
    <>
      <DMs>
        <DMHeader onClick={onClickDM}>
          <div>{toggle ? <FontAwesomeIcon icon={faAngleRight} /> : <FontAwesomeIcon icon={faAngleDown} />}</div>
          <p>Direct Message</p>
        </DMHeader>

        <DMItem toggle={toggle}>
          {memberData?.map(member => {
            const isOnline = onlineList.includes(member.id);
            return <EachDM key={member.id} member={member} isOnline={isOnline} setPageVisible={setPageVisible} />;
          })}
        </DMItem>
      </DMs>
    </>
  );
};

export default DMList;
