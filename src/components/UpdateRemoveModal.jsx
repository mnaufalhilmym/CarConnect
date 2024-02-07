import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

// import ThrottlePosition from "../parameters/ThrottlePosition";
// import EngineCoolantTemperature from "../parameters/EngineCoolantTemperature";
// import EngineRPM from "../parameters/EngineRPM";
// import FuelSystemStatus from "../parameters/FuelSystemStatus";
// import VehicleSpeed from "../parameters/VehicleSpeed";
// import ShortTermFuelTrim from "../parameters/ShortTermFuelTrim";
// import LongTermFuelTrim from "../parameters/LongTermFuelTrim";
// import IntakeAirTemperature from "../parameters/IntakeAirTemperature";
// import OxygenSensorBank1Sensor1 from "../parameters/OxygenSensorBank1Sensor1";
// import OxygenSensorBank2Sensor2 from "../parameters/OxygenSensorBank2Sensor2";
// import MassAirFlow from "../parameters/MassAirFlow";
// import CatalystTemperature from "../parameters/CatalystTemperature";
// import FuelType from "../parameters/FuelType";
// import EngineOilTemperature from "../parameters/EngineOilTemperature";
// import IntakeManifoldPressure from "../parameters/IntakeManifoldPressure";

// import { useState } from "react";

const UpdateRemoveModal = ({ selectedComponents }) => {
  const handleClick = async () => {
    const { value: parameter } = await Swal.fire({
      title: "Update or Remove",
      background: "#F1F1FB",
      position: "bottom",
      icon: "question",
      confirmButtonColor: "#233163",
      confirmButtonText: "Update",
      denyButtonText: "Remove",
      color: "#233163",
      input: "select",
      inputOptions: {
        Strings: {
          fuelsystemstatus: "Fuel System Status",
          fueltype: "Fuel Type",
        },
        Gauges: {
          vehiclespeed: "Vehicle Speed",
          throttleposition: "Throttle Position",
          enginecoolanttemperature: "Engine Coolant Temperature",
          catalysttemperature: "Catalyst Temperature",
          engineoiltemperature: "Engine Oil Temperature",
        },
        Lines: {
          enginerpm: "Engine RPM",
          shorttermfueltrim: "Short Term Fuel Trim",
          longtermfueltrim: "Long Term Fuel Trim",
        },
        Numerics: {
          intakeairtemperature: "Intake Air Temperature",
          oxygensensorbank1sensor1: "Oxygen Sensor Bank 1 Sensor 1",
          oxygensensorbank2sensor2: "Oxygen Sensor Bank 2 Sensor 2",
          massairflow: "Mass Air Flow",
          intakemaniholdpressure: "Intake Manihold Pressure",
        },
      },
      inputPlaceholder: "Select a parameter",
      showDenyButton: true,
      showCancelButton: true,
    });
    console.log(parameter);
  };

  return (
    <div>
      <button className="absolute top-0 right-0" onClick={handleClick}>
        <FontAwesomeIcon
          className="p-3.5 text-lg"
          icon={faPenToSquare}
          style={{ color: "#233163" }}
        />
      </button>
    </div>
  );
};

// const ParameterMap = {
//   fuelsystemstatus: FuelSystemStatus,
//   throttleposition: ThrottlePosition,
//   enginecoolanttemperature: EngineCoolantTemperature,
//   enginerpm: EngineRPM,
//   vehiclespeed: VehicleSpeed,
//   shorttermfueltrim: ShortTermFuelTrim,
//   longtermfueltrim: LongTermFuelTrim,
//   intakeairtemperature: IntakeAirTemperature,
//   oxygensensorbank1sensor1: OxygenSensorBank1Sensor1,
//   oxygensensorbank2sensor2: OxygenSensorBank2Sensor2,
//   massairflow: MassAirFlow,
//   catalysttemperature: CatalystTemperature,
//   fueltype: FuelType,
//   engineoiltemperature: EngineOilTemperature,
//   intakemaniholdpressure: IntakeManifoldPressure,
// };

export default UpdateRemoveModal;
