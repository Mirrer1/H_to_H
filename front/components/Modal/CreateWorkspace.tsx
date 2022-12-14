import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

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
}

const CreateWorkspace = ({ setCreateWorkspaceVisible }: Props) => {
  const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput('');
  const [newUrl, onChangeNewUrl, setNewUrl] = useInput('');

  const onCreateWorkspace = useCallback(e => {
    e.preventDefault();
    console.log('form 전송');
  }, []);

  return (
    <CreateWrapper>
      <CreateXBtn onClick={setCreateWorkspaceVisible}>
        <FontAwesomeIcon icon={faXmark} />
      </CreateXBtn>

      <CreateForm onSubmit={onCreateWorkspace}>
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
      </CreateForm>
    </CreateWrapper>
  );
};

export default CreateWorkspace;
