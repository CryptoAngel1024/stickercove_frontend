import { Provider } from "react-redux";
import { store } from "redux/ConfigureStore";

export const App = (children) => {
  return <Provider store={store}>{children}</Provider>;
};
