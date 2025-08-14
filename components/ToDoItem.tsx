import { createHomeStyles } from "@/assets/styles/home.style";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type ToDoType = {
  id: number;
  title: string;
  isDone: boolean;
  description?: string;
};

type Props = {
  todo: ToDoType;
  deleteTodo: (id: number) => void;
  handleDone: (id: number) => void;
  onShowDescription: () => void;
  onEdit: (todo: ToDoType) => void;
};

const ToDoItem: React.FC<Props> = ({
  todo,
  deleteTodo,
  handleDone,
  onShowDescription,
  onEdit,
}) => {
  const { colors } = useTheme();
  const homestyles = createHomeStyles(colors);

  return (
    <TouchableOpacity onPress={onShowDescription} activeOpacity={0.8}>
      <View style={homestyles.todoContainer}>
        <View style={homestyles.todoInfoContainer}>
          <Checkbox
            value={todo.isDone}
            onValueChange={() => handleDone(todo.id)}
            color={todo.isDone ? colors.primary : undefined}
          />
          <Text
            style={[
              homestyles.todoText,
              todo.isDone && {
                textDecorationLine: "line-through",
                color: colors.textMuted,
              },
            ]}
          >
            {todo.title}
          </Text>
        </View>
        <View style={homestyles.todoActions}>
          <TouchableOpacity
            onPress={() => onEdit(todo)}
            style={{ marginRight: 4 }}
          >
            <Ionicons name="create-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
            <Ionicons name="trash" size={24} color={colors.danger} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ToDoItem;
