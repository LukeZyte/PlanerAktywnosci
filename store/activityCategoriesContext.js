import { createContext, useState } from "react";

export const ActivityCategoriesContext = createContext({
  actCategories: [],
});

const DUMMY_CATEGORIES = [
  { id: "c1", name: "Kartkówka", color: "#2196F3", icon: "file" },
  { id: "c2", name: "Kolokwium", color: "#FF9800", icon: "book-open" },
  { id: "c3", name: "Egzamin", color: "red", icon: "graduation-cap" },
  { id: "c4", name: "Projekt", color: "#00d339", icon: "chart-pie" },
  { id: "c5", name: "Inne", color: "#ff66ff", icon: "star" },
  // { id: "none", name: "Brak", color: "red", icon: null },
];

function ActCategoriesContextProvider({ children }) {
  const [actCategories, setActCategories] = useState(DUMMY_CATEGORIES);

  const value = {
    actCategories: actCategories,
  };

  return (
    <ActivityCategoriesContext.Provider value={value}>
      {children}
    </ActivityCategoriesContext.Provider>
  );
}

export default ActCategoriesContextProvider;
