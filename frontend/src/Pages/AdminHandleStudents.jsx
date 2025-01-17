import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
// import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiFolder, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import DashboardTable1 from '../Components/DashboardTable1';
import DashboardTable2 from "../Components/DashboardTable2";

const AdminHandleStudents2 = () => {
  const menus = [
    { name: "dashboard", link: "/", icon: MdOutlineDashboard },
    // { name: "MCQ", link: "/", icon: AiOutlineUser },
    // { name: "messages", link: "/", icon: FiMessageSquare },
    { name: "Subjects", link: "/", icon: TbReportAnalytics, margin: true },
    { name: "Teachers", link: "/", icon: FiFolder },
    
    { name: "Students", link: "/", icon: FiShoppingCart },
    
    // { name: "Saved", link: "/", icon: AiOutlineHeart, margin: true },
    { name: "Setting", link: "/", icon: RiSettings4Line },
  ];
  const [open, setOpen] = useState(true);



  const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    
  ];
  
  const data02 = [
    { name: 'Group A', value: 2400 },
    { name: 'Group B', value: 4567 },
    
  ];
  return (
    <div>
     <div className="flex bg-gray-300 lg:cols-1"> {/*gap-6 */}
      <div
        className={`bg-[#1643d6] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="flex justify-end py-3">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="relative flex flex-col gap-4 mt-4">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full h-full mt-10 mb-5 ml-5 mr-5 gap-y-4 ">
      <div class=" grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 bg-white h-auto flex justify-between rounded p-5">
  <div className="text-lg text-gray-700">
    Student Dashboard
    <div className="text-base text-gray-500">
      Home
    </div>
  </div>
  <div className="text-base text-gray-500">
    11.30 AM
    <div className="">
      08/08/2023
    </div>
  </div>
</div>
      {/* Stats components */}
      <div className="w-full bg-white">
      
      <div class="grid grid-cols-1 sm:grid-cols-2 sm:gap-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-16 w-full pt-3 text-white" style={{backgroundSize: "cover"}}>
        {/* first compo */}
  <div class="p-6 md:p-10 rounded-md bg-blue-700 lg:h-3/6 sm:h-3/5 grid grid-cols-2 ml-2">
    <div className="flex flex-row justify-between text-2xl space-x-9 justify-items-center">
      <h1>G.P.A.</h1>
      <h1 className="ml-12 text-4xl font-semibold bg-cover sm:mb-6" style={{marginTop: "-6px"}}>3.065</h1>
    </div>
    
  </div>
   {/* second compo */}
  <div class="p-6 md:p-10 rounded-md bg-blue-700 sm:h-3/5 lg:h-3/6 grid grid-cols-2">
	<div className="flex flex-row justify-between pb-5 text-2xl space-x-9 justify-items-center">
      <h1>G.P.A.</h1>
      <h1 className="ml-12 text-4xl font-semibold bg-cover sm:mb-6" style={{marginTop: "-6px"}}>3.065</h1>
    </div>
  </div>
   {/* third compo */}
  <div class="p-6 md:p-10 rounded-md bg-blue-700 sm:h-3/6 lg:h-3/6 grid grid-cols-2 ">
	<div className="flex flex-row justify-between text-2xl space-x-9 sm:mb-10 justify-items-center">
    <h1>G.P.A.</h1>
    <h1 className="ml-12 text-4xl font-semibold bg-cover sm:mb-6" style={{marginTop: "-6px"}}>3.065</h1>
    </div>
    {/* <div className="text-4xl x-4">3.065</div> */}
  </div>
   {/* fourth compo */}
  <div class="p-6 md:p-10 rounded-md bg-blue-700 sm:h-3/6 lg:h-3/6 space-x-6 grid grid-cols-2 mr-2 ">
	<div className="flex flex-row justify-between text-2xl space-x-9 sm:mb-10 justify-items-center">
      <h1>G.P.A.</h1>
      <h1 className="ml-12 text-4xl font-semibold bg-cover sm:mb-6" style={{marginTop: "-6px"}}>3.065</h1>
    </div>
    
  </div>
</div>
   <div className="grid grid-cols-2 mr-2">
    
    <div className="w-auto ">
  <DashboardTable1 />
  </div>
  <div
   className="w-auto " >
  <DashboardTable2 />
  </div>
  </div>
</div>
</div>
      
    </div>
    </div>
  );
};

export default AdminHandleStudents2;
