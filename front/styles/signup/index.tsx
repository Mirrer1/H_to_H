import styled from '@emotion/styled';
import media from '@styles/media';

import { FormBtn, FormImage, FormItem, ImageSubText } from '@styles/login';

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
  ${media.desktop} {
    & > div {
      margin-bottom: 0;
    }

    & > input {
      margin-bottom: 1.5em;
    }
  }
`;

export const AgreeCheck = styled.div`
  cursor: pointer;
  margin-bottom: 2em;
  ${props => props.theme.flexSet()};

  & > input {
    cursor: pointer;
    border: 2px solid #bcbcbc;
    margin-right: 0.5em;
  }

  & > input[type='checkbox'] {
    accent-color: #707070;
  }

  & > p {
    font-size: 0.8rem;
  }

  & > p > span {
    font-weight: 700;
  }
`;

export const SignupFormBtn = styled(FormBtn)`
  width: 18em;
  border: none;

  &:active {
    box-shadow: none;
  }
`;
