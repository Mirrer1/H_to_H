import React, { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { ErrorWrapper, ErrorBtn } from '@styles/componentsStyle/Modal/error';

interface propsType {
  error: string;
}

const ErrorModal = (error: propsType) => {
  const [visible, setVisible] = useState(true);

  const onClickBtn = useCallback(() => {
    setVisible(false);
  }, []);

  console.log(`모달의 에러는 error는 이것 ${error}`);
  console.log(`모달의 에러는 error는 이것 ${JSON.stringify(error)}`);

  return (
    <>
      <ErrorWrapper visible={visible}>
        <FontAwesomeIcon icon={faExclamationTriangle} />
        <header>Warning!</header>
        <div>{error.error}</div>
        <ErrorBtn onClick={onClickBtn}>확인</ErrorBtn>
      </ErrorWrapper>
    </>
  );
};

export default ErrorModal;
