import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import useSWR from 'swr';

import fetcher from '@utils/fetcher';
import { IUser } from '@typings/db';
import {
  DesktopWorkspaceWrapper,
  DesktopWorkSpace,
  DesktopWorkSpaceItem,
} from '@styles/ComponentsStyle/Workspace/desktopWorkspace';

interface Props {
  onClickCreateWorkspace: () => void;
}

const DesktopWorkspace = ({ onClickCreateWorkspace }: Props) => {
  const { data: userData } = useSWR<IUser | false>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });

  return (
    <DesktopWorkspaceWrapper>
      {userData &&
        userData.Workspaces?.map(ws => {
          return (
            <Link key={ws.id} to={`/workspace/${ws.url}/channel/일반`}>
              <DesktopWorkSpace>
                <DesktopWorkSpaceItem>
                  <h2>{ws.name.slice(0, 1).toUpperCase()}</h2>
                  <p>{ws.name}</p>
                </DesktopWorkSpaceItem>
              </DesktopWorkSpace>
            </Link>
          );
        })}

      <DesktopWorkSpace onClick={onClickCreateWorkspace}>
        <FontAwesomeIcon icon={faSquarePlus} />
      </DesktopWorkSpace>
    </DesktopWorkspaceWrapper>
  );
};

export default DesktopWorkspace;
