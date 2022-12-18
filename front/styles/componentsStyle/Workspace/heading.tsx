import styled from '@emotion/styled';
import media from '@styles/media';

export const Header = styled.div`
  position: relative;
  width: 100%;
  padding: 1em 1.5em;
  margin-bottom: 2em;
  ${props => props.theme.flexSet('space-between')};

  & > header {
    font-size: 2rem;
    font-weight: 700;
    opacity: 70%;
  }

  & > button > img {
    width: 2.5em;
    transition: opacity 300ms ease-in-out;
  }

  & > button > img:hover {
    opacity: 40%;
  }

  & > button > img:active {
    opacity: 100%;
  }

  ${media.desktop} {
    margin-bottom: 0;

    & > header {
      font-size: 2rem;
    }

    & > button > img {
      width: 3em;
    }
  }
`;
