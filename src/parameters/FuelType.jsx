const FuelType = ({ children }) => {
  return (
    <div className=" my-4 mx-6 border-[#233163] border-4 rounded-2xl relative">
      {children}
      <h1 className="text-center mt-3  text-base font-semibold">Fuel Type</h1>
      <h1 className="px-4 py-2 mb-2 text-center">Gasoline</h1>
    </div>
  );
};

export default FuelType;
