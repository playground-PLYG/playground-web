import { Meta, StoryObj } from '@storybook/react'

import { SampleButton } from './SampleButton'

const meta = {
  title: 'SampleButton',
  component: SampleButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SampleButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    color: 'primary',
    label: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    color: 'secondary',
    label: 'Button',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
}
