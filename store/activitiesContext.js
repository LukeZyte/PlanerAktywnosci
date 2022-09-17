import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ActivitiesContext = createContext({
  activities: [],
  addActivity: (newActivity) => {},
  deleteActivity: (id) => {},
  updateActivity: (id, updateActivity) => {},
});

function ActivitiesContextProvider(props) {
  //AsyncStorage
  const getActivitiesFromStore = async () => {
    try {
      const result = await AsyncStorage.getItem("@activitiesKey");
      if (result !== null) {
        setActivities(JSON.parse(result));
      }
    } catch (error) {
      Alert.alert(error);
    }
  };
  const setActivitiesStore = async (data) => {
    try {
      await AsyncStorage.setItem("@activitiesKey", JSON.stringify(data));
    } catch (error) {
      Alert.alert(error);
    }
  };

  useEffect(() => {
    getActivitiesFromStore();
  }, []);
  //
  const [activities, setActivities] = useState([]);

  function addActivity(newActivity) {
    setActivities((prevState) =>
      [newActivity, ...prevState].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      )
    );

    // AsyncStorage
    const data = [newActivity, ...activities].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    setActivitiesStore(data);
  }
  function deleteActivity(id) {
    const changedActivities = activities.filter(
      (activity) => activity.id !== id
    );
    setActivities(changedActivities);

    // AsyncStorage
    setActivitiesStore(changedActivities);
  }
  function updateActivity(id, updatedActivity) {
    const currentActivities = [...activities];
    const selectedIndex = activities.findIndex((element) => element.id === id);
    const updatedItem = {
      ...currentActivities[selectedIndex],
      ...updatedActivity,
    };
    currentActivities[selectedIndex] = updatedItem;
    const sortedResult = currentActivities.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    setActivities(sortedResult);

    // AsyncStorage
    setActivitiesStore(sortedResult);
  }

  const value = {
    activities: activities,
    addActivity: addActivity,
    deleteActivity: deleteActivity,
    updateActivity: updateActivity,
  };

  return (
    <ActivitiesContext.Provider value={value}>
      {props.children}
    </ActivitiesContext.Provider>
  );
}

export default ActivitiesContextProvider;
