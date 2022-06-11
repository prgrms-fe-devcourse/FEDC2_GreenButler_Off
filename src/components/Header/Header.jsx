import styled from '@emotion/styled'
import Icon from 'components/basic/Icon'


const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 20px;
  border-bottom: 1px solid ${({theme}) => theme.color.borderGray};
`
const InnerLeft = styled.div`
  
`
const InnerRight = styled.div`
  i:not(:first-of-type){
    margin-left: 20px;
  }
`

export const Header = () => {
  return (
    <HeaderContainer>
      <InnerLeft>
        <Icon name="ARROW_LEFT" size={20}/>
      </InnerLeft>
      <InnerRight>
        <Icon name="NOTIFICATION" size={30}/>
        <Icon name="MY_INFO" size={30}/>
      </InnerRight>
    </HeaderContainer>
  )
}

export default Header