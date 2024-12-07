import { DONE_CELL, TODO_TABLE } from "@/services/database/database";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useRow, useSetCellCallback } from "tinybase/ui-react";

// Emojis to decorate each todo.
const NOT_DONE_ICON = String.fromCodePoint('0x1F7E0');
const DONE_ICON = String.fromCodePoint('0x2705');

// A single todo component, either 'not done' or 'done': press to toggle.
export const Todo = ({ item }) => {
    const isObject = !!(item && typeof item === 'object' && !Array.isArray(item));
    const id = isObject ? item.id : item;
    const { text, done } = isObject ? item : useRow(TODO_TABLE, item);

    const handlePress = useSetCellCallback(
        TODO_TABLE,
        id,
        DONE_CELL,
        () => (done) => !done
    );

    return (
        <TouchableOpacity
            key={id}
            onPress={handlePress}
            style={[styles.todo, done ? styles.done : null]}
        >
            <Text style={styles.todoText}>
                {done ? DONE_ICON : NOT_DONE_ICON} {text}
            </Text>
        </TouchableOpacity>
    );
};

// Styles for the app.
const styles = StyleSheet.create({
    todo: {
        borderRadius: 8,
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#ffd',
    },
    done: {
        backgroundColor: '#dfd',
    },
    todoText: {
        fontSize: 20,
    },
});
