//BannerFactory.jsx
import React from 'react';
import { BannerStyle1, BannerStyle2, BannerStyle3 } from './BannerConcreteProduct';

class BannerFactory {
  createBanner(type, props) {
    switch (type) {
      case 'style1':
        return <BannerStyle1 {...props} />;
      case 'style2':
        return <BannerStyle2 {...props} />;
      case 'style3':
        return <BannerStyle3 {...props} />;
      default:
        return null;
    }
  }
}

export default BannerFactory;
