import React, { useState } from "react";
import MortgageForm from "./components/MortgageForm";
import MortgageList from "./components/MortgageList";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="app">
      {/* <h1>RMBS Credit Rating System</h1> */}
      <MortgageForm onMortgageAdded={() => setRefresh(!refresh)} />
      <MortgageList refreshTrigger={refresh} />
    </div>
  );
};

export default App;
