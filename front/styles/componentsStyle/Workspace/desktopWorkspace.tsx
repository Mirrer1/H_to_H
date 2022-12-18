import styled from '@emotion/styled';
import media from '@styles/media';
import { WorkSpace, WorkSpaceItem } from './workspaceList';

export const DesktopWorkspaceWrapper = styled.div`
  display: none;

  ${media.desktop} {
    order: 1;
    height: 100%;
    background-color: #f0e9d2;
    border-right: 1px solid white;
    padding: 0 1.5em;
    ${props => props.theme.flexColumnSet()};
  }
`;

export const DesktopWorkSpace = styled(WorkSpace)``;
export const DesktopWorkSpaceItem = styled(WorkSpaceItem)``;
