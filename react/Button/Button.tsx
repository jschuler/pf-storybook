import * as React from 'react';
import { Button as PfButton, ButtonProps } from '@patternfly/react-core';

export function Button({ children, ...props }: ButtonProps) {
  return <PfButton {...props}>{children}</PfButton>
}

export default Button;
