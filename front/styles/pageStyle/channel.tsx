import styled from '@emotion/styled';
import media from '@styles/media';

export const ChannelPageHeader = styled.div`
  position: fixed;
  top: 0%;
  z-index: 5;
  background-color: white;
  border-bottom: 1px solid #f0eff5;
  padding: 1em 2em 1em 1em;
  width: 100%;
  ${({ theme }) => theme.flexSet('space-between')};

  & > div {
    ${({ theme }) => theme.flexSet()};
  }

  ${media.desktop} {
    z-index: 1;
    width: -webkit-fill-available;
    padding: 1.5em 2.5em 1.5em 1.5em;
  }
`;

export const ChannelPageName = styled.div`
  & > button {
    font-size: 0.8rem;
    margin-right: 1.5em;
  }

  & > h1 {
    font-size: 1.2rem;
    font-weight: 700;
  }

  ${media.desktop} {
    & > button {
      display: none;
    }

    & > h1 {
      font-size: 1.4rem;
    }
  }
`;

export const ChannelPageInfo = styled.div`
  & > p {
    font-size: 1.2rem;
    margin-right: 0.5em;
  }

  & > button {
    font-size: 1.2rem;
    opacity: 50%;
    transition: opacity 300ms ease-in-out;
  }

  & > button:hover {
    opacity: 20%;
  }

  & > button:active {
    opacity: 50%;
  }

  ${media.desktop} {
    & > p {
      font-size: 1.5rem;
      margin-right: 0.7em;
    }

    & > button {
      font-size: 1.5rem;
    }
  }
`;
