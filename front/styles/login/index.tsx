import styled from '@emotion/styled';
import media from '../media';

export const DivWrapper = styled.div`
  color: ${props => props.theme.colors.red};
  ${media[0]} {
    font-size: 50px;
  }
`;
