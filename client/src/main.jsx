import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider, useSelector } from "react-redux";
import { appStore } from "./app/store";
import { Toaster } from "./components/ui/sonner";
import { useLoadUserQuery } from "./features/api/authApi";
import LoadingSpinner from "./components/LoadingSpinner";

const Custom = ({ children }) => {
  const { user, isAuthenticated } = useSelector((store) => store.auth);
  // Always try to load user on mount to check for existing session
  // Use refetch to ensure fresh data
  const { isLoading, isError, error } = useLoadUserQuery(undefined, {
    skip: false,
    refetchOnMountOrArgChange: true, // Always refetch on mount
  });
  
  // If we have a user and are authenticated, don't show loading spinner
  if (user && isAuthenticated) {
    return <>{children}</>;
  }
  
  // If loading, show spinner
  if (isLoading) {
    return <LoadingSpinner/>;
  }
  
  // If error (like 401), user is not authenticated, show app
  // The error should have already cleared the user state in onQueryStarted
  return <>{children}</>;
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={appStore}>
      <Custom>
        <App />
        <Toaster />
      </Custom>
    </Provider>
  </StrictMode>
);
