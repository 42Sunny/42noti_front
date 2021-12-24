import { IconSet } from '../constants/IconSet';

type iconName =
  | 'time'
  | 'location'
  | 'arrowLeft'
  | 'arrowRight'
  | 'reminder'
  | 'addReminder';

interface IconProps {
  icon: iconName;
  size: number;
  color?: string;
}

const Icon = ({ icon, size, color }: IconProps) => (
  <svg
    height={size}
    viewBox={IconSet[icon].viewBox}
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d={IconSet[icon].path} />
  </svg>
);
export default Icon;
