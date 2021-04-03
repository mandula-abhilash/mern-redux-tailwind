import React, { useState } from "react";
function Index() {
  const [show, setshow] = useState(false);
  const [show1, setshow1] = useState(false);
  return (
    <>
      <div className="p-6 flex flex-col items-end sm:flex-row flex-wrap">
        <div className="flex items-center mb-4 lg:mb-0 mr-10">
          <div className="w-12 h-12 bg-gray-200 rounded-md mr-3"></div>
        </div>
        <div className="flex items-center mb-4 lg:mb-0 mr-10 relative cursor-pointer">
          <div className="w-12 h-12 bg-gray-200 rounded mr-3"></div>
        </div>
        <div className="flex items-center mb-4 lg:mb-0 mr-10 relative cursor-pointer">
          <div className="w-12 h-12 bg-gray-200 rounded-md mr-3"></div>
        </div>
      </div>
    </>
  );
}
export default Index;
