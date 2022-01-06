import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  selected?: boolean;
};

const MyEventTab = () => {
  const { pathname } = useLocation();

  return (
    <Tab role="tablist">
      <Item role="tab" selected={pathname === '/my/on'}>
        <Link to="/my/on">알림받는 이벤트</Link>
      </Item>
      <Item role="tab" selected={pathname === '/my/past'}>
        <Link to="/my/past">지나간 이벤트</Link>
      </Item>
    </Tab>
  );
};

const Tab = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 52px;
  width: 100%;
  max-width: 640px;
  background-color: white;
  z-index: 10;
`;

const Item = styled.span`
  display: inline-block;
  height: 42px;
  line-height: 42px;
  font-size: 1rem;
  font-weight: 600;
  margin-left: 6px;
  color: ${(p: Props) => (p.selected ? 'var(--black)' : 'var(--darksnow)')};
  border-bottom: ${(p: Props) =>
    p.selected ? '2px solid var(--black);' : 'none'};
  background-color: white;
  margin: 0 12px;
  a {
    color: inherit;
  }
`;

export default MyEventTab;
