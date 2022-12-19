import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useParams } from 'react-router';
import useSWR from 'swr';

import fetcher from '@utils/fetcher';
import { IUser } from '@typings/db';
import { Online, DMItemLink } from '@styles/ComponentsStyle/Workspace/dmList';

interface Props {
  member: IUser;
  isOnline: boolean;
  setPageVisible: () => void;
}
const EachDM = ({ member, isOnline, setPageVisible }: Props) => {
  const location = useLocation();
  const { workspace } = useParams<{ workspace?: string }>();

  const { data: userData } = useSWR<IUser>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const date = localStorage.getItem(`${workspace}-${member.id}`) || 0;

  const { data: count, mutate } = useSWR<number>(
    userData ? `/api/workspaces/${workspace}/dms/${member.id}/unreads?after=${date}` : null,
    fetcher,
  );

  useEffect(() => {
    if (location.pathname === `/workspace/${workspace}/dm/${member.id}`) {
      mutate(0);
    }
  }, [mutate, location.pathname, workspace, member]);

  return (
    <NavLink key={member.id} to={`/workspace/${workspace}/dm/${member.id}`}>
      <DMItemLink onClick={setPageVisible}>
        <div>
          <Online isOnline={isOnline}></Online>
          <p>{member.nickname}</p>
          {member.id === userData?.id && <span>(Me)</span>}
        </div>

        <span>{count && (count > 100 ? +99 : count)}</span>
      </DMItemLink>
    </NavLink>
  );
};

export default EachDM;
