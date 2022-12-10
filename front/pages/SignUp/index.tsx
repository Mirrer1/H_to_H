import React, { useCallback, useState } from 'react';

import { FormWrapper, Form, ImageMainText } from '@styles/login';
import { SignupImage, SignupImageSubText, SignupFormItem, SignupFormBtn, AgreeCheck } from '@styles/signup';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [userTerm, setUserTerm] = useState(false);

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      console.log(email, nickname, password, checkPassword, userTerm);
    },
    [email, nickname, password, checkPassword, userTerm],
  );

  const onChangeEmail = useCallback(e => {
    setEmail(e.target.value);
  }, []);

  const onChangeNickname = useCallback(e => {
    setNickname(e.target.value);
  }, []);

  const onChangePassword = useCallback(e => {
    setPassword(e.target.value);
  }, []);

  const onChangeCheckPassword = useCallback(e => {
    setCheckPassword(e.target.value);
  }, []);

  const onChangeUserTerm = useCallback(e => {
    setUserTerm(e.target.checked);
  }, []);

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
            <input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </SignupFormItem>

          <SignupFormItem id="nickname-label">
            <div>NICKNAME</div>
            <input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </SignupFormItem>

          <SignupFormItem id="password-label">
            <div>PASSWORD</div>
            <input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </SignupFormItem>

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

          <label id="userTerm-label">
            <AgreeCheck>
              <input type="checkbox" checked={userTerm} onChange={onChangeUserTerm} />
              <p>
                <span>개인정보 수집, 이용</span>에 동의합니다.
              </p>
            </AgreeCheck>
          </label>

          <SignupFormBtn type="submit" mainBtn>
            SIGN UP
          </SignupFormBtn>
        </form>
        <SignupFormBtn>
          이미 회원이신가요? <span>로그인 하러가기</span>
        </SignupFormBtn>
      </Form>
    </FormWrapper>
  );
};

export default SignUp;
