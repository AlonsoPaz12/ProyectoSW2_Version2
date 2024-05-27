// ButtonFactory.jsx
import React from 'react';
import { ButtonStyle1 } from './ButtonConcreteProduct';
import { ButtonStyle2 } from './ButtonConcreteProduct';
import { ButtonStyle3 } from './ButtonConcreteProduct';

class ButtonFactory {
  createButton(type, props) {
    switch (type) {
      case 'style1':
        return <ButtonStyle1 {...props} />;
      case 'style2':
        return <ButtonStyle2 {...props} />;
      case 'style3':
        return <ButtonStyle3 {...props} />;
      default:
        return null;
    }
  }
}

export default ButtonFactory;