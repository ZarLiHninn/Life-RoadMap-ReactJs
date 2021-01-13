import { React } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import DailyPlanComponent from "./Components/DailyPlanComponent";
import CreatingPlanComponent from "./Components/CreatingPlanComponent";
import HeaderComponent from "./Components/HeaderComponent";

function App() {
  return (
    <>
      <HeaderComponent />
      <BrowserRouter>
        <Route path="/" exact component={CreatingPlanComponent} />
        <Route path="/create/daily" component={DailyPlanComponent} />
      </BrowserRouter>
    </>
  );
}

export default App;
