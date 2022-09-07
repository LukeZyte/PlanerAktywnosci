import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

function CategoryItem(props) {
  let categoryIcon = <Entypo name="cross" size={24} color={props.color} />;

  switch (props.icon) {
    case "book-open":
      categoryIcon = (
        <FontAwesome5 name="book-open" size={20} color={props.color} />
      );
      break;
    case "file":
      categoryIcon = <FontAwesome name="file" size={20} color={props.color} />;
      break;
    case "graduation-cap":
      categoryIcon = (
        <FontAwesome5 name="graduation-cap" size={20} color={props.color} />
      );
      break;
    case "chart-pie":
      categoryIcon = (
        <FontAwesome5 name="chart-pie" size={20} color={props.color} />
      );
      break;
    case "star":
      categoryIcon = <AntDesign name="star" size={20} color={props.color} />;
      break;
  }

  function categoryPressHandler() {
    props.onSetModalVisible(false);
    props.onSetSelectedCategoryId(props.id);
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={categoryPressHandler}
        android_ripple={{ color: GlobalStyles.colors.contentBg400 }}
      >
        <View style={styles.innerContainer}>
          <View style={styles.left}>{categoryIcon}</View>
          <View style={styles.right}>
            <Text style={styles.categoryText}>{props.name}</Text>
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
    borderRadius: GlobalStyles.border.radius,
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
