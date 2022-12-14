import styled from '@emotion/styled';
import media from '@styles/media';

export const ProfileWrapper = styled.div`
  width: 15em;
  background-color: #e9e9e9;
  position: absolute;
  border: 1px solid white;
  border-radius: 0.5rem;
  top: 40%;
  right: 5%;
  z-index: 5;
  padding: 0.5em 1em;

  & > .fa-xmark {
    position: absolute;
    top: 5%;
    right: 5%;
    font-size: 1rem;
    opacity: 70%;
    transition: opacity 300ms ease-in-out;
  }

  & > .fa-xmark:hover {
    opacity: 40%;
  }

  & > .fa-xmark:active {
    opacity: 100%;
  }

  ${media.desktop} {
    position: fixed;
    top: 10%;
    left: 10%;
    right: 0%;
    width: 18em;
    padding: 1em 1.5em 0.5em 1.5em;

    & > .fa-xmark {
      font-size: 1.2rem;
    }
  }
`;

export const ProfileContent = styled.div`
  border-bottom: 1px solid white;
  padding-bottom: 0.5em;
  ${({ theme }) => theme.flexSet('start')};

  & > img {
    width: 4em;
    margin-right: 1em;
  }

  & > div > h2 {
    font-size: 1.2rem;
    font-weight: 700;
  }

  & > div > p {
    font-size: 0.8rem;
    opacity: 70%;
  }

  ${media.desktop} {
    padding-bottom: 1em;

    & > div > h2 {
      font-size: 1.3rem;
    }

    & > div > p {
      font-size: 0.9rem;
    }
  }
`;

export const ProfileBtn = styled.div`
  text-align: center;
  padding-top: 0.5em;
  ${({ theme }) => theme.flexColumnSet()};

  & > button {
    width: 100%;
    font-size: 0.8rem;
    font-weight: 700;
    opacity: 70%;
    transition: opacity 300ms ease-in-out;
    border-bottom: 1px solid white;
    padding-bottom: 0.5em;
    margin-bottom: 0.5em;
  }

  & > button:hover {
    opacity: 40%;
  }

  & > button:active {
    opacity: 100%;
  }

  ${media.desktop} {
    & > button {
      font-size: 0.9rem;
    }
  }
`;
