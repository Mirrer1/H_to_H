import styled from '@emotion/styled';

export const ChatListWrapper = styled.section`
  height: auto;
  padding: 2.5em 0;
`;

export const ChatTimeLine = styled.div`
  position: sticky;
  top: 3%;
  text-align: center;

  & > button {
    position: relative;
    z-index: 5;
    background-color: #f0eff5;
    font-size: 0.8rem;
    padding: 0.5em 3em;
    border-radius: 0.5rem;
  }

  & > div {
    width: 100%;
    height: 1px;
    background-color: #f0eff5;
    position: absolute;
    top: 50%;
  }
`;
