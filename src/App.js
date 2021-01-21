import { React } from "react";
import { BrowserRouter, Route} from "react-router-dom";
import DailyTaskComponent from "./Components/DailyTaskComponent";
import CreatingPlanComponent from "./Components/CreatingPlanComponent";
import HeaderComponent from "./Components/HeaderComponent";

function App() {
  return (
    <>
      <HeaderComponent />
      <BrowserRouter>
        <Route path="/" exact component={CreatingPlanComponent} />
        <Route path="/create/daily" component={DailyTaskComponent} />
      </BrowserRouter>
    </>
  );
}

export default App;
