import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FaBell, FaCircle } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { HyperbaseContext } from "../App";
import collections from "../utils/hyperbase/hyperbaseCollections.json";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import carBackground from "../pageRegisteredCars.png";

const RegisteredCars = () => {
  const hyperbase = useContext(HyperbaseContext);

  const [carsCollection, setCarsCollection] = useState();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    if (hyperbase.isLoading || !hyperbase.isSignedIn) return;

    let unsubscribe;

    (async () => {
      try {
        const carCollection = await hyperbase.setCollection(collections.cars);
        unsubscribe = subscribe(carCollection);

        setCarsCollection(carCollection);
      } catch (err) {
        alert(`${err.status}\n${err.message}`);
      }
    })();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [hyperbase, hyperbase.isLoading]);

  useEffect(() => {
    if (!carsCollection) return;
    fetchAllCars();
  }, [carsCollection]);

  const signOut = (e) => {
    e.stopPropagation();
    hyperbase.signOut();
  };

  const fetchAllCars = async () => {
    try {
      const cars = await carsCollection.findMany({
        orders: [
          {
            field: "_id",
            kind: "asc",
          },
        ],
      });
      setCars(cars.data);
    } catch (err) {
      alert(`${err.status}\n${err.message}`);
    }
  };

  const subscribe = (carsCollection) => {
    carsCollection.subscribe({
      onOpenCallback: (e) => {
        console.log("Subscribe cars status open:", e);
      },
      onErrorCallback: (e) => {
        console.log("Subscribe cars status error:", e);
      },
      onCloseCallback: (e) => {
        console.log("Subscribe cars status close:", e);
        if (e.status !== 1000) {
          setTimeout(() => {
            subscribe(carsCollection);
          }, 5000);
        }
      },
      onMessageCallback: (e) => {
        console.log("Subscribe cars status message:", e);
      },
    });

    return () => carsCollection.unsubscribe(1000);
  };

  const addCarLicensePlate = async () => {
    const { value: license_plate } = await Swal.fire({
      title: "Enter Car's License Plate",
      inputPlaceholder: "e.g. B 1234 VH",
      input: "text",
      color: "#233163",
      background: "#F1F1FB",

      cancelButtonColor: "#d33",
      confirmButtonColor: "#233163",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    if (license_plate) {
      try {
        await carsCollection.insertOne({
          user_id: hyperbase.user._id,
          license_plate,
        });
        await fetchAllCars();
      } catch (err) {
        alert(`${err.status}\n${err.message}`);
      }
    }
  };

  const editCarLicensePlate = async (event, id) => {
    event.preventDefault();
    const { value: license_plate_corrected } = await Swal.fire({
      title: "Edit Car's License Plate",
      inputPlaceholder: "e.g. B 1234 VH",
      input: "text",
      color: "#233163",
      background: "#F1F1FB",

      cancelButtonColor: "#d33",
      confirmButtonColor: "#233163",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    if (license_plate_corrected) {
      try {
        await carsCollection.updateOne(id, {
          license_plate: license_plate_corrected,
        });
        await fetchAllCars();
      } catch (err) {
        alert(`${err.status}\n${err.message}`);
      }
    }
  };

  const deleteCarLicensePlate = async (event, id) => {
    // Assuming event is passed from an event listener
    event.preventDefault();

    const { value: removed } = await Swal.fire({
      title: "Delete this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#233163",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      color: "#233163",
    });

    // Your remaining code
    if (removed) {
      try {
        await carsCollection.deleteOne(id);
        await fetchAllCars();
      } catch (err) {
        alert(`${err.status}\n${err.message}`);
      }
    }
  };

  return (
    <div
      className="h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${carBackground})` }}
    >
      <div className="w-12 fixed h-screen backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] bg-[rgba(25,25,25,0.90)] flex items-center justify-between flex-col py-10">
        <button onClick={addCarLicensePlate} className="text-4xl text-white">
          +
        </button>
        <button onClick={signOut}>
          <FontAwesomeIcon
            className="text-2xl"
            icon={faRightFromBracket}
            style={{ color: "#FFF" }}
          />
        </button>
      </div>
      <div className="pt-8 ml-12">
        <div className="flex justify-between mx-5 mb-4 ">
          <input
            type="text"
            className="px-4 py-2 w-32 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(255,255,255,0.90)]"
            placeholder="🔍 Search for car's license plate"
          />
          <input
            type="text"
            className="px-4 py-2 w-32 backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(255,255,255,0.90)]"
            placeholder="🔍 Search for car's brand"
          />
        </div>
        <h1 className="py-2 w-64 text-center px-4 ml-5 text-2xl font-bold md:text-3xl xl:text-4xl backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
          Registered Cars
        </h1>
        <h2 className="mt-4 py-2 w-72 text-center px-4 ml-5 text-lg font-medium md:text-3xl xl:text-4xl backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(25,25,25,0.90)]">
          Currently, there are 3 Cars
        </h2>

        <div className="px-5 md:px-12">
          {cars.map((car) => (
            <a
              key={car._id}
              href={`/app/${car._id}`}
              className="px-8 py-6 lg:py-8 mt-6 flex flex-col w-64  font-medium backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[18px] bg-[rgba(255,255,255,0.90)]"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-[#191919] md:text-xl xl:text-2xl">
                    {car.license_plate}
                  </h1>
                  <h1 className="text-[#191919]">Mazda</h1>
                </div>

                <div>
                  <FaCircle className="text-[#20F95D]" />
                </div>
              </div>

              <div className="flex items-center justify-center">
                <a href={`/app/${car._id}/notifications`}>
                  <FaBell className="text-[#191919] text-lg w-10 h-10 p-2 rounded-full backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]  bg-[rgba(255,255,255,0.90)]" />
                </a>
                <button
                  className="ml-4 sm:text-xl lg:text-2xl w-10 h-10 rounded-full backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]  bg-[rgba(255,255,255,0.90)]"
                  onClick={(e) => editCarLicensePlate(e, car._id)}
                >
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ color: "#191919" }}
                  />
                </button>
                <button
                  className="mx-4 sm:text-xl lg:text-2xl w-10 h-10 rounded-full backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]  bg-[rgba(255,255,255,0.90)]"
                  onClick={(e) => deleteCarLicensePlate(e, car._id)}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ color: "#191919" }}
                  />
                </button>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegisteredCars;