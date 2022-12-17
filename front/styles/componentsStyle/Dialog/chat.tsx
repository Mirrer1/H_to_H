import styled from '@emotion/styled';
import media from '@styles/media';

export const ChatWrapper = styled.div`
  margin: 1.5em 0 1.5em 1em;
`;

export const ChatInfo = styled.div`
  ${({ theme }) => theme.flexSet('start')};

  & > img {
    width: 2.5em;
    border-radius: 50%;
    margin-right: 1em;
  }

  & > p {
    font-size: 1rem;
  }

  ${media.desktop} {
    & > img {
      width: 3em;
    }

    & > p {
      font-size: 1.5rem;
    }
  }
`;

export const ChatContent = styled.div`
  background-color: #e6ddc4;
  width: 40%;
  color: white;
  border-radius: 0.5rem;
  padding: 0.5em 1em;
  margin: 0.5em 0 0 2em;
  ${({ theme }) => theme.flexColumnSet('center', 'start')};

  & > p {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.5em;
  }

  & > div {
    font-size: 0.8rem;
  }

  ${media.desktop} {
    width: 50%;
    padding: 1em 1.5em;
    margin: 1em 0 0 2.5em;

    & > p {
      font-size: 1.2rem;
    }

    & > div {
      font-size: 1rem;
    }
  }
`;
