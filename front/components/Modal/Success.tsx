import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

import { SuccessWrapper, SuccessBtn } from '@styles/componentsStyle/Modal/success';

const SuccessModal = () => {
  return (
    <SuccessWrapper>
      <FontAwesomeIcon icon={faCircleCheck} />
      <header>Success!</header>
      <div>회원가입이 정상적으로 완료되었습니다.</div>

      <Link to="/login">
        <SuccessBtn>Start H to H</SuccessBtn>
      </Link>
    </SuccessWrapper>
  );
};

export default SuccessModal;
