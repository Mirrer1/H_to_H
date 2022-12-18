import styled from '@emotion/styled';
import media from '@styles/media';

import { FormItem } from '@styles/PageStyle/login';
import { CreateFormItem, CreateWrapper, CreateXBtn, CreateFormBtn } from './createWorkspace';

export const InviteWrapper = styled(CreateWrapper)``;

export const InviteForm = styled.form`
  text-align: center;
  ${({ theme }) => theme.flexColumnSet()};
`;
