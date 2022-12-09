import React, { useCallback, useState } from 'react';

import { LoginWrapper, FormWrapper, FormItem, FormBtn, ImageWrapper, ImageText, ImageBtn } from '@styles/login';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      console.log(email, password);
    },
    [email, password],
  );

  const onChangeEmail = useCallback(e => {
    setEmail(e.target.value);
  }, []);

  const onChangePassword = useCallback(e => {
    setPassword(e.target.value);
  }, []);

  return (
    <>
      <LoginWrapper>
        <FormWrapper>
          <header>Welcome back,</header>

          <form onSubmit={onSubmitForm}>
            <FormItem id="email-label">
              <div>EMAIL</div>
              <input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
            </FormItem>

            <FormItem id="password-label">
              <div>PASSWORD</div>
              <input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
            </FormItem>

            <FormBtn type="submit" login>
              LOGIN
            </FormBtn>
            <FormBtn>
              SIGN UP for <span>H to H</span>
            </FormBtn>
          </form>
        </FormWrapper>

        <ImageWrapper>
          <img src="https://i.ibb.co/6HSn38z/Mobile.png" alt="login image" />

          <ImageText>
            <h2>New here?</h2>
            <p>H to H는 다양한 사람과 대화를 나눌 수 있어요.</p>
            <p>이를 통해 자신의 가치관을 배우고, 나누고, 성장해보세요!</p>
          </ImageText>

          <ImageBtn>
            <p>Made by Mirrer</p>
          </ImageBtn>
        </ImageWrapper>
      </LoginWrapper>
    </>
  );
};

export default LogIn;
