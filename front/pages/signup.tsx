import React, { useCallback, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';

import useInput from '@hooks/useInput';
import SuccessModal from '@components/Modal/Success';
import ErrorModal from '@components/Modal/Error';
import fetcher from '@utils/fetcher';
import { FormWrapper, Form, ImageMainText } from '@styles/PageStyle/login';
import {
  SignupImage,
  SignupImageSubText,
  SignupFormItem,
  SignupFormBtn,
  AgreeCheck,
  FormError,
} from '@styles/PageStyle/signup';

const SignUp = () => {
  const { data, error, revalidate } = useSWR('http://localhost:3095/api/users', fetcher);
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [checkPassword, onChangeCheckPassword] = useInput('');

  const [userTerm, setUserTerm] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [idError, setIdError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupError, setSignupError] = useState('');

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      setSubmit(true);

      const emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      const nickRule = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;

      !email || !email.match(emailRule) ? setIdError(true) : setIdError(false);
      !nickname || !nickname.match(nickRule) ? setNicknameError(true) : setNicknameError(false);
      !password || !(password === checkPassword) ? setPasswordError(true) : setPasswordError(false);
      !userTerm ? setTermError(true) : setTermError(false);
    },
    [email, nickname, password, checkPassword, userTerm, idError],
  );

  useEffect(() => {
    if (submit && !idError && !nicknameError && !passwordError && !termError) {
      setSubmit(false);
      setSignupSuccess(false);
      setSignupError('');
      axios
        .post('http://localhost:3095/api/users', {
          email,
          nickname,
          password,
        })
        .then(response => {
          console.log(response);
          setSignupSuccess(true);
        })
        .catch(error => {
          console.log(error.response.data);
          setSignupError(error.response.data);
        });
      console.log(email, nickname, password);
    }
  }, [submit, idError, nicknameError, passwordError, termError]);

  const onChangeUserTerm = useCallback(() => {
    setUserTerm(prev => !prev);
  }, []);

  if (data) {
    return <Redirect to="/workspace/sleact/channel/일반" />;
  }

  return (
    <FormWrapper>
      <SignupImage>
        <img src="https://i.ibb.co/FB7QYQP/image.jpg" alt="singup image" />

        <ImageMainText>
          <h2>Save you Account Now.</h2>
          <p>H to H에 오신 것을 환영합니다!</p>
          <p>지금 바로 다른 사람과 대화를 시작해보세요.</p>
        </ImageMainText>

        <SignupImageSubText>
          <p>Human to Human</p>
        </SignupImageSubText>
      </SignupImage>

      <Form>
        <header>Pleased to Meet you.</header>

        <form onSubmit={onSubmitForm}>
          <SignupFormItem id="email-label">
            <div>EMAIL</div>
            <input type="text" id="email" name="email" value={email} onChange={onChangeEmail} />
          </SignupFormItem>
          <FormError error={idError}>Email 형식이 올바르지 않습니다.</FormError>

          <SignupFormItem id="nickname-label">
            <div>NICKNAME</div>
            <input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </SignupFormItem>
          <FormError error={nicknameError}>닉네임은 2 ~ 16자 이하, 영어 또는 숫자 또는 한글로 입력해주세요.</FormError>

          <SignupFormItem id="password-label">
            <div>PASSWORD</div>
            <input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </SignupFormItem>
          <FormError error={passwordError}>Password가 일치하지 않습니다.</FormError>

          <SignupFormItem id="check-password-label">
            <div>CHECK PASSWORD</div>
            <input
              type="password"
              id="checkPassword"
              name="checkPassword"
              value={checkPassword}
              onChange={onChangeCheckPassword}
            />
          </SignupFormItem>
          <FormError error={passwordError}>Password가 일치하지 않습니다.</FormError>

          <label id="userTerm-label">
            <AgreeCheck>
              <input type="checkbox" checked={userTerm} onChange={onChangeUserTerm} />
              <p>
                <span>개인정보 수집, 이용</span>에 동의합니다.
              </p>
            </AgreeCheck>
          </label>
          <FormError error={termError}>개인정보 수집 및 이용에 동의해주세요.</FormError>

          <SignupFormBtn type="submit" mainBtn>
            SIGN UP
          </SignupFormBtn>
        </form>
        <Link to="/login">
          <SignupFormBtn>
            이미 회원이신가요? <span>로그인 하러가기</span>
          </SignupFormBtn>
        </Link>
      </Form>

      {signupSuccess && <SuccessModal />}
      {signupError && <ErrorModal error={signupError} />}
    </FormWrapper>
  );
};

export default SignUp;
