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
    width: 1em;
    margin-right: 0.5em;
  }

  & > p {
    font-size: 1rem;
    font-weight: 700;
  }
`;

export const ChannelItem = styled.div<{ toggle?: boolean }>`
  padding-left: 1em;
  display: ${props => props.toggle && 'none'};

  & > a > button {
    width: 100%;
    transition: opacity 300ms ease-in-out;
    ${props => props.theme.flexSet('start')};
  }

  & > a > button > div {
    margin-right: 0.5em;
  }

  & > a > button:hover {
    opacity: 40%;
  }

  & > a > button:active {
    opacity: 100%;
  }

  & > a > button:focus {
    background-color: #e6ddc4;
    transform: scale(1.05);
    font-weight: 700;
  }
`;
