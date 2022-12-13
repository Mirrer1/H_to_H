import styled from '@emotion/styled';
import media from '@styles/media';

export const Container = styled.div`
  height: 100%;
  background-color: #f0e9d2;
`;

export const Header = styled.div`
  padding: 1.5em 1em;

  ${props => props.theme.flexSet('space-between')};

  & > header {
    font-size: 2rem;
    font-weight: 700;
    opacity: 70%;
  }

  & > button > img {
    width: 2.5em;
  }
`;

export const SearchWrapper = styled.div`
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

export const WorkSpace = styled.div`
  padding-bottom: 1em;
  margin-bottom: 1em;
  border-bottom: 1px solid white;
  ${props => props.theme.flexSet('space-around')};

  & > button {
    position: relative;
    width: 4em;
    height: 3em;
    background-color: #e6ddc4;
    border-radius: 0.4rem;
    ${props => props.theme.flexColumnSet()};
  }

  & > button > .fa-square-plus {
    font-size: 1.5rem;
    transition: opacity 300ms ease-in-out;
  }

  & > button > .fa-square-plus:hover {
    opacity: 40%;
  }

  & > button > .fa-square-plus:active {
    opacity: 100%;
  }
`;

export const WorkSpaceItem = styled.div`
  z-index: 5;
  position: absolute;
  top: -50%;
  transition: opacity 300ms ease-in-out;

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

  &:hover {
    opacity: 40%;
  }

  &:active {
    opacity: 100%;
  }
`;

export const Menu = styled.div`
  padding-left: 1em;
  margin-bottom: 1em;

  ${props => props.theme.flexColumnSet('center', 'start')};

  & > button {
    font-size: 1rem;
    transition: opacity 300ms ease-in-out;
    ${props => props.theme.flexSet()};
  }

  & > button > div {
    width: 2em;
  }

  & > button > p {
    font-weight: 700;
  }

  & > button:hover {
    opacity: 40%;
  }

  & > button:active {
    opacity: 100%;
  }
`;

export const Channels = styled.div`
  padding-left: 1em;
  margin-bottom: 1em;
  ${props => props.theme.flexColumnSet('center', 'start')};

  & > button {
    font-size: 1rem;
    transition: opacity 300ms ease-in-out;
    ${props => props.theme.flexSet()};
  }

  & > button > div {
    width: 2em;
  }

  & > button > p {
    font-weight: 700;
  }

  & > button:hover {
    opacity: 40%;
  }

  & > button:active {
    opacity: 100%;
  }
`;

export const ChannelItem = styled.div`
  & > button {
    margin-left: 1em;
    transition: opacity 300ms ease-in-out;
    ${props => props.theme.flexSet()};
  }

  & > button > div {
    width: 2em;
  }

  & > button:hover {
    opacity: 40%;
  }

  & > button:active {
    opacity: 100%;
  }
`;

export const DM = styled(Channels)`
  padding-left: 1em;
`;

export const DMItem = styled(ChannelItem)`
  & > button > div {
    margin: 0 0.5em 0.2em 0;
  }
`;

export const Footer = styled.div`
  padding: 1em;
  position: absolute;
  bottom: 0%;
  width: 100%;
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
