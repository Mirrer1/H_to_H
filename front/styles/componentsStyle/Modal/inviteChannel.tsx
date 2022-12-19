import styled from '@emotion/styled';

import { CreateWrapper } from './createWorkspace';

export const InviteWrapper = styled(CreateWrapper)``;

export const InviteForm = styled.form`
  text-align: center;
  ${({ theme }) => theme.flexColumnSet()};
`;
