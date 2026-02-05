import React from 'react';
import { fn } from '@storybook/test';

export default {
  title: 'Button',
  component: 'button',
  parameters: {
    // Optional: add some parameter for better categorization
  },
  args: {
    onClick: fn(), // Use fn() for onClick action logging
  },
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Text = {
  args: {
    children: 'Hello Button',
  },
};

export const Emoji = {
  args: {
    children: (
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    ),
  },
};