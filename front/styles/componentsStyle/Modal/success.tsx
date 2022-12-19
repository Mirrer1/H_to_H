import styled from '@emotion/styled';
import media from '@styles/media';

export const SuccessWrapper = styled.div<{ visible?: boolean }>`
  width: 20em;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  padding: 2em;
  background-color: #ffffff;
  border: 1px solid #eeeeee;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  ${({ theme }) => theme.flexColumnSet()};

  & > .fa-circle-check {
    font-size: 4em;
    margin-bottom: 0.3em;
    color: ${({ theme }) => theme.colors.success};
  }

  & > header {
    font-size: 1.2rem;
    font-weight: 700;
  }

  & > div {
    font-size: 0.7rem;
    margin-bottom: 2em;
  }

  ${media.desktop} {
    width: 25em;

    & > .fa-circle-check {
      font-size: 6em;
    }

    & > header {
      font-size: 1.5rem;
    }

    & > div {
      font-size: 1rem;
    }
  }
`;

export const SuccessBtn = styled.button`
  font-size: 0.8rem;
  color: white;
  background-color: ${({ theme }) => theme.colors.primaryLight};

  border-radius: 15px;
  padding: 0.5em 0.7em;
  transition: opacity 300ms ease-in-out, box-shadow 150ms ease-in-out;

  &:hover {
    opacity: 0.75;
  }

  &:active {
    opacity: 1;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }

  ${media.desktop} {
    font-size: 1rem;
  }
`;
