import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Card from "./UI/Card";
import ModalWindow from "./UI/ModalWindow";

function CategoriesModal() {
  return (
    <ModalWindow>
      <Card style={styles.card}>
        <Text style={styles.title}>Wybór kategorii</Text>
        <FlatList />
      </Card>
    </ModalWindow>
  );
}

export default CategoriesModal;

const styles = StyleSheet.create({
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
