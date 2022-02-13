import { keyframes } from 'styled-components';
import { colors } from 'styles/theme';

export const skeletonAnimation = keyframes`
  0% {
    background-color: ${colors.darksnow}
  }
  30% {
    background-color:${colors.snow}
  }
  70% {
    background-color:${colors.darksnow};
  }
  100% {
    background-color: ${colors.darksnow};
  }
`;
