import { useState } from 'react'
import Modal from 'components/Modal'
import Viewport from 'components/Viewport';

export default {
  title: 'Component/Modal',
  component: Modal,
  argTypes: {
  },

};

export const Default = (args) => {
  const [visible, setVisible] = useState(false);

  return (
    <Viewport>
      <button onClick={(e) => setVisible(true)}>클릭 클릭</button>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        하이루!
        <button onClick={() => setVisible(false)}>닫기</button>
      </Modal>
    </Viewport>
  );
};
