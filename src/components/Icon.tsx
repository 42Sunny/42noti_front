import { IconSet } from 'constants/IconSet';

type iconName =
  | 'time'
  | 'location'
  | 'arrowLeft'
  | 'arrowRight'
  | 'alarm'
  | 'alarmLine'
  | 'sync';

type Props = {
  icon: iconName;
  size: number;
  color?: string;
};

const Icon = ({ icon, size, color }: Props) => (
  <svg
    height={size}
    viewBox={IconSet[icon].viewBox}
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    {IconSet[icon].path.map((path: string, index: number) => {
      return <path key={icon + index} d={path} />;
    })}
  </svg>
);
export default Icon;
