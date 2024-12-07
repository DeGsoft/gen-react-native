import { ClearTodos } from '@/components/clear-todos';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'ClearTodos',
  component: ClearTodos,
  tags: ['autodocs'],
} satisfies Meta<typeof ClearTodos>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const Default: StoryType = {
  args: {
    show: true,
    onPress: () => {
      console.log('clearing');
    },
  },
};
