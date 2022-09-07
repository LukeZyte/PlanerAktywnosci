import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Card from "./UI/Card";

function CategoriesModal() {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <Modal transparent={true} visible={modalVisible}>
      <View style={styles.modalContainer}>
        <Card style={styles.card}>
          <Text style={styles.title}>Wybór kategorii</Text>
          <FlatList />
        </Card>
      </View>
    </Modal>
  );
}

export default CategoriesModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    width: 300,
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
