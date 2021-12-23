import { keyframes } from 'styled-components';

export const skeletonAnimation = keyframes`
  0% {
    background-color: var(--darksnow);
  }
  30% {
    background-color: var(--snow);
  }
  70% {
    background-color: var(--darksnow);
  }
  100% {
    background-color: var(--darksnow);
  }
`;
