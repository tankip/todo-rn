import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import Header from "./components/Header";
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";

const App = () => {
    const [todos, setTodos] = useState([
        { key: "1", text: "Eat" },
        { key: "2", text: "Code" },
        { key: "3", text: "Sleep" },
        { key: "4", text: "Repeat" },
        { key: "5", text: "Netflix" },
    ]);

    const pressHandler = (key) => {
        setTodos((prev) => {
            return prev.filter((todo) => todo.key != key);
        });
    };

    const submitHandler = (text) => {
        if (text.length > 2) {
            Keyboard.dismiss();
            setTodos((prev) => {
                return [{ text, key: Math.random().toString() }, ...prev];
            });
        } else {
            Alert.alert("Oops!", "Todos must be over 2 characters length", [{ text: "Understood", onPress: () => console.log("alert closed") }]);
        }
    };
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}>
            <View style={styles.container}>
                <Header />
                <View style={styles.content}>
                    <AddTodo submitHandler={submitHandler} />
                    <View style={styles.list}>
                        <FlatList data={todos} renderItem={({ item }) => <TodoItem item={item} pressHandler={pressHandler} />} />
                    </View>
                </View>
                <StatusBar style='auto' />
            </View>
        </TouchableWithoutFeedback>
    );
};
export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        flex: 1,
        padding: 40,
    },
    list: {
        flex: 1,
        marginTop: 20,
    },
});
