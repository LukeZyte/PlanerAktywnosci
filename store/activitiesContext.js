import { createContext, useState } from "react";
import { Alert } from "react-native";

export const ActivitiesContext = createContext({
  activities: [],
  addActivity: () => {},
  deleteActivity: () => {},
  updateActivity: () => {},
});

function ActivitiesContextProvider(props) {
  const initialTest = [
    {
      id: "t1",
      title: "Title of Test",
      description: "haha here is a dumb desc",
      date: "2022-09-02",
    },
    {
      id: "t2",
      title: "Title of Test2",
      description: "a dumb desc",
      date: "2022-09-01",
    },
    {
      id: "t3",
      title: "Title of Test3",
      description: "haha",
      date: "2022-09-03",
    },
    {
      id: "t4",
      title: "Title of Test4",
      description: "haha",
      date: "2022-08-29",
    },
  ];

  const [activities, setActivities] = useState(initialTest);

  function addActivity() {
    setActivities((prevState) =>
      [
        {
          id: "t5",
          title: "Added newly Test",
          description: "dumb desc",
          date: "2022-09-01",
        },
        ...prevState,
      ].sort((a, b) => new Date(a.date) - new Date(b.date))
    );
  }
  function deleteActivity(id) {
    const changedActivities = activities.filter(
      (activity) => activity.id !== id
    );
    setActivities(changedActivities);
  }
  function updateActivity(id, updatedActivity) {
    const currentActivities = [...activities];
    const selectedIndex = activities.findIndex((element) => element.id === id);
    const updatedItem = {
      ...currentActivities[selectedIndex],
      ...updatedActivity,
    };
    currentActivities[selectedIndex] = updatedItem;
    setActivities(
      currentActivities.sort((a, b) => new Date(a.date) - new Date(b.date))
    );
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
