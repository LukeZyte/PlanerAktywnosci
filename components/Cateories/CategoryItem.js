import { Pressable, StyleSheet, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import TextUI from "../UI/TextUI";
import { useTheme } from "@react-navigation/native";

function CategoryItem({
  id,
  color,
  name,
  icon,
  onSetModalVisible,
  onSetSelectedCategoryId,
}) {
  let categoryIcon = <Entypo name="cross" size={24} color={color} />;

  switch (icon) {
    case "book-open":
      categoryIcon = <FontAwesome5 name="book-open" size={20} color={color} />;
      break;
    case "file":
      categoryIcon = <FontAwesome name="file" size={20} color={color} />;
      break;
    case "graduation-cap":
      categoryIcon = (
        <FontAwesome5 name="graduation-cap" size={20} color={color} />
      );
      break;
    case "chart-pie":
      categoryIcon = <FontAwesome5 name="chart-pie" size={20} color={color} />;
      break;
    case "flask":
      categoryIcon = <FontAwesome5 name="flask" size={20} color={color} />;
      break;
    case "star":
      categoryIcon = <AntDesign name="star" size={20} color={color} />;
      break;
  }

  function categoryPressHandler() {
    if (id !== "none") {
      onSetSelectedCategoryId(id);
    } else {
      onSetSelectedCategoryId(null);
    }
    onSetModalVisible(false);
  }

  const { colors, border } = useTheme();

  return (
    <View style={[styles.container, { borderRadius: border.radius }]}>
      <Pressable
        onPress={categoryPressHandler}
        android_ripple={{ color: colors.contentBg400 }}
      >
        <View style={styles.innerContainer}>
          <View style={styles.left}>{categoryIcon}</View>
          <View style={styles.right}>
            <TextUI style={styles.categoryText}>{name}</TextUI>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  innerContainer: {
    flexDirection: "row",
    padding: 12,
  },
  categoryText: {
    fontSize: 16,
  },
  left: {
    flex: 2,
    alignItems: "center",
  },
  right: {
    flex: 3,
  },
});
