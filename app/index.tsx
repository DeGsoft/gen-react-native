import { ClearTodos } from '@/components/clear-todos';
import { NewTodo } from '@/components/new-todo';
import { NewTodoForm } from '@/components/new-todo-form';
import { Todos } from '@/components/todos';
import { TITLE_VALUES, TODO_TABLE } from '@/services/database/database';
import {
  StyleSheet, Text,
  View
} from "react-native";
import {
  useHasTable,
  useValue
} from 'tinybase/ui-react';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.heading}>{useValue(TITLE_VALUES)}</Text>
      {/* <NewTodo /> */}
      <NewTodoForm />
      <Todos />
      <ClearTodos show={useHasTable(TODO_TABLE)}/>
    </View>
  );
}

// Styles for the app.
const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
