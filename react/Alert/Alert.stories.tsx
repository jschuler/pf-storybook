import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Alert from './Alert';

export default {
  title: 'React/Alert',
  component: Alert
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const Success = Template.bind({});
Success.args = {
  title: 'This is an alert',
  variant: 'success'
};

export const Danger = Template.bind({});
Danger.args = {
  title: 'This is an alert',
  variant: 'danger'
};
