import { useContext } from "react";
import { AppContext } from "../App";

const IntakeAirTemperature = ({ carId, children }) => {
  const variablesInObject = useContext(AppContext);
  return (
    <div className=" my-4 mx-6 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.8)] rounded-2xl relative w-64 md:w-64 md:h-60 lg:w-72 xl:w-96 xl:h-[272px] flex flex-col justify-center">
      {children}
      <div className="flex justify-center">
        <h1 className="w-4/5 mt-3 text-base font-semibold text-center md:text-lg lg:text-xl ">
          Intake Air Temperature
        </h1>
      </div>
      <h1 className="px-4 py-2 mb-2 text-base text-center md:text-lg lg:text-xl">
        {variablesInObject[carId]?.v_intakeAirTemperature} °C
      </h1>
    </div>
  );
};

export default IntakeAirTemperature;
