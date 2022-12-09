import styled from '@emotion/styled';
import media from '../media';

// ${media[0]} {
//   font-size: 50px;
// }
export const LoginWrapper = styled.div`
  height: 100%;
  ${props => props.theme.flexColumnSet('space-between')};
`;

export const FormWrapper = styled.div`
  text-align: center;
  padding: 2em 0;
  ${props => props.theme.flexColumnSet()};

  & > header {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 1em;
  }
`;

export const FormItem = styled.label`
  & > div {
    font-size: 0.6rem;
    opacity: 40%;
  }

  & > input {
    width: 22em;
    height: 3em;
    font-size: 0.5rem;
    border: none;
    border-bottom: 1px solid #bdbdbd;
    margin-bottom: 2em;
    outline: none;
  }
`;

export const FormBtn = styled.button<{ login?: boolean }>`
  width: 15em;
  font-size: 0.8rem;
  border-radius: 15px;
  padding: 0.3em 0;
  color: ${props => (props.login ? 'white' : '#707070')};
  display: ${props => props.login && 'block'};
  background-color: ${props => props.login && props.theme.colors.primary};
  margin-bottom: ${props => props.login && '0.5em'};
  border: ${props => props.login || '1px solid #bdbdbd'};
  transition: all 300ms ease-in-out;

  &:hover {
    opacity: 0.75;
  }

  &:active {
    opacity: 1;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }

  & > span {
    color: black;
    font-weight: 700;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 60%;
  overflow: hidden;
  text-align: center;
  ${props => props.theme.flexColumnSet()};

  & > img {
    width: 100%;
    height: 100%;
  }
`;

export const ImageText = styled.div`
  position: absolute;
  top: 10%;

  & > h1 {
    font-size: 1.4rem;
    font-weight: 700;
    color: white;
    opacity: 80%;
    margin-bottom: 1em;
  }

  & > p {
    font-size: 0.7rem;
    color: white;
    opacity: 80%;
    margin-bottom: 0.2em;
  }
`;

export const ImageBtn = styled.div`
  position: absolute;
  bottom: 30%;

  & > p {
    width: 8em;
    color: white;
    opacity: 80%;
    border: 1.5px solid white;
    padding: 0.1em 0;
  }
`;
