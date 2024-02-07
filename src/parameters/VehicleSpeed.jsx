import GaugeComponent from "react-gauge-component";
import UpdateRemoveModal from "../components/UpdateRemoveModal";

const VehicleSpeed = () => {
  const renameUnit = (value) => {
    return value.toFixed(0) + " km/h";
  };

  return (
    <div className=" my-4 mx-6 border-[#233163] border-4 rounded-2xl relative">
      <UpdateRemoveModal />
      <h1 className="text-center mt-3  text-base font-semibold">
        Vehicle Speed
      </h1>
      <GaugeComponent
        arc={{
          nbSubArcs: 150,
          colorArray: ["#5BE12C", "#F5CD19", "#EA4228"],
          width: 0.3,
          padding: 0.003,
        }}
        labels={{
          valueLabel: {
            fontSize: 40,
            formatTextValue: renameUnit,
          },
          tickLabels: {
            type: "outer",
            ticks: [
              { value: 100 },
              { value: 200 },
              { value: 300 },
              { value: 400 },
              { value: 500 },
              { value: 600 },
              { value: 700 },
              { value: 800 },
              { value: 900 },
              { value: 1000 },
              { value: 1500 },
              { value: 2000 },
              { value: 2500 },
              { value: 3000 },
            ],
            valueConfig: {
              formatTextValue: renameUnit,
            },
          },
        }}
        value={1200}
        maxValue={3000}
      />
    </div>
  );
};

export default VehicleSpeed;
