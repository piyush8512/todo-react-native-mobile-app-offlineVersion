import { createHomeStyles } from "@/assets/styles/home.style";
import ToDoItem from "@/components/ToDoItem";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  Keyboard,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ToDoType = {
  id: number;
  title: string;
  isDone: boolean;
  description?: string;
};

export default function Index() {
  const { colors, toggleDarkMode, isDarkMode } = useTheme();
  const homestyles = createHomeStyles(colors);
  const router = useRouter();
  const [todos, setTodos] = useState<ToDoType[]>([]);
  const [oldTodos, setOldTodos] = useState<ToDoType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [showDescModal, setShowDescModal] = useState(false);
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [descModalContent, setDescModalContent] = useState<ToDoType | null>(
    null
  );

  const getTodos = async () => {
    try {
      const todos = await AsyncStorage.getItem("my-todo");
      if (todos !== null) {
        setTodos(JSON.parse(todos));
        setOldTodos(JSON.parse(todos));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const newTodos = todos.filter((todo) => todo.id !== id);
      await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));
      setTodos(newTodos);
      setOldTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDone = async (id: number) => {
    try {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.isDone = !todo.isDone;
        }
        return todo;
      });
      await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));
      setTodos(newTodos);
      setOldTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = (query: string) => {
    if (query == "") {
      setTodos(oldTodos);
    } else {
      const filteredTodos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(query.toLowerCase())
      );
      setTodos(filteredTodos);
    }
  };

  const editTodo = async () => {
    try {
      if (editTodoId === null) return;
      if (!newTitle.trim()) {
        alert("Please enter a title");
        return;
      }
      const updatedTodos = todos.map((todo) =>
        todo.id === editTodoId
          ? { ...todo, title: newTitle, description: newDescription }
          : todo
      );
      setTodos(updatedTodos);
      setOldTodos(updatedTodos);
      await AsyncStorage.setItem("my-todo", JSON.stringify(updatedTodos));
      setNewTitle("");
      setNewDescription("");
      setEditTodoId(null);
      setShowAddModal(false);
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async () => {
    try {
      if (!newTitle.trim()) {
        alert("Please enter a title");
        return;
      }
      const newTodo = {
        id: Math.random(),
        title: newTitle,
        isDone: false,
        description: newDescription,
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      setOldTodos(updatedTodos);
      await AsyncStorage.setItem("my-todo", JSON.stringify(updatedTodos));
      setNewTitle("");
      setNewDescription("");
      setShowAddModal(false);
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
    onSearch(searchQuery);
  }, [searchQuery]);

  return (
    <SafeAreaView style={homestyles.container}>
      <View style={homestyles.header}>
        <TouchableOpacity onPress={toggleDarkMode} style={{ marginRight: 10 }}>
          <Ionicons
            name={isDarkMode ? "sunny" : "moon"}
            size={26}
            color={colors.text}
          />
        </TouchableOpacity>

      </View>

      <View style={homestyles.searchBar}>
        <Ionicons name="search" size={24} color={"#333"} />
        <TextInput
          placeholder="Search"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          style={homestyles.searchInput}
          clearButtonMode="always"
            placeholderTextColor={isDarkMode ? "#fff" : "#333"} 
          
        />
      </View>

      <FlatList
        data={[...todos].reverse()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ToDoItem
            todo={item}
            deleteTodo={deleteTodo}
            handleDone={handleDone}
            onShowDescription={() => {
              router.push({
                pathname: "/DescriptionScreen",
                params: { id: item.id.toString() },
              });
            }}
            onEdit={(todo) => {
              setEditTodoId(todo.id);
              setNewTitle(todo.title);
              setNewDescription(todo.description || "");
              setShowAddModal(true);
            }}
          />
        )}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        style={homestyles.fab}
        onPress={() => setShowAddModal(true)}
      >
        <Ionicons name="add" size={34} color={"#fff"} />
      </TouchableOpacity>

      {/* Add Todo Modal */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setShowAddModal(false);
          setEditTodoId(null);
          setNewTitle("");
          setNewDescription("");
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setShowAddModal(false);
            setEditTodoId(null);
            setNewTitle("");
            setNewDescription("");
          }}
        >
          <View style={homestyles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={homestyles.modalContent}>
                <Text style={homestyles.modalTitle}>
                  {editTodoId !== null ? "Edit ToDo" : "Add New ToDo"}
                </Text>
                <TextInput
                  placeholder="Title"
                  value={newTitle}
                  onChangeText={setNewTitle}
                  style={homestyles.modalInput}
                />
            
                <TouchableOpacity
                  style={homestyles.modalSaveButton}
                  onPress={editTodoId !== null ? editTodo : addTodo}
                >
                  <Text style={homestyles.modalSaveButtonText}>
                    {editTodoId !== null ? "Update" : "Save"}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Description Modal */}
      <Modal
        visible={showDescModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDescModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowDescModal(false)}>
          <View style={homestyles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={homestyles.modalContent}>
                <Text style={homestyles.descModaltext}>
                  {descModalContent?.title}
                </Text>
                <Text style={homestyles.descModalDescription}>
                  {descModalContent?.description || "No description"}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}
