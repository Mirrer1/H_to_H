import styled from '@emotion/styled';
import media from '@styles/media';

export const Container = styled.div`
  height: 100%;
  background-color: #f0e9d2;

  ${media.desktop} {
    ${({ theme }) => theme.flexSet('start')};
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
  ${({ theme }) => theme.flexSet('space-between')};

  & > div {
    font-size: 1.2rem;
    font-weight: 700;
  }

  ${media.desktop} {
    padding: 1em 0.5em;
    border-right: 1px solid #f0e9d2;

    & > div {
      font-size: 1.5rem;
    }
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
