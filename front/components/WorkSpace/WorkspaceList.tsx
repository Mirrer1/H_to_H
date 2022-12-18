import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import useSWR from 'swr';

import fetcher from '@utils/fetcher';
import { IUser } from '@typings/db';
import { WorkSpaceWrapper, WorkSpace, WorkSpaceItem } from '@styles/ComponentsStyle/Workspace/workspaceList';

interface Props {
  onClickCreateWorkspace: () => void;
}

const WorkspaceList = ({ onClickCreateWorkspace }: Props) => {
  const { data: userData } = useSWR<IUser | false>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  return (
    <WorkSpaceWrapper>
      {userData &&
        userData.Workspaces?.map(ws => {
          return (
            <Link key={ws.id} to={`/workspace/${ws.url}/channel/일반`}>
              <WorkSpace>
                <WorkSpaceItem>
                  <h2>{ws.name.slice(0, 1).toUpperCase()}</h2>
                  <p>{ws.name}</p>
                </WorkSpaceItem>
              </WorkSpace>
            </Link>
          );
        })}

      <WorkSpace onClick={onClickCreateWorkspace}>
        <FontAwesomeIcon icon={faSquarePlus} />
      </WorkSpace>
    </WorkSpaceWrapper>
  );
};

export default WorkspaceList;
