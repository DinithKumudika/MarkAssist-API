import React from 'react'
function DragDrop2() {
  return (
    <div>
        <p className= "flex items-center justify-center ml-8 mt-11 text-2xl font-bold text-#2e1065 md:text-2xl dark:text-#2e1065 pt-10 " >Check Essay Answers</p>
        <p className="flex items-center justify-center mt-2 ml-8 text-lg font-semibold text-inherit md:text-lg dark:text-inherit ">Upload your Marking Scheme and Answer paper to Analyze score</p>
        
      <div class="  flex max-w-screen inset-y-7 inset-x-4 justify-center box-border">
    <label
        class="flex inset-y-5 right-0 justify-center box-border h-64 w-2/3 m-12 px-4 mtransition bg-blue-700 rounded-lg">
        <span class="relative flex justify-center box-border items-center h-5/6 w-5/6 pt-2 mt-5 space-x-2 border-2 border-white  border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
            
            <span class="absolute justify-center box-border pt-0 inset-x-28 w-64 top-10 text-xl font-bold text-white font-roboto p-5">
                Marking Scheme
                {/* <span class="text-blue-600 underline">browse</span> */}
            </span>
            <span class="relative text-lg font-roboto w-52 inset-x-0 top-0 text-white mt-13">
                Drag and Drop files here
                <button class=" absolute inset-x-6 top-10 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                
                <span>Choose files</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 font-bold">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>

                </button>
            </span>
        </span>
        <a type="file" name="file_upload" className="hidden"></a>
        
            
            {/* <p className="items-center justify-center mt-2 ml-8 text-lg font-semibold text-inherit md:text-lg dark:text-inherit">Upload your Marking Scheme and Answer paper to Analyze score</p> */}
        
    </label>
    
     </div>
     <p className= "flex items-center justify-center ml-8 mt-0 text-2xl font-bold text-#2e1065 md:text-2xl dark:text-#2e1065 pt-10 " >
      <span><button className="h-10 w-96 text-lg text-white bg-#2563eb hover:bg-#2563eb focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg  mb-16 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Check Answers
        </button>
        </span>
      </p>

    </div>
  )
}

export default DragDrop2;

