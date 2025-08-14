import { createHomeStyles } from "@/assets/styles/home.style";
import useTheme from "@/hooks/useTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Text, TextInput, TouchableWithoutFeedback, View } from "react-native";

type ToDoType = {
  id: number;
  title: string;
  isDone: boolean;
  description?: string;
};

export default function DescriptionScreen() {
  const { colors, isDarkMode } = useTheme();
  const homestyles = createHomeStyles(colors);
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [todo, setTodo] = useState<ToDoType | null>(null);
  const [desc, setDesc] = useState("");
  const inputRef = useRef<TextInput>(null);

  // Fetch todo on mount
  useEffect(() => {
    const fetchTodo = async () => {
      const todosStr = await AsyncStorage.getItem("my-todo");
      if (todosStr) {
        const todos: ToDoType[] = JSON.parse(todosStr);
        const found = todos.find((t) => t.id === Number(id));
        if (found) {
          setTodo(found);
          setDesc(found.description || "");
        }
      }
    };
    fetchTodo();
  }, [id]);


  useEffect(() => {
    return () => {
      if (todo) saveDescription(desc);
    };
  }, [todo, desc]);

  // Save description to AsyncStorage
  const saveDescription = async (newDesc: string) => {
    if (!todo) return;
    const todosStr = await AsyncStorage.getItem("my-todo");
    if (todosStr) {
      let todos: ToDoType[] = JSON.parse(todosStr);
      todos = todos.map((t) =>
        t.id === todo.id ? { ...t, description: newDesc } : t
      );
      await AsyncStorage.setItem("my-todo", JSON.stringify(todos));
    }
  };

  // Save on back
  const handleBack = async () => {
    await saveDescription(desc);
    router.back();
  };

  return (
    <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
      <View style={[homestyles.container, { paddingTop: 40 }]}>
        <Text style={homestyles.modalTitle}>{todo?.title}</Text>
        <TextInput
          ref={inputRef}
          placeholder="Write your notes here..."
          value={desc}
          onChangeText={setDesc}
          style={[homestyles.modalInput]}
          placeholderTextColor={isDarkMode ? "#fff" : "#333"}
          multiline
          autoFocus
          blurOnSubmit={false}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
