import { StyleSheet, View } from "react-native";
import Card from "../UI/Card";
import ModalWindow from "../UI/ModalWindow";
import TextUI from "../UI/TextUI";
import { useTheme } from "@react-navigation/native";
import FlatButton from "./FlatButton";
import Button from "./Button";

const AlertUI = ({
  onSetModalVisibility,
  onModalVisibility,
  title,
  message,
  cancelText,
  confirmText,
  onConfirm,
  onCancel,
}) => {
  const { colors } = useTheme();

  return (
    <ModalWindow
      onSetModalVisible={onSetModalVisibility}
      onModalVisible={onModalVisibility}
    >
      <Card style={styles.card}>
        <View style={{ alignItems: "center" }}>
          <TextUI style={[styles.title, { color: colors.primary }]}>
            {title}
          </TextUI>
          <TextUI style={styles.text}>{message}</TextUI>
        </View>
        <View style={styles.buttons}>
          <FlatButton onPress={onCancel}>{cancelText}</FlatButton>
          <Button onPress={onConfirm}>{confirmText}</Button>
        </View>
      </Card>
    </ModalWindow>
  );
};

export default AlertUI;

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    // alignItems: "center",
    padding: 16,
    width: 300,
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 36,
  },
  text: {
    marginBottom: 24,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
});
