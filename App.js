import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  AppRegistry,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class App extends React.Component {

  state = {
    Logo: "",
    todoInput: "",
    todoList: [],
    id: 0
  };

  onPressSubmit = () => {
    if (this.state.todoInput === "") {
      return;
    }
    this.setState({
      todoList: this.state.todoList.concat({
        id: this.state.id,
        todo: this.state.todoInput
      }),
      todoInput: "",
      id: this.state.id + 1
    });


  }

  componentDidMount() {
    this.setState({
      Logo: "Todo List!"
    })
  }

  changeInput = (text) => {
    this.setState({
      todoInput: text
    });
  }

  handleRemove = (id) => {
    const { todoList } = this.state;
    this.setState({
      todoList: todoList.filter(
        (todo, i) => {
          return todo.id !== id
        }
      )
    });
  }

  dismissKeyboard = () => {
    Keyboard.dismiss();
  }


  render() {
    const { onPressSubmit, changeInput, handleRemove, dismissKeyboard } = this;
    const { todoInput, todoList } = this.state;
    const todoListRender = todoList.map(
      (todo, i) => {
        return (
          <View key={i} style={styles.TodoWrapper}>
            <Text style={styles.TodoText}>{todo.todo}</Text>
            <Text id={todo.id} ref="RemoveText" onPress={(e) => {
              e.stopPropagation();
              handleRemove(todo.id);
            }} style={styles.RemoveText}>X</Text>
          </View>
        );
      }
    );
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.logo}>{this.state.Logo}</Text>
        </View>
        <View style={styles.InputForm}>
          <TextInput
            onSubmitEditing={Keyboard.dismiss}
            style={styles.Input}
            placeholder="입력하기"
            value={todoInput}
            onChangeText={changeInput}
          />
        </View>
        <View style={styles.ButtonWrapper}>
          <Button
            title="할일 추가"
            style={styles.AddButton}
            onPress={onPressSubmit}></Button>
        </View>
        <View style={styles.TodoList}>
          <View style={styles.TextWrapper}>
            <ScrollView style={styles.Scroll}>
              {/* <View style={styles.TodoWrapper}>
              <Text style={styles.TodoText}>할일 이다.</Text>
            </View> */}
              {
                todoListRender
              }
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  topContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d6336c",
    height: 90,
  },
  logo: {
    fontSize: 25,
    fontWeight: "800",
    color: "white"
  },
  InputForm: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    display: "flex",
    backgroundColor: "#e9ecef",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  Input: {
    width: "95%",
    height: "90%",
    fontSize: 30
  },
  ButtonWrapper: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 8,
    backgroundColor: "#f783ac",
    borderRadius: 10
  },
  AddButton: {
    color: "white"
  },
  TodoList: {
    backgroundColor: "#dee2e6",
    height: "70%",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column"
  },
  TextWrapper: {
    padding: 30
  },
  TodoWrapper: {
    backgroundColor: "#ced4da",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center"
  },
  TodoText: {
    fontSize: 20,
    fontWeight: "500"

  },
  RemoveText: {
    marginLeft: "auto",
    fontWeight: "800"
  },
  Scroll: {
    height: "100%"
  }
});
