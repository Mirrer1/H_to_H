import styled from '@emotion/styled';

import { Channels, ChannelHeader, ChannelItem } from '@styles/ComponentsStyle/Workspace/channelList';

export const DMs = styled(Channels)``;
export const DMHeader = styled(ChannelHeader)``;
export const DMItem = styled(ChannelItem)`
  & > button > div {
    font-size: 0.6rem;
    margin-right: 0.7em;
  }

  & > button > p {
    margin-right: 0.3em;
  }

  & > button > span {
    font-weight: 700;
  }
`;
