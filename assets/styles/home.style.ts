import { ColorScheme } from "@/hooks/useTheme";
import { Platform, StyleSheet } from "react-native";

export const createHomeStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
  
      backgroundColor: colors.bg,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    searchBar: {
      flexDirection: "row",
      backgroundColor: colors.surface,
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: Platform.OS === 'ios' ? 16 : 8,
      borderRadius: 10,
      gap: 10,
      marginBottom: 20,
      color: colors.text,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
    },
    todoContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: colors.surface,
      padding: 16,
      borderRadius: 10,
      marginBottom: 20,
    },
    todoInfoContainer: {
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
    },
    todoText: {
      fontSize: 16,
      color: colors.text,
    },
    todoActions: {
      flexDirection: "row",
      alignItems: "center",
    },
    footer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      bottom: 20,
    },
    newTodoInput: {
      flex: 1,
      backgroundColor: colors.surface,
      padding: 16,
      borderRadius: 10,
      fontSize: 16,
      color: colors.text,
    },
    addButton: {
      backgroundColor: colors.primary,
      padding: 8,
      borderRadius: 10,
      marginLeft: 20,
    },
    descModaltext: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 12,
      color: colors.text,
    },
    descModalDescription: { color: colors.textMuted, fontSize: 16 },
    fab: {
      position: "absolute",
      bottom: 30,
      right: 30,
      backgroundColor: colors.primary,
      borderRadius: 30,
      width: 60,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
      elevation: 5,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      width: "90%",
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 10,
      elevation: 10 ,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 12,
      marginTop: 10,
      color: colors.text,
    },
    modalInput: {
      borderWidth: 1,
      borderColor: colors.bg,
      borderRadius: 8,
      padding: 10,
      marginBottom: 12,
      fontSize: 16,
      color: colors.text,
      backgroundColor: colors.bg,
    },
    modalSaveButton: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: "center",
    },
    modalSaveButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
  });

export default createHomeStyles;