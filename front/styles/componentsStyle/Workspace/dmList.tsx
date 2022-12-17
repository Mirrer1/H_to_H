import styled from '@emotion/styled';

import { Channels, ChannelHeader, ChannelItem } from '@styles/ComponentsStyle/Workspace/channelList';

export const DMs = styled(Channels)``;
export const DMHeader = styled(ChannelHeader)``;
export const DMItem = styled(ChannelItem)`
  & > a > button {
    font-size: 1.2rem;
  }
`;

export const Online = styled.div<{ isOnline?: boolean }>`
  width: 0.5em;
  height: 0.5em;
  border-radius: 50%;
  background-color: ${props => (props.isOnline ? '#a5d6a7' : '#ff5858')};

  & ~ span {
    margin-left: 0.2em;
  }
`;
