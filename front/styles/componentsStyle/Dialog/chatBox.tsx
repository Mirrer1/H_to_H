import styled from '@emotion/styled';
import media from '@styles/media';
import { MentionsInput } from 'react-mentions';

export const Form = styled.form`
  ${({ theme }) => theme.flexSet()};
  color: #495057;
  font-size: 1rem;
  width: 100%;
  padding: 1em 2.5em;
  border-top: 1px solid #f0eff5;
  position: absolute;
  bottom: 0%;

  & > button {
    padding: 0.8em;
    color: white;
    background-color: #e6ddc4;
    border-radius: 0.4rem;
    transition: background-color 300ms ease-in-out;
  }

  & > button:hover {
    background-color: #f0e9d2;
  }

  & > button:active {
    background-color: #e6ddc4;
  }

  ${media.desktop} {
    width: -webkit-fill-available;
  }
`;

export const MentionsTextarea = styled(MentionsInput)`
  width: 100%;
  font-size: 1rem;
  padding: 0.5em;
  background-color: #f0eff5;
  border-radius: 0.4rem;
  margin-right: 0.5em;

  & strong {
    background: #d8d7db;
  }

  & textarea {
    height: 44px;
    padding: 9px 10px !important;
    outline: none !important;
    border-radius: 10px !important;
    resize: none !important;
    line-height: 22px;
    border: none;
  }

  & ul {
    border: 1px solid lightgray;
    max-height: 200px;
    overflow-y: auto;
    padding: 9px 10px;
    background: white;
    border-radius: 4px;
    width: 150px;
  }
`;

export const UserSuggestion = styled.button<{ focus?: boolean }>`
  margin-bottom: 0.5em;
  padding: 0.5em 0 0 0.5em;
  transition: opacity 300ms ease-in-out;
  opacity: ${props => props.focus && '50%'};
  ${({ theme }) => theme.flexSet()};

  & > img {
    width: 3em;
    margin-right: 1em;
  }

  & > span {
    font-size: 1.1rem;
    font-weight: 700;
  }
`;
