import { useEffect, createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import "./App.css";

import Home from "./Home";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import Diagnostics from "./pages/Diagnostics";
import SignIn from "./SignIn";
import useHyperbase from "./hooks/useHyperbase";
import ProtectedRoute from "./ProtectedRoute";
import AvailableCars from "./AvailableCars";

export const HyperbaseContext = createContext();
export const AppContext = createContext();
export const DtcContext = createContext();

const App = () => {
  const socket = io("http://localhost:4000");
  const [variablesInObject, setVariablesInObject] = useState({});
  const [dtcResponse, setDtcResponse] = useState(null);
  const hyperbase = useHyperbase();

  useEffect(() => {
    console.log("Client mulai menerima data");

    socket.on("data", (msg) => {
      console.log("Ini msg");
      console.log(msg);
      let carData = JSON.parse(msg);
      console.log("Ini carData");
      console.log(carData);
      setVariablesInObject((previousVariablesInObjects) => ({
        // Update variablesInObject
        ...previousVariablesInObjects,
        v_fuelSystemStatus: carData["varFuelSystemStatus"],
        v_engineRpm: parseInt(carData["varEngineRpm"]),
        v_vehicleSpeed: parseInt(carData["varVehicleSpeed"]),
        v_throttlePosition: parseInt(carData["varThrottlePosition"]),
        v_engineCoolantTemperature: parseInt(
          carData["varEngineCoolantTemperature"]
        ),
        v_shortTermFuelTrim: parseInt(carData["varShortTermFuelTrim"]),
        v_longTermFuelTrim: parseInt(carData["varLongTermFuelTrim"]),
        v_intakeAirTemperature: parseInt(carData["varIntakeAirTemperature"]),
        v_massAirFlow: parseInt(carData["varMassAirFlow"]),
        v_catalystTemperature: parseInt(carData["varCatalystTemperature"]),
        v_intakeManifoldPressure: parseInt(
          carData["varIntakeManifoldPressure"]
        ),
      }));
      console.log("Ini carData yang seharusnya salah");
      console.log(carData);
    });

    socket.on("dtcData", (faultCodes) => {
      setDtcResponse(faultCodes);
    });

    // Cleanup function for useEffect
    return () => {
      socket.off("data");
      socket.off("dtcData");
    };
  }, [socket, variablesInObject]);

  useEffect(() => {
    console.log("Percobaan Melihat variablesInObject");
    console.log(variablesInObject);
  }, [variablesInObject]);

  return (
    <HyperbaseContext.Provider value={hyperbase}>
      <AppContext.Provider value={variablesInObject}>
        <DtcContext.Provider value={dtcResponse}>
          <Router>
            <Routes>
              <Route path="/signin" exact element={<SignIn />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/app" exact element={<AvailableCars />} />
                <Route path="/app/:car_id/" exact element={<Home />} />
                <Route
                  path="/app/:car_id/dashboard"
                  exact
                  element={<Dashboard />}
                />
                <Route
                  path="/app/:car_id/details"
                  exact
                  element={<Details />}
                />
                <Route
                  path="/app/:car_id/diagnostics"
                  exact
                  element={<Diagnostics />}
                />
              </Route>
            </Routes>
          </Router>
        </DtcContext.Provider>
      </AppContext.Provider>
    </HyperbaseContext.Provider>
  );
};

export default App;
