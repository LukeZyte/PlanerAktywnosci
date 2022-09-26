import { StyleSheet, View } from "react-native";
import FlatIconButton from "../../UI/FlatIconButton";
import TextUI from "../../UI/TextUI";
import { Ionicons } from "@expo/vector-icons";
import CategoriesModal from "../../Cateories/CategoriesModal";
import { useContext, useState } from "react";
import { ActivityCategoriesContext } from "../../../store/activityCategoriesContext";
import { useTheme } from "@react-navigation/native";

const CategoryPickerForm = ({ selectedCategoryId, setSelectedCategoryId }) => {
  const { colors } = useTheme();

  const actCategoriesCtx = useContext(ActivityCategoriesContext);

  const selectedCategory = actCategoriesCtx.actCategories.find(
    (item) => item.id === selectedCategoryId
  );

  const [categoriesModalVisibility, setCategoriesModalVisibility] =
    useState(false);

  return (
    <FlatIconButton
      onPress={() => setCategoriesModalVisibility(true)}
      style={{
        flexDirection: "row",
      }}
    >
      <View style={styles.sectionContainer}>
        <View style={{ flexDirection: "row" }}>
          <Ionicons name="cube" size={20} color={colors.text} />
          <TextUI style={styles.categoriesLabel}>
            {!selectedCategoryId ? "Wybierz Kategorię" : "Zmień kategorię"}
          </TextUI>
        </View>
        <View>
          <TextUI
            style={[styles.categoryMessageText, { color: colors.primary700 }]}
          >
            {selectedCategory ? selectedCategory.name : "Nie wybrano"}
          </TextUI>
        </View>
      </View>
      <CategoriesModal
        onSetModalVisibility={setCategoriesModalVisibility}
        onModalVisibility={categoriesModalVisibility}
        onSetSelectedCategoryId={setSelectedCategoryId}
      />
    </FlatIconButton>
  );
};

export default CategoryPickerForm;

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: "space-between",
  },
  categoriesLabel: {
    fontSize: 16,
    marginLeft: 8,
    textAlignVertical: "center",
  },
  categoryMessageText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
