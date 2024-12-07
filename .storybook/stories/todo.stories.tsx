import { Todo } from '@/components/todo';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'Todo',
    component: Todo,
    tags: ['autodocs'],
} satisfies Meta<typeof Todo>;

export default meta;
type StoryType = StoryObj<typeof meta>;
export const Completed: StoryType = {
    args: {
        item: {
            id: '1',
            text: 'Task 1',
            done: true
        }
    },
};

export const Uncompleted: StoryType = {
    args: {
        item: {
            id: '2',
            text: 'Task 2',
            done: false
        },
    }
};
