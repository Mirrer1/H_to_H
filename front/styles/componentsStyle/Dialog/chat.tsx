import styled from '@emotion/styled';
import media from '@styles/media';

export const ChatWrapper = styled.div`
  margin: 1.5em 0 1.5em 1em;
`;

export const ChatInfo = styled.div`
  ${({ theme }) => theme.flexSet('start')};

  & > img {
    width: 2.5em;
    border-radius: 50%;
    margin-right: 1em;
  }

  & > p {
    font-size: 1rem;
  }

  ${media.desktop} {
    & > img {
      width: 3em;
    }

    & > p {
      font-size: 1.5rem;
    }
  }
`;

export const ChatContent = styled.div`
  width: 40%;
  color: #3c4048;
  border: 1px solid #e6ddc4;
  border-radius: 0.5rem;
  padding: 0.5em 1em;
  margin: 0.5em 0 0 2em;
  ${({ theme }) => theme.flexColumnSet('center', 'start')};

  &:has(p > img) {
    border: none;
  }

  & > p {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.5em;
  }

  & > div {
    font-size: 0.8rem;
  }

  ${media.desktop} {
    width: 50%;
    padding: 1em 1.5em;
    margin: 1em 0 0 2.5em;

    & > p {
      font-size: 1.2rem;
    }

    & > div {
      font-size: 1rem;
    }
  }
`;

export const ChatImage = styled.img`
  max-height: 200;

  ${media.desktop} {
    max-height: 250;
  }
`;

export const DragOver = styled.div<{ dragOver?: boolean }>`
  display: ${props => props.dragOver || 'none'};
  position: absolute;
  top: 64px;
  left: 0;
  width: 100%;
  height: calc(100% - 64px);
  background: white;
  opacity: 0.7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  z-index: 5;

  ${media.desktop} {
    font-size: 2rem;
  }
`;
