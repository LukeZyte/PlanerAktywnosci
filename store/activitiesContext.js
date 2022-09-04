import { createContext, useState } from "react";
import { Alert } from "react-native";

export const ActivitiesContext = createContext({
  activities: [],
  addActivity: (newActivity) => {},
  deleteActivity: (id) => {},
  updateActivity: (id, updateActivity) => {},
});

function ActivitiesContextProvider(props) {
  const initialTest = [
    {
      id: "t1",
      title: "Kolokwium z AMIAL",
      description: `Nauczyc sie trzeba:
    całek
    macierzy
    innych trudnych rzeczy
    Notatki sa w zeszycie i mozna korzysatc z kalkulatora!`,
      date: new Date(),
    },
    {
      id: "t2",
      title: "POMOC TACIE W OGRODZIE",
      description: `Łukasz debilu nie zapomnij se popracowac fizycznie troche`,
      date: new Date("2022-12-01"),
    },
    {
      id: "t3",
      title: "Egzamin z fizyki",
      description: `Bardzo trudny egzamin z Jerzym Bodzenta`,
      date: new Date("2022-09-01"),
    },
    {
      id: "t4",
      title: "Progress na ławeczce",
      description: `Wycisnąć albo więcej\nalbo więcej powtórzeń`,
      date: new Date("2022-09-03"),
    },
    {
      id: "t5",
      title: "Porobic trening cardio jakis",
      description: "",
      date: new Date("2022-09-05"),
    },
  ];

  const [activities, setActivities] = useState(initialTest);

  function addActivity(newActivity) {
    setActivities((prevState) =>
      [newActivity, ...prevState].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      )
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
