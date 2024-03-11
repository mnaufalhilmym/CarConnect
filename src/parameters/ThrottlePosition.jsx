import GaugeComponent from "react-gauge-component";

const ThrottlePosition = ({ children }) => {
  return (
    <div className=" my-4 mx-6 border-[#233163] border-4 rounded-2xl relative md:w-64 md:h-60 lg:w-72 xl:w-96 xl:h-[272px] flex flex-col justify-center">
      {children}
      <h1 className="text-center mt-3 text-base md:text-lg lg:text-xl font-semibold">
        Throttle Position
      </h1>
      <GaugeComponent
        className=""
        arc={{
          subArcs: [
            {
              limit: 10,
              color: "#5BE12C",
              showTick: true,
            },
            {
              limit: 20,
              color: "#5BE12C",
              showTick: true,
            },
            {
              limit: 30,
              color: "#fcf403",
              showTick: true,
            },
            {
              limit: 40,
              color: "#fcf403",
              showTick: true,
            },
            {
              limit: 50,
              color: "#F5CD19",
              showTick: true,
            },
            {
              limit: 60,
              color: "#F5CD19",
              showTick: true,
            },
            {
              limit: 70,
              color: "#F58B19",
              showTick: true,
            },
            {
              limit: 80,
              color: "#F58B19",
              showTick: true,
            },
            {
              limit: 90,
              color: "#EA4228",
              showTick: true,
            },
            {
              limit: 100,
              color: "#EA4228",
              showTick: true,
            },
          ],
        }}
        value={25}
      />
    </div>
  );
};

export default ThrottlePosition;
