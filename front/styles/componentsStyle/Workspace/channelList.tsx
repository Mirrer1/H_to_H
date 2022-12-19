import styled from '@emotion/styled';
import media from '@styles/media';

export const Channels = styled.div`
  padding: 0 2em;
  margin-bottom: 1em;

  ${media.desktop} {
    padding: 0 1em;
  }
`;

export const ChannelHeader = styled.div`
  margin-bottom: 0.2em;
  ${({ theme }) => theme.flexSet('start')};

  & > div {
    width: 1em;
    margin-right: 0.5em;
  }

  & > p {
    font-size: 1.3rem;
    font-weight: 700;
  }
`;

export const ChannelItem = styled.div<{ toggle?: boolean }>`
  display: ${props => props.toggle && 'none'};
`;

export const ChannelItemLink = styled.button`
  width: 100%;
  font-size: 1.1rem;
  margin-bottom: 0.3em;
  transition: opacity 300ms ease-in-out;
  ${({ theme }) => theme.flexSet('space-between')};

  &:hover {
    opacity: 40%;
  }

  &:active {
    opacity: 100%;
  }

  &:focus {
    background-color: #e6ddc4;
    transform: scale(1.05);
    font-weight: 700;
  }

  & > div {
    ${({ theme }) => theme.flexSet()};
  }

  & > div > div {
    margin-right: 0.5em;
  }

  & > div > p {
    margin-right: 0.5em;
  }

  & > span {
    width: 2em;
    font-weight: 700;
    text-align: center;
    color: white;
    background-color: #808080;
    border-radius: 0.5rem;
  }

  ${media.desktop} {
    & > span {
      width: 2.5em;
    }
  }
`;
