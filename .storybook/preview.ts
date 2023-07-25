import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'white',
      values: [
        {
          name: 'white',
          value: '#FFFFFF',
        },
        {
          name: 'gray',
          value: '#F3F5FB',
        },
        {
          name: 'black',
          value: '#000000',
        },
        {
          name: 'blue',
          value: '#2E48A0',
        },
      ],
    },
  },
}

export default preview
