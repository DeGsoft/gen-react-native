import Model from './model';
import { indexes } from './database';

indexes.setIndexDefinition(
    'byPriority',
    'todos',
    'priority'
);

const Todos = (() => {
    // our base functionality...
    const baseTodos = Model('todos');

    // get all the todo ids associated with this project
    const priorities = () =>
        indexes.getSliceIds('byPriority');
    const idsByPriority = (priority) =>
        indexes.getSliceRowIds('byPriority', priority);
    const byPriority = (priority) =>
        idsByPriority(priority).map(baseTodos.byId)

    return {
        ...baseTodos,
        priorities,
        byPriority
    }
})();

export default Todos;
