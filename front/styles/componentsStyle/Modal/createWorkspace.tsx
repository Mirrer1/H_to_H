import styled from '@emotion/styled';
import media from '@styles/media';

import { Form, FormItem, FormBtn } from '@styles/PageStyle/login';

export const CreateWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  background-color: white;
  padding: 3em 2em 2em 2em;
  border: 1px solid #e6ddc4;
`;

export const CreateXBtn = styled.button`
  position: absolute;
  top: 5%;
  right: 5%;

  & > .fa-xmark {
    font-size: 1rem;
  }
`;
export const CreateForm = styled(Form)``;
export const CreateFormItem = styled(FormItem)`
  & > div {
    font-size: 1.2rem;
    opacity: 70%;
  }

  & > input {
    width: 12em;
    font-size: 1rem;
  }
`;
export const CreateFormBtn = styled(FormBtn)`
  width: 10em;
`;
