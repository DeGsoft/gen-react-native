import { Button, FlatList, StyleSheet, Text, View } from "react-native";

// A list component to show all the todos.
export const ListTodo = ({ data, onRemove }) => {
    console.log('ListTodo', data)
    const renderItem = ({ item }) =>
        <View style={styles.item}>
            <Text style={styles.todoText}>{item?.text}</Text>
            <Button
                title="-"
                color="red"
                onPress={() => onRemove(item?.id)} />
        </View>;
    return (<View style={styles.container}>
        <FlatList
            data={data}
            renderItem={renderItem}
            style={styles.todos}
        />
    </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    todos: {
        flex: 1,
        marginTop: 16,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    todoText: {
        fontSize: 20,
    },
    clearTodos: {
        margin: 16,
        flex: 0,
        textAlign: 'center',
        fontSize: 16,
    },
});
