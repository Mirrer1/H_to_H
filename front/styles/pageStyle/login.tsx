import styled from '@emotion/styled';
import media from '@styles/media';

export const FormWrapper = styled.div`
  height: 100%;
  ${props => props.theme.flexColumnSet('space-between')};

  ${media.desktop} {
    flex-direction: row;
  }
`;

export const Form = styled.div`
  text-align: center;
  margin: auto 0;
  ${props => props.theme.flexColumnSet()};

  & > header {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1em;
  }

  ${media.desktop} {
    margin: 0 auto;

    & > header {
      font-size: 2.5rem;
    }
  }
`;

export const FormItem = styled.label`
  & > div {
    font-size: 0.6rem;
    opacity: 40%;
    margin-bottom: 0.5em;
  }

  & > input {
    width: 22em;
    font-size: 0.5rem;
    border: none;
    border-bottom: 1px solid #bdbdbd;
    outline: none;
    margin-bottom: 2em;
  }

  ${media.desktop} {
    & > div {
      font-size: 1.2rem;
    }

    & > input {
      width: 18em;
      font-size: 1.2rem;
    }
  }
`;

export const FormBtn = styled.button<{ mainBtn?: boolean }>`
  width: 15em;
  font-size: 0.8rem;
  border-radius: 15px;
  padding: 0.3em 0;
  margin: auto;
  color: ${props => (props.mainBtn ? 'white' : '#707070')};
  display: ${props => props.mainBtn && 'block'};
  background-color: ${props => props.mainBtn && props.theme.colors.primary};
  margin-bottom: ${props => props.mainBtn && '0.5em'};
  border: ${props => props.mainBtn || '1px solid #bdbdbd'};
  transition: opacity 300ms ease-in-out, box-shadow 150ms ease-in-out;

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

  ${media.desktop} {
    width: 19em;
    font-size: 1.2rem;
    padding: 0.5em 0;
    margin-bottom: ${props => props.mainBtn && '1em'};
  }
`;

export const FormImage = styled.div`
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

  ${media.desktop} {
    width: 40%;
    height: 100%;
  }
`;

export const ImageMainText = styled.div`
  position: absolute;
  top: 10%;

  & > h2 {
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

  ${media.desktop} {
    & > h2 {
      font-size: 2.2rem;
    }

    & > p {
      font-size: 1rem;
    }
  }
`;

export const ImageSubText = styled.div`
  position: absolute;
  bottom: 30%;

  & > p {
    width: 8em;
    font-size: 1rem;
    color: white;
    opacity: 80%;
    border: 1.5px solid white;
    padding: 0.1em 0;
  }

  ${media.desktop} {
    & > p {
      font-size: 1.5rem;
    }
  }
`;
