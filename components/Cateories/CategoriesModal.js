import { useContext, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { ActivityCategoriesContext } from "../../store/activityCategoriesContext";
import CategoryItem from "./CategoryItem";
import Card from "../UI/Card";
import FlatButton from "../UI/FlatButton";
import ModalWindow from "../UI/ModalWindow";
import TextUI from "../UI/TextUI";
import { useTheme } from "@react-navigation/native";

function CategoriesModal(props) {
  const { colors } = useTheme();
  const actCategoriesCtx = useContext(ActivityCategoriesContext);

  return (
    <ModalWindow
      onSetModalVisible={props.onSetModalVisibility}
      onModalVisible={props.onModalVisibility}
    >
      <Card style={styles.card}>
        <TextUI style={styles.title}>Wybór kategorii</TextUI>
        <FlatList
          style={styles.list}
          data={[
            ...actCategoriesCtx.actCategories,
            { id: "none", name: "Brak", color: "black", icon: null },
          ]}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => {
            return (
              <CategoryItem
                {...itemData.item}
                onSetSelectedCategoryId={props.onSetSelectedCategoryId}
                onSetModalVisible={props.onSetModalVisibility}
              />
            );
          }}
        />
        <FlatButton
          onPress={props.onSetModalVisibility}
          textStyle={{ color: colors.primary700 }}
        >
          Anuluj
        </FlatButton>
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
  list: {
    marginVertical: 16,
    width: "100%",
  },
});
