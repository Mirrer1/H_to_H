import styled from '@emotion/styled';
import media from '@styles/media';

export const Container = styled.div`
  height: 100%;
  background-color: #f0e9d2;

  ${media.desktop} {
    ${props => props.theme.flexSet('start')};
  }
`;

export const Sidebar = styled.div<{ pageVisible?: boolean }>`
  display: ${props => props.pageVisible && 'none'};

  ${media.desktop} {
    position: relative;
    height: 100%;
    order: 2;
    display: block;
    overflow: scroll;
  }
`;

export const Header = styled.div`
  position: relative;
  width: 100%;
  padding: 1em 1.5em;
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
`;

export const SearchWrapper = styled.div`
  width: 100%;
  padding: 0 1em;
  margin-bottom: 3em;

  ${media.desktop} {
    margin-bottom: 1em;
  }
`;

export const Search = styled.label`
  ${props => props.theme.flexSet('start')};
  width: 100%;
  background-color: #e6ddc4;
  border-radius: 0.4rem;
  padding: 0.5em;

  & > .fa-magnifying-glass {
    opacity: 50%;
    margin-right: 0.5em;
    font-size: 1rem;
  }

  & > input {
    border: none;
    background-color: #e6ddc4;
    font-size: 1rem;
  }

  & > input:focus {
    outline: none;
  }
`;

export const WorkSpaceWrapper = styled.div`
  width: 100%;
  padding-bottom: 1em;
  margin-bottom: 1em;
  border-bottom: 1px solid white;
  ${props => props.theme.flexSet('space-around')};

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

export const ScrollbarWrapper = styled.div`
  height: 100%;
  overflow: scoll;
  background-color: #f0e9d2;
`;

export const Footer = styled.div`
  width: 100%;
  padding: 1em;
  background-color: white;
  border-top: 1px solid #e6ddc4;
  ${props => props.theme.flexSet('space-between')};

  & > div {
    font-size: 1.2rem;
    font-weight: 700;
  }

  & > button {
    font-size: 1.2rem;
    transition: opacity 300ms ease-in-out;
    ${props => props.theme.flexSet()};
  }

  & > button:hover {
    opacity: 40%;
  }

  & > button:active {
    opacity: 100%;
  }

  ${media.desktop} {
    padding: 1em 0.5em;
    border-right: 1px solid #f0e9d2;

    & > div {
      font-size: 0.8rem;
    }

    & > button {
      font-size: 1rem;
    }
  }
`;

export const DesktopWorkspace = styled.div`
  display: none;

  ${media.desktop} {
    order: 1;
    height: 100%;
    background-color: #f0e9d2;
    border-right: 1px solid white;
    padding: 0 1em;
    ${props => props.theme.flexColumnSet()};
  }
`;

export const SwitchWrapper = styled.div<{ pageVisible?: boolean }>`
  height: 100%;
  background-color: white;
  display: ${props => props.pageVisible || 'none'};

  ${media.desktop} {
    display: block;
    width: 100%;
    order: 3;

    & > button {
      display: none;
    }
  }
`;
