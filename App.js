import Navigation from "./Navigation";
import ActivitiesContextProvider from "./store/activitiesContext";
import ActCategoriesContextProvider from "./store/activityCategoriesContext";
import ThemeContextProvider from "./store/themeContext";

export default function App() {
  return (
    <ThemeContextProvider>
      <ActCategoriesContextProvider>
        <ActivitiesContextProvider>
          <Navigation />
        </ActivitiesContextProvider>
      </ActCategoriesContextProvider>
    </ThemeContextProvider>
  );
}
