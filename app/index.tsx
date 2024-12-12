import { ClearTodos } from '@/components/clear-todos';
import { ListTodo } from '@/components/list-todo';
import { NewTodoForm } from '@/components/new-todo-form';
import { DONE_CELL, TEXT_CELL, TITLE_VALUES, TODO_TABLE } from '@/services/database/database';
import Todos from '@/services/database/todos.model';
import { useState } from 'react';
import {
  StyleSheet, Text,
  View
} from "react-native";
import {
  useHasTable,
  useValue
} from 'tinybase/ui-react';

export default function Index() {
  const getData = () => Todos.all();
  const [data, setData] = useState(getData());
  const refreshData = () => setData(getData());
  const handleSave = (newText) => {
    Todos.add({ [TEXT_CELL]: newText, [DONE_CELL]: false });
    refreshData();
  };
  const handleRemove = (id) => {
    Todos.remove(id);
    refreshData();
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.heading}>{useValue(TITLE_VALUES)}</Text>
      <NewTodoForm onSave={handleSave} />
      <ListTodo data={data} onRemove={handleRemove} />
      <ClearTodos show={useHasTable(TODO_TABLE)} />
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
