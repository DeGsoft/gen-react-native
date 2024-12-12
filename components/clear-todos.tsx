import { getLocalizedText } from "@/languages/languages";
import { TODO_TABLE } from "@/services/database/database";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDelTableCallback } from "tinybase/ui-react";

// A button component to delete all the todos, only shows when there are some.
export const ClearTodos = ({ show, onPress }) => {
    const delTable = useDelTableCallback(TODO_TABLE);
    const handlePress = () => {
        delTable();
        onPress();
    }
    return show ? (
        <TouchableOpacity onPress={handlePress}>
            <Text style={styles.clearTodos}>{getLocalizedText('clear_all')}</Text>
        </TouchableOpacity>
    ) : null;
};

const styles = StyleSheet.create({
    clearTodos: {
        margin: 16,
        flex: 0,
        textAlign: 'center',
        fontSize: 16,
    },
});