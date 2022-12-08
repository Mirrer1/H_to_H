import React, { useCallback, useState } from 'react';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitForm = useCallback(e => {
    e.preventDefault();
    console.log(e);
  }, []);

  const onChangeEmail = useCallback(e => {
    setEmail(e.target.value);
  }, []);

  const onChangePassword = useCallback(e => {
    setPassword(e.target.value);
  }, []);

  return (
    <>
      <header>Welcome back,</header>

      <form onSubmit={onSubmitForm}>
        <label id="email-label">
          <div>EMAIL</div>
          <div>
            <input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </label>

        <label id="password-label">
          <div>PASSWORD</div>
          <div>
            <input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </label>
      </form>

      <div>
        <button>Forget password?</button>
        <button>SIGN IN</button>
        <button>
          Connect with <span>google</span>
        </button>
      </div>

      <div>
        <img src="https://i.pinimg.com/564x/36/ef/7d/36ef7d8454036cda8bae26851cf75dff.jpg" alt="login image" />
        <h1>처음이신가요?</h1>
        <p>H to H는 다양한 사람과 대화를 나눌 수 있어요.</p>
        <p>이를 통해 자신의 가치관을 배우고, 나누고, 성장해보세요!</p>
        <button>SIGN UP</button>
      </div>
    </>
  );
};

export default LogIn;
