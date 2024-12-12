import Model from './model';
import { TODO_TABLE, indexes } from './database';

indexes.setIndexDefinition(
    'byPriority',
    TODO_TABLE,
    'priority'
);

const Todos = (() => {
    // our base functionality...
    const baseTodos = Model(TODO_TABLE);

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
