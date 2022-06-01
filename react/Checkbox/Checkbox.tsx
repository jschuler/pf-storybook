import * as React from 'react';
import { Checkbox as PfCheckbox, CheckboxProps } from '@patternfly/react-core';

export function Checkbox({ children, ...props }: CheckboxProps) {
  return <PfCheckbox {...props} />
}

export default Checkbox;
