import Image from 'components/basic/Image';
import Badge from 'components/basic/Badge'

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
      <Image src="https://via.placeholder.com/200"/>
    </Badge>
  )
};