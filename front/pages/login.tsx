import React, { useCallback, useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';

import useInput from '@hooks/useInput';
import fetcher from '@utils/fetcher';
import ErrorModal from '@components/Modal/Error';
import { FormWrapper, Form, FormItem, FormBtn, FormImage, ImageMainText, ImageSubText } from '@styles/PageStyle/login';

const LogIn = () => {
  const { data, error, revalidate, mutate } = useSWR('/api/users', fetcher);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [loginError, setLoginError] = useState('');

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      setLoginError('');
      axios
        .post(
          '/api/users/login',
          { email, password },
          {
            withCredentials: true,
          },
        )
        .then(response => {
          mutate(response.data, false);
        })
        .catch(error => {
          console.log(error.response);
          setLoginError(error.response.data);
        });
    },
    [email, password],
  );

  if (data) {
    return <Redirect to="/workspace/sleact/channel/일반" />;
  }

  return (
    <FormWrapper>
      <Form>
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

          <FormBtn type="submit" mainBtn>
            LOGIN
          </FormBtn>
          <Link to="/signup">
            <FormBtn>
              SIGN UP for <span>H to H</span>
            </FormBtn>
          </Link>
        </form>
      </Form>

      <FormImage>
        <img src="https://i.ibb.co/6HSn38z/Mobile.png" alt="login image" />

        <ImageMainText>
          <h2>New here?</h2>
          <p>H to H는 다양한 사람과 대화를 나눌 수 있어요.</p>
          <p>이를 통해 자신의 가치관을 공유하고, 나누고, 성장해보세요!</p>
        </ImageMainText>

        <ImageSubText>
          <p>Made by Mirrer</p>
        </ImageSubText>
      </FormImage>

      {loginError && <ErrorModal error={loginError} />}
    </FormWrapper>
  );
};

export default LogIn;
