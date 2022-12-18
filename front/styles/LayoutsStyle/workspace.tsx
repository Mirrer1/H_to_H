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
  position: relative;
  display: ${props => props.pageVisible && 'none'};

  ${media.desktop} {
    height: 100%;
    width: 20%;
    order: 2;
    display: block;
    overflow: scroll;
  }
`;

export const HeaderWapper = styled.div`
  position: fixed;
  top: 0%;
  z-index: 5;
  width: 100%;
  background-color: #f0e9d2;

  ${media.desktop} {
    position: relative;
  }
`;

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
  position: relative;
  height: auto;
  overflow: scoll;
  background-color: #f0e9d2;
  padding: 12em 0 4em 0;

  ${media.desktop} {
    padding: 0;
    height: 85%;
  }
`;

export const Footer = styled.div`
  position: fixed;
  bottom: 0%;
  z-index: 5;
  width: 100%;
  padding: 1em;
  background-color: white;
  border-top: 1px solid #e6ddc4;
  ${props => props.theme.flexSet('space-between')};

  & > div {
    font-size: 1.2rem;
    font-weight: 700;
  }

  ${media.desktop} {
    position: relative;
    padding: 1em 0.5em;
    border-right: 1px solid #f0e9d2;

    & > div {
      font-size: 1.5rem;
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
    padding: 0 1.5em;
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
    overflow: scroll;
    flex: 1;
  }
`;
