import styled from '@emotion/styled';
import media from '@styles/media';

export const MessageHeader = styled.div`
  border-bottom: 1px solid #f0eff5;
  padding: 1em;
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

  & > div {
    width: 0.5em;
    height: 0.5em;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.success};
  }

  ${media.desktop} {
    padding: 1.5em;

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

    & > div {
      width: 0.7em;
      height: 0.7em;
    }
  }
`;
