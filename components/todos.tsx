import { DONE_CELL, TODO_TABLE } from "@/services/database/database";
import { FlatList, StyleSheet } from "react-native";
import { useSortedRowIds } from "tinybase/ui-react";
import { Todo } from "./todo";

// A list component to show all the todos.
export const Todos = ({ data }) => {
    const renderItem = ({ item }) => <Todo item={item} />;
    return (
        <FlatList
            data={data || useSortedRowIds(TODO_TABLE, DONE_CELL)}
            renderItem={renderItem}
            style={styles.todos}
        />
    );
};

const styles = StyleSheet.create({
    todos: {
        flex: 1,
        marginTop: 16,
    },
});
