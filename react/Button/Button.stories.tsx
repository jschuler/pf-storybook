import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from "./Button";

import { ButtonAriaDisabled } from "./ButtonAriaDisabled";
import { ButtonAriaDisabledLinkTooltip } from "./ButtonAriaDisabledLinkTooltip";
import { ButtonAriaDisabledTooltip } from "./ButtonAriaDisabledTooltip";
import { ButtonBlock } from "./ButtonBlock";
import { ButtonCallToAction } from "./ButtonCallToAction";
import { ButtonDisabled } from "./ButtonDisabled";
import { ButtonInlineSpanLink } from "./ButtonInlineSpanLink";
import { ButtonLinks } from "./ButtonLinks";
import { ButtonProgress } from "./ButtonProgress";
// import { ButtonRouterLink } from './ButtonRouterLink';
import { ButtonSmall } from "./ButtonSmall";
import { ButtonTypes } from "./ButtonTypes";
import { ButtonVariations } from "./ButtonVariations";

export default {
  title: "React/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args} />
);

export const Example = Template.bind({});
Example.args = {
    children: "Button",
};
