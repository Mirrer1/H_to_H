import styled from '@emotion/styled';
import media from '@styles/media';

export const Container = styled.div`
  height: 100%;
  background-color: #f0e9d2;
`;

// export const DesktopWorkspace = styled.div`
//   display: none;

//   ${media.desktop} {
//     display: block;
//   }
// `;

export const Header = styled.div`
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
`;

export const Search = styled.label`
  ${props => props.theme.flexSet('start')};
  width: 100%;
  background-color: #e6ddc4;
  border-radius: 0.4rem;
  padding: 0.5em;
  margin-bottom: 3em;

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
`;

export const WorkSpaceItem = styled.div`
  position: absolute;
  top: -50%;
  transform: translateX(25%);

  & > img {
    width: 2.5em;
    margin: auto;
  }

  & > p {
    font-size: 0.8rem;
    font-weight: 700;
    margin-top: 0.3em;
    opacity: 70%;
  }
`;

export const Menu = styled.div`
  padding-left: 1em;
  margin-bottom: 1em;
`;

export const MenuItem = styled.button`
  width: 100%;
  font-size: 1rem;
  transition: opacity 300ms ease-in-out;
  ${props => props.theme.flexSet('start')};

  &:hover {
    opacity: 40%;
  }

  &:active {
    opacity: 100%;
  }

  &:focus {
    background-color: #e6ddc4;
  }

  & > div {
    width: 2em;
  }

  & > p {
    font-weight: 700;
  }
`;

export const Channels = styled(Menu)``;

export const ChannelItem = styled(MenuItem)<{ channelToggle?: boolean }>`
  display: ${props => props.channelToggle && 'none'};
  margin-left: 1em;

  &:first-child {
    margin-left: 0;
  }
`;

export const DM = styled(Menu)``;
export const DMItem = styled(ChannelItem)<{ dmToggle?: boolean }>`
  display: ${props => props.dmToggle && 'none'};
  margin-bottom: 0.3em;
`;

export const Footer = styled.div`
  width: 100%;
  padding: 1em;
  position: absolute;
  bottom: 0%;
  background-color: white;
  border-top: 1px solid #e6ddc4;
  ${props => props.theme.flexSet('space-between')};

  & > button {
    font-size: 1.2rem;
    transition: opacity 300ms ease-in-out;
    ${props => props.theme.flexSet()};
  }

  & > button > div {
    margin-right: 0.5em;
  }

  & > .fa-pen-to-square {
    transition: opacity 300ms ease-in-out;
    font-size: 1.5rem;
  }

  & > button:hover {
    opacity: 40%;
  }

  & > button:active {
    opacity: 100%;
  }

  & > .fa-pen-to-square:hover {
    opacity: 40%;
  }

  & > .fa-pen-to-square:active {
    opacity: 100%;
  }
`;

export const SwitchWrapper = styled.div`
  display: none;
`;
