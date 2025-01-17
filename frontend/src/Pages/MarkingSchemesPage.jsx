import NavBar from '../Components/NavBar'
import SideBar from '../Components/SideBar'
import MarkingSchemes from '../Components/MarkingSchemes/MarkingSchemes'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { MoonLoader } from 'react-spinners';
import axios from 'axios'
function MarkingSchemesPage() {
  const { year,subjectId} = useParams()
  const allItems=JSON.parse(localStorage.getItem('tokenData'));
  // console.log(allItems);
  if(!allItems){
    window.location.href="/";
  }
  const user_id=allItems['user_id'];
  const [isClicked,setClick] = useState("inner");
  const [isLoading, setIsLoading] = useState(true);
  const [markingScheme,setMarkingScheme] = useState({});
  
  const name=`${subjectId}---- ${year} ---Marking Scheme`
  
  useEffect(()=>{
    // console.log("DATA:");
    fetchSubjects();
  },[]);

  const fetchSubjects = async () =>{
    axios
    .get(`/markings/${subjectId}`)
    .then((response) => {
      const data = response.data
      setMarkingScheme(data)
      console.log("Data:",response.data)
      setIsLoading(false);
      // Process the response data or update your React component state
    })
    .catch((error) => {
      console.error(error);
      setMarkingScheme(null)
      setIsLoading(false);
      // Handle the error, e.g., display an error message to the user
    });
  }
  console.log("Marking scheme:",markingScheme)


  // //Function to handle the click of the hamburger menu
  const handleClick = () => {
    if(isClicked==="outer"){
    setClick("inner")
    // console.log(isClicked)
    }else{
    setClick("outer")
    // console.log(isClicked)
    }
  }

  return (
    <div>
      <NavBar clicked={isClicked}/>
      <SideBar mcq subjects markingSchemes answerPapers clicked={isClicked} onClickFunc={handleClick}/>
      {isLoading ? <MoonLoader color="#4457FF" height={6} width={128} className='absolute top-[20vw] left-[55%]'/> 
        :<MarkingSchemes clicked={isClicked} data={markingScheme}/>
      }
    </div>
  )
}

export default MarkingSchemesPage
