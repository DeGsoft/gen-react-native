import { db, indexes, queries } from './database';
import Model from './model';

indexes.setIndexDefinition(
    'byPriority',
    'orders',
    'priority'
);

const Orders = (() => {
    // our base functionality...
    const base = Model('orders');

    // get all the todo ids associated with this project
    const priorities = () =>
        indexes.getSliceIds('byPriority');
    const idsByPriority = (priority) =>
        indexes.getSliceRowIds('byPriority', priority);
    const byPriority = (priority) =>
        idsByPriority(priority).map(base.byId)

    const getTableCellIds = () => {
        const cellIds = db.getTableCellIds('orders');
        // TODO: get cell ids
        return cellIds?.length>0 ? cellIds : ['orderCode', 'customerID', 'employeeID', 'orderDate', 'shipperID', 'status'];
    }
    queries.setQueryDefinition('notCancelledOrders', 'orders', ({ select, where }) => {
        getTableCellIds().map((cellId) => select(cellId));
        where((getCell) => getCell('status') != 'cancelled');
    });
    const getNotCancelledOrders = () =>
        Object.entries(queries.getResultTable('notCancelledOrders'))
            .map(([id, value]) => ({
                id,
                ...value
            }));

    return {
        ...base,
        priorities,
        byPriority,
        getNotCancelledOrders
    }
})();

export default Orders;