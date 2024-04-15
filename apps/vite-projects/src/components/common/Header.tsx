import { styled } from "styled-components";

const Header = () => {
  return (
    <HeaderStyle>
      <h1>Header</h1>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.header`
  background-color: ${({ theme }) => theme.color};

  h1 {
    color: ${({ theme }) => theme.color.primary};
  }
`;

export default Header;
