import styled from '@emotion/styled';
import media from '@styles/media';

import { FormBtn, FormImage, FormItem, ImageSubText } from '@styles/PageStyle/login';

export const SignupImage = styled(FormImage)`
  height: 40%;
`;

export const SignupImageSubText = styled(ImageSubText)`
  bottom: 15%;

  & > p {
    width: 12em;
  }
`;

export const SignupFormItem = styled(FormItem)`
  & > input {
    margin-bottom: 0;
  }

  ${media.desktop} {
    & > div {
      margin-bottom: 0;
    }
  }
`;

export const AgreeCheck = styled.div`
  cursor: pointer;
  ${({ theme }) => theme.flexSet()};

  & > input {
    cursor: pointer;
    border: 2px solid #bcbcbc;
    margin-right: 0.5em;
  }

  & > input[type='checkbox'] {
    accent-color: #707070;
  }

  & > p {
    font-size: 0.6rem;
  }

  & > p > span {
    font-weight: 700;
  }

  ${media.desktop} {
    & > p {
      font-size: 1rem;
    }
  }
`;

export const SignupFormBtn = styled(FormBtn)`
  width: 18em;
  border: none;

  &:active {
    box-shadow: none;
  }
`;

export const FormError = styled.div<{ error?: boolean }>`
  font-size: 0.5rem;
  font-weight: 700;
  margin-bottom: 1em;
  visibility: ${props => (props.error ? 'visible' : 'hidden')};
  color: ${({ theme }) => theme.colors.error};

  ${media.desktop} {
    font-size: 0.8rem;
  }
`;
