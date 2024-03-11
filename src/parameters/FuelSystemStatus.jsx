import { useContext } from "react";
import React from "react";

const FuelSystemStatus = ({ children }) => {
  const variablesInObject = useContext(AppContext);
  return (
    <div className=" my-4 mx-6  border-[#233163] border-4 rounded-2xl relative md:w-64 md:h-60 lg:w-72 xl:w-96 xl:h-[272px] flex flex-col justify-center">
      {children}
      <h1 className="text-center mt-3  text-base md:text-lg lg:text-xl font-semibold">
        Fuel System Status
      </h1>
      <h1 className="px-4 py-2 text-base md:text-lg lg:text-xl mb-2 text-center">
        {/* Closed loop, using oxygen sensor feedback to determine fuel mix */}
      </h1>
    </div>
  );
};

export default FuelSystemStatus;
