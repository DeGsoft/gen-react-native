import { ListTodo } from '@/components/list-todo';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'ListTodo',
    component: ListTodo,
    tags: ['autodocs'],
    argTypes: {
        data: { control: 'array' },
    },
} satisfies Meta<typeof ListTodo>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const Default: StoryType = {
    args: {
        data: [
            { id: '1', text: 'Task 1', done: false },
            { id: '2', text: 'Task 2', done: true },
            { id: '3', text: 'Task 3', done: false },
        ],
        onSubmit: () => {
            console.log('removing');
          },
    },
};
