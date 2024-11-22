import React from 'react';

import Accordion from '../../Accordion';
import securityData from '../../../constants/securityData';

function SecuritySection() {
  return (
    <div className="flex flex-col text-center">
      <span className="text-4xl font-normal">Email that’s secure, private,<br /> and puts you in control</span>
      <Accordion data={securityData} imagePosition="right" />
    </div>
  );
};

export default SecuritySection;
