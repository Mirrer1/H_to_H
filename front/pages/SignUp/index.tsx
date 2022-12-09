import React, { useCallback, useState } from 'react';

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
    <div>
      <div>
        <img src="https://i.ibb.co/FB7QYQP/image.jpg" alt="singup image" />

        <div>
          <h2>Save you Account Now.</h2>
          <p>H to H에 오신 것을 환영합니다!</p>
          <p>지금 바로 다른 사람과 대화를 시작해보세요.</p>
        </div>

        <div>
          <p>Human to Human</p>
        </div>
      </div>

      <div>
        <header>Pleased to Meet you.</header>

        <form onSubmit={onSubmitForm}>
          <label id="email-label">
            <div>EMAIL</div>
            <input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </label>

          <label id="nickname-label">
            <div>NICKNAME</div>
            <input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </label>

          <label id="password-label">
            <div>PASSWORD</div>
            <input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </label>

          <label id="check-password-label">
            <div>CHECK PASSWORD</div>
            <input
              type="password"
              id="checkPassword"
              name="checkPassword"
              value={checkPassword}
              onChange={onChangeCheckPassword}
            />
          </label>

          <label id="userTerm-label">
            <div>
              <input type="checkbox" checked={userTerm} onChange={onChangeUserTerm} />
              <span>(개인정보 수집, 이용, 여기는 bold)에 동의합니다.</span>
            </div>
          </label>

          <button type="submit">SIGN UP</button>
          <p>
            이미 회원이신가요?(연한글자) <span>로그인 하러가기(볼드처리)</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
