import styled from '@emotion/styled';
import media from '@styles/media';

export const Channels = styled.div`
  padding-left: 1em;
  margin-bottom: 1em;

  ${media.desktop} {
    padding: 0 2em 0 1em;
  }
`;

export const ChannelHeader = styled.div`
  ${props => props.theme.flexSet('start')};

  & > div {
    margin-right: 0.5em;
  }

  & > p {
    font-size: 1rem;
    font-weight: 700;
  }
`;

export const ChannelItem = styled.div<{ channelToggle?: boolean }>`
  padding-left: 1em;
  display: ${props => props.channelToggle && 'none'};

  & > button {
    width: 100%;
    transition: opacity 300ms ease-in-out;
    ${props => props.theme.flexSet('start')};
  }

  & > button > div {
    margin-right: 0.5em;
  }

  & > button:hover {
    opacity: 40%;
  }

  & > button:active {
    opacity: 100%;
  }

  & > button:focus {
    background-color: #e6ddc4;
  }
`;
