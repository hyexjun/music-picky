import styled from 'styled-components';

const Layout = (props) => {
  return <StLayout>{props.children}</StLayout>;
};

export const StLayout = styled.div`
  margin: 5% 15%;
`;

export const StDetailWrap = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export default Layout;
