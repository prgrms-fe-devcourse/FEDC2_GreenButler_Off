import Badge from 'components/basic/Badge'
import Icon from 'components/basic/Icon';

export default {
title: 'Component/Badge',
component: Badge,
argTypes: {
  isShow: {
    defaultValue: true,
    control: { type: 'boolean' },
  },
},

};
export const Default = (args) => {
  return(
    <Badge {...args}>
      <Icon name="LIKE_ICON" size={30}/>
    </Badge>
  )
};