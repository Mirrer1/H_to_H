import styled from '@emotion/styled';
import media from '@styles/media';

export const MessageHeader = styled.div`
  position: fixed;
  top: 0%;
  z-index: 5;
  background-color: white;
  border-bottom: 1px solid #f0eff5;
  padding: 1em;
  width: 100%;
  ${({ theme }) => theme.flexSet('start')};

  & > button {
    font-size: 0.8rem;
    margin-right: 1.5em;
  }

  & > img {
    width: 3em;
    border-radius: 50%;
    margin-right: 1em;
  }

  & > p {
    font-size: 1.1rem;
    font-weight: 700;
    margin-right: 0.5em;
  }

  ${media.desktop} {
    padding: 1.5em;
    z-index: 2;

    & > button {
      display: none;
    }

    & > img {
      width: 3.5em;
      margin-right: 1.5em;
    }

    & > p {
      font-size: 1.3rem;
      margin-right: 1em;
    }
  }
`;
