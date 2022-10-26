import { useContext, useLayoutEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import ActivityItem from "./ActivityItem";
import { ActivitiesContext } from "../../store/activitiesContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ShowExpiredActivitiesButton from "./showExpiredActivitiesButton";
import { useTheme } from "@react-navigation/native";

function ActivitiesList() {
  const activitiesCtx = useContext(ActivitiesContext);
  const { colors } = useTheme();

  let today = new Date();
  let activeActivities = activitiesCtx.activities.filter((activity) => {
    return (
      Math.ceil(
        (new Date(activity.date).getTime() - new Date(today).getTime()) /
          (1000 * 3600 * 24)
      ) >= 0
    );
  });
  let oldActivities = activitiesCtx.activities.filter(
    (activity) =>
      Math.ceil(
        (new Date(activity.date).getTime() - new Date(today).getTime()) /
          (1000 * 3600 * 24)
      ) < 0
  );

  useLayoutEffect(() => {
    const getHideOld = async () => {
      try {
        const value = await AsyncStorage.getItem("@hideOldKey");
        if (value !== null) {
          if (value === "true") {
            setHideOld(true);
          } else {
            setHideOld(false);
          }
        }
      } catch (error) {
        Alert.alert(error);
      }
    };

    getHideOld();
  }, []);

  const [hideOld, setHideOld] = useState(true);

  let oldActivitiesList = (
    <View style={styles.listContainer}>
      {/* <FlatList
        keyExtractor={(item) => {
          return item.id;
        }}
        data={oldActivities}
        renderItem={(itemData) => {
          return <ActivityItem {...itemData.item} index={itemData.index} />;
        }}
      /> */}
      {oldActivities.reverse().map((itemData) => {
        return (
          <ActivityItem
            key={itemData.id}
            {...itemData}
            index={itemData.index}
            titleStyle={{
              textDecorationLine: "line-through",
              color: colors.contentBg600,
            }}
          />
        );
      })}
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.listContainer}>
        {/* <FlatList
          keyExtractor={(item, index) => {
            return item.id;
          }}
          data={activeActivities}
          renderItem={(itemData) => {
            return <ActivityItem {...itemData.item} index={itemData.index} />;
          }}
        /> */}
        {activeActivities.map((itemData) => {
          return (
            <ActivityItem
              key={itemData.id}
              {...itemData}
              index={itemData.index}
            />
          );
        })}
      </View>
      {activeActivities.length === 0 && (
        <Text style={[styles.message, { color: colors.contentBg600 }]}>
          Brak zaplanowanych aktywności
        </Text>
      )}
      {oldActivities.length > 0 && (
        <ShowExpiredActivitiesButton
          hideOld={hideOld}
          setHideOld={setHideOld}
        />
      )}
      {!hideOld && oldActivities && oldActivitiesList}
      {/* {!hideOld && oldActivities.length === 0 && (
        <TextUI style={styles.message}>Brak zakończonych aktywności</TextUI>
      )} */}
    </ScrollView>
  );
}

export default ActivitiesList;

const styles = StyleSheet.create({
  listContainer: {
    marginHorizontal: 0,
    marginVertical: 8,
  },
  buttonText: {
    marginLeft: 8,
    fontWeight: "bold",
  },
  message: {
    textAlign: "center",
    marginBottom: 16,
  },
});
