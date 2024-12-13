import { Meta, StoryObj } from '@storybook/react';
import { NewTodoForm } from '@/components/new-todo-form';

const meta = {
  title: 'NewTodoForm',
  component: NewTodoForm,
  tags: ['autodocs'],
} satisfies Meta<typeof NewTodoForm>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const Default: StoryType = {
  args: {
    onSave: () => {
      console.log('submitting');
    },
  },
};
