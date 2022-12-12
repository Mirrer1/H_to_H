import styled from '@emotion/styled';
import media from '@styles/media';

import { SuccessBtn, SuccessWrapper } from './success';

export const ErrorWrapper = styled(SuccessWrapper)<{ visible?: boolean }>`
  display: ${props => props.visible || 'none'};

  & > .fa-triangle-exclamation {
    font-size: 4em;
    margin-bottom: 0.3em;
    color: ${props => props.theme.colors.warning};
  }

  ${media.desktop} {
    & > .fa-triangle-exclamation {
      font-size: 6em;
    }
  }
`;

export const ErrorBtn = styled(SuccessBtn)``;
