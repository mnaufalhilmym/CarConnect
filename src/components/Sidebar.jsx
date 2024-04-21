import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { HyperbaseContext } from "../App";
import { IoIosArrowRoundBack } from "react-icons/io";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { PiGaugeBold } from "react-icons/pi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdTroubleshoot } from "react-icons/md";
import { FaBell } from "react-icons/fa";

const Sidebar = () => {
  const hyperbase = useContext(HyperbaseContext);
  const { car_id } = useParams();
  const navigate = useNavigate();

  const backToRegisteredCarsHandler = async (event) => {
    // Assuming event is passed from an event listener
    event.preventDefault();

    const { value: back } = await Swal.fire({
      title: "Back to Registered Cars List?",
      background: "rgba(25,25,25,0.90)",
      backdrop: `rgba(7,193,250,0.1)`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16db3d",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, bring me back!",
      color: "#fff",
    });

    // Your remaining code
    if (back) {
      try {
        event.stopPropagation();
        navigate("/app/");
      } catch (err) {
        alert(`${err.status}\n${err.message}`);
      }
    }
  };

  const signOutHandler = async (event) => {
    // Assuming event is passed from an event listener
    event.preventDefault();

    const { value: removed } = await Swal.fire({
      title: "Do you want to Sign Out?",
      background: "rgba(25,25,25,0.90)",
      backdrop: `rgba(7,193,250,0.1)`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16db3d",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sign Out",
      color: "#fff",
    });

    // Your remaining code
    if (removed) {
      try {
        event.stopPropagation();
        hyperbase.signOut();
      } catch (err) {
        alert(`${err.status}\n${err.message}`);
      }
    }
  };

  return (
    <div className="w-12 sm:w-16 lg:w-20 fixed h-screen backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] bg-[rgba(25,25,25,0.90)] flex items-center justify-between flex-col py-10">
      <div className="mt-8">
        <button
          title="Back to Registered Cars"
          onClick={backToRegisteredCarsHandler}
        >
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] bg-[rgba(255,255,255,0.90)]">
            <IoIosArrowRoundBack className="text-[#191919] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl" />
          </div>
        </button>
      </div>
      <div>
        <Link to={`/app/${car_id}/dashboard`} title="Dashboard Page">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] bg-[rgba(255,255,255,0.90)]">
            <PiGaugeBold className="text-[#191919] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl" />
          </div>
        </Link>
      </div>
      <div>
        <Link to={`/app/${car_id}/parametersList`} title="Parameters List Page">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] bg-[rgba(255,255,255,0.90)]">
            <IoMdInformationCircleOutline className="text-[#191919] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl" />
          </div>
        </Link>
      </div>
      <div>
        <Link to={`/app/${car_id}/diagnostics`} title="DTC Page">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] bg-[rgba(255,255,255,0.90)]">
            <MdTroubleshoot className="text-[#191919] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl" />
          </div>
        </Link>
      </div>
      <div>
        <Link to={`/app/${car_id}/notifications`} title="Notifications Page">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] bg-[rgba(255,255,255,0.90)]">
            <FaBell className="text-[#191919] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl" />
          </div>
        </Link>
      </div>
      <button
        onClick={signOutHandler}
        className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full backdrop-blur-[2px] border-[1px_solid_rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] bg-[rgba(255,255,255,0.90)]"
        title="Sign Out"
      >
        <p className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <FontAwesomeIcon
            className="text-base"
            icon={faRightFromBracket}
            style={{ color: "#191919" }}
          />
        </p>
      </button>
    </div>
  );
};

export default Sidebar;
