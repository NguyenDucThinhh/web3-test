import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import Headers from "./components/header";
import WithdrawHistory from "./components/withdrawHistory";
import { store } from "./redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Transfer from "./components/transfer";
import Allowance from "./components/allowance";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <SnackbarProvider>
          <Headers />
          <Switch>
            <Route exact path="/transfer">
              <Transfer />
            </Route>
            <Route exact path="/allowance">
              <Allowance />
            </Route>
          </Switch>
          <WithdrawHistory />
        </SnackbarProvider>
      </Router>

    </Provider>
  );
}
