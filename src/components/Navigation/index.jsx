import styled from "@emotion/styled"
import Icon from "components/basic/Icon"

const NavContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  border-top: 1px solid ${({theme}) => (theme.color.borderGray)};
`
const NavList = styled.ul`
  display: flex;
`

const NavItem = styled.li`
  padding: 30px 0;
  width: 25%;
  text-align: center;
  cursor: pointer;
`
export const Navigation = () => {
  return (
    <NavContainer>
      <NavList>
        <NavItem><Icon name='HOME' size={27}/></NavItem>
        <NavItem><Icon name='ADD_POST' size={27}/></NavItem>
        <NavItem><Icon name='SEARCH' size={27}/></NavItem>
        <NavItem><Icon name='MY_PAGE' size={27}/></NavItem>
      </NavList>
    </NavContainer>
  )
}

export default Navigation