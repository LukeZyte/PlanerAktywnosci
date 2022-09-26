import { useContext } from "react";
import { FlatList, StyleSheet } from "react-native";
import { ActivityCategoriesContext } from "../../store/activityCategoriesContext";
import CategoryItem from "./CategoryItem";
import Card from "../UI/Card";
import FlatButton from "../UI/FlatButton";
import ModalWindow from "../UI/ModalWindow";
import TextUI from "../UI/TextUI";
import { useTheme } from "@react-navigation/native";

function CategoriesModal({
  onSetModalVisibility,
  onModalVisibility,
  onSetSelectedCategoryId,
}) {
  const { colors } = useTheme();
  const actCategoriesCtx = useContext(ActivityCategoriesContext);

  return (
    <ModalWindow
      onSetModalVisible={onSetModalVisibility}
      onModalVisible={onModalVisibility}
    >
      <Card style={styles.card}>
        <TextUI style={[styles.title, { color: colors.primary }]}>
          Wybór kategorii
        </TextUI>
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
                onSetSelectedCategoryId={onSetSelectedCategoryId}
                onSetModalVisible={onSetModalVisibility}
              />
            );
          }}
        />
        <FlatButton
          onPress={onSetModalVisibility}
          textStyle={{ color: colors.text }}
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  list: {
    marginVertical: 16,
    width: "100%",
  },
});
