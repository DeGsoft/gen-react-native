import { getLocalizedText } from "@/languages/languages";
import { DONE_CELL, TEXT_CELL, TODO_TABLE } from "@/services/database/database";
import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { useAddRowCallback } from "tinybase/ui-react";

// The text input component to add a new todo.
export const NewTodo = () => {
    const [text, setText] = useState('');
    const handleSubmitEditing = useAddRowCallback(
        TODO_TABLE,
        ({ nativeEvent: { text } }) => {
            setText('');
            return { [TEXT_CELL]: text, [DONE_CELL]: false };
        }
    );
    return (
        <TextInput
            value={text}
            onChangeText={(text) => setText(text)}
            onSubmitEditing={handleSubmitEditing}
            placeholder={getLocalizedText('what_do_you_want_to_do_today')}
            style={styles.input}
        />
    );
};

// Styles for the app.
const styles = StyleSheet.create({
    input: {
        borderColor: '#999',
        borderRadius: 8,
        borderWidth: 2,
        flex: 0,
        height: 64,
        marginTop: 16,
        padding: 16,
        fontSize: 20,
    },
});
