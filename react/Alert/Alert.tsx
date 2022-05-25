import * as React from 'react';
import { Alert as PfAlert, AlertProps } from '@patternfly/react-core';

export function Alert({ children, ...props }: AlertProps) {
  return <PfAlert {...props}>{children}</PfAlert>
}

export default Alert;
