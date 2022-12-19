import styled from '@emotion/styled';
import media from '@styles/media';

export const ChatListWrapper = styled.section`
  height: auto;
  padding: 1em 0;
  margin: 4em 0;

  ${media.desktop} {
    margin: 5.5em 0;
  }
`;

export const ChatTimeLine = styled.div`
  position: sticky;
  top: 3%;
  text-align: center;

  & > button {
    position: relative;
    background-color: #f0eff5;
    font-size: 0.8rem;
    padding: 0.5em 3em;
    border-radius: 0.5rem;
    z-index: 1;
  }

  & > div {
    width: 100%;
    height: 1px;
    background-color: #f0eff5;
    position: absolute;
    top: 50%;
  }
`;
