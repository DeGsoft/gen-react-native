import { Meta, StoryObj } from '@storybook/react';
import { NewTodo } from '@/components/new-todo';

const meta = {
  title: 'NewTodo',
  component: NewTodo,
  tags: ['autodocs'],
} satisfies Meta<typeof NewTodo>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const Default: StoryType = {
  args: {
    onSubmit: () => {
      console.log('submitting');
    },
  },
};
