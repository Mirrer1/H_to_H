import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import useSWR from 'swr';

import fetcher from '@utils/fetcher';
import { IUser, IUserWithOnline } from '@typings/db';
import { DMHeader, DMItem, DMs } from '@styles/ComponentsStyle/Workspace/dmList';

interface Props {
  setPageVisible: () => void;
}

const DMList = ({ setPageVisible }: Props) => {
  const [toggle, setToggle] = useState(false);
  const { workspace } = useParams<{ workspace?: string }>();

  const { data: userData } = useSWR<IUser | undefined>('/api/users', fetcher, {
    dedupingInterval: 2000,
  });
  const { data: memberData } = useSWR<IUserWithOnline[]>(
    userData ? `/api/workspaces/${workspace}/members` : null,
    fetcher,
  );

  const onClickDM = useCallback(() => {
    setToggle(prev => !prev);
  }, []);

  return (
    <>
      <DMs>
        <DMHeader onClick={onClickDM}>
          <div>{toggle ? <FontAwesomeIcon icon={faAngleRight} /> : <FontAwesomeIcon icon={faAngleDown} />}</div>
          <p>Direct Message</p>
        </DMHeader>

        <DMItem toggle={toggle}>
          {memberData?.map(member => {
            // const isOnline = onlineList.includes(member.id);
            // const count = countList[member.id] || 0;
            return (
              <NavLink key={member.id} to={`/workspace/${workspace}/dm/${member.id}`}>
                <button onClick={setPageVisible}>
                  <div>
                    <FontAwesomeIcon icon={faCircle} />
                  </div>
                  <p>{member.nickname}</p>
                  {member.id === userData?.id && <span>(Me)</span>}
                  {/* {count > 0 && <span>{count}</span>} */}
                </button>
              </NavLink>
            );
          })}
        </DMItem>
      </DMs>
    </>
  );
};

export default DMList;
