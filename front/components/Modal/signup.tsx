import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

const Modal = () => {
  return (
    <>
      <FontAwesomeIcon icon={faXmark} />
      <FontAwesomeIcon icon={faCircleCheck} />
      <header>Success!</header>
      <div>회원가입이 정상적으로 완료되었습니다.</div>
      <Link to="/login">
        <button>Start H to H</button>
      </Link>
    </>
  );
};

export default Modal;
