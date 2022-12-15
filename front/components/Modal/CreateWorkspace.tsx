import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import axios from 'axios';

import useInput from '@hooks/useInput';
import {
  CreateXBtn,
  CreateWrapper,
  CreateForm,
  CreateFormItem,
  CreateFormBtn,
} from '@styles/ComponentsStyle/Modal/createWorkspace';

interface Props {
  setCreateWorkspaceVisible: () => void;
  revalidate: () => void;
}

const CreateWorkspace = ({ setCreateWorkspaceVisible, revalidate }: Props) => {
  const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput('');
  const [newUrl, onChangeNewUrl, setNewUrl] = useInput('');

  const onCreateWorkspace = useCallback(
    e => {
      e.preventDefault();
      if (!newWorkspace || !newWorkspace.trim()) return;
      if (!newUrl || !newUrl.trim()) return;

      axios
        .post(
          '/api/workspaces',
          {
            workspace: newWorkspace,
            url: newUrl,
          },
          {
            withCredentials: true,
          },
        )
        .then(() => {
          revalidate();
          setCreateWorkspaceVisible();
          setNewWorkspace('');
          setNewUrl('');
        })
        .catch(error => {
          console.dir(error);
          toast.error(error.response?.data, { position: 'top-center' });
        });
    },
    [newWorkspace, newUrl],
  );

  return (
    <CreateWrapper>
      <CreateXBtn onClick={setCreateWorkspaceVisible}>
        <FontAwesomeIcon icon={faXmark} />
      </CreateXBtn>

      <CreateForm>
        <form onSubmit={onCreateWorkspace}>
          <CreateFormItem id="workspace-label">
            <div>워크스페이스 이름</div>
            <input id="workspace" value={newWorkspace} onChange={onChangeNewWorkspace} />
          </CreateFormItem>

          <CreateFormItem id="workspace-url-label">
            <div>워크스페이스 URL</div>
            <input id="workspace" value={newUrl} onChange={onChangeNewUrl} />
          </CreateFormItem>

          <CreateFormBtn type="submit" mainBtn>
            Create
          </CreateFormBtn>
        </form>
      </CreateForm>
    </CreateWrapper>
  );
};

export default CreateWorkspace;
