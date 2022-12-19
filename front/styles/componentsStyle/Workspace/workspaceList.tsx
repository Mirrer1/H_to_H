import styled from '@emotion/styled';
import media from '@styles/media';

export const WorkSpaceWrapper = styled.div`
  width: 100%;
  padding-bottom: 1em;
  margin-bottom: 1em;
  border-bottom: 1px solid white;
  ${({ theme }) => theme.flexSet('space-around')};

  ${media.desktop} {
    display: none;
  }
`;

export const WorkSpace = styled.button`
  position: relative;
  width: 4em;
  height: 3em;
  background-color: #e6ddc4;
  border-radius: 0.4rem;
  transition: opacity 300ms ease-in-out;

  & > .fa-square-plus {
    font-size: 1.2rem;
  }

  &:hover {
    opacity: 40%;
  }

  &:active {
    opacity: 100%;
  }

  ${media.desktop} {
    margin-bottom: 2.5em;
  }
`;

export const WorkSpaceItem = styled.div`
  width: 3em;
  height: 2em;
  position: absolute;
  top: -50%;
  transform: translateX(15%);

  & > h2 {
    font-size: 1.5rem;
    background-color: white;
    margin-bottom: 0.1em;
  }

  & > p {
    font-size: 0.8rem;
    opacity: 70%;
  }
`;
