
import { useState, useEffect, useRef } from "react"

import Home from "./Home/Home.jsx"
import Projects from "./Projects/Projects.jsx"
import ProjectInspect from "./ProjectInspect/ProjectInspect.jsx";
import Contact from "./Contact/Contact.jsx";
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

function App() {

  const [active, setActive] = useState('home')
  const [navActive, setNavActive] = useState(true)
  const [projectData, setProjectData] = useState([{}])
  const [projectInspectData, setProjectInspectData] = useState([{}])
    const [searchResult, setSearchResult] = useState('')
    const textInputRef = useRef(null) // setting ref to get text input form search input avoid dom delays

    
  useEffect(() =>{
          async function getProjects(){
              try{
                  const response = await fetch('https://portfoliorobertoserver.onrender.com/api/Portfolio/Projects',)
                  const data = await response.json()
                  setProjectData(data)
  
              
              }catch(e){
                  console.log('error fetching projects from database:', e)
              
              }
          }
          
          
          getProjects();
      
      }, [])

  const handleSearch = ((searchResult) =>{
        
    projectData.forEach((PD, index) =>{
      if(PD.name === searchResult){
                   
                
        setProjectInspectData(PD)
        setActive('projectInspect')
        setNavActive('nav2')
                    
      }
                
    })
            
  })

   

   

  useEffect(() =>{
    const searchBar = textInputRef.current
    console.log("searchBar:", searchBar)
        

    const handleKey = ((event) =>{
      if(event.key === 'Enter'){
        const value = event.target.value
        console.log("value:", value)
        setSearchResult(value)
        handleSearch(value)
                
                

      }


    })

       
    searchBar.addEventListener('keydown', handleKey)
    console.log("search result:", searchResult)  
         
       
           
    
        


    return () =>{
      searchBar.removeEventListener('keydown', handleKey)
    }

  }, [searchResult])

  useEffect(() =>{
    handleSearch(searchResult)

  }, [searchResult])


  useEffect( () =>{

        const activeSectionWindow = document.getElementById('activeSection')
        activeSectionWindow.scrollTo(0, 0)

    }, [active])


    
      

  
 
  return (
    <>

    
      <div className={ navActive === true ? 'homeHeader' : 'noHomeHeader' }>
        <div className="content1">
          <div className="navigationHeader">
            <div className="imgContainer">
              <img src="Images/UserProfile/Roberto.jfif" alt="" />
            </div>
            <div className="userInformation">
              <h1>Roberto Fernandez Ruiz</h1>
              <div className="institution">
                <i className="ri-graduation-cap-fill"></i>
                <p>Student at ArtFX</p>
              </div>
              <div className="email">
                <i className="ri-mail-ai-fill"></i>
                <p>etho009@outlook.es</p>
              </div>
              <div className="socialIcons">
                <img src="Images/SocialIcons/Instagram_Icon.png" alt="" />
                <img src="Images/SocialIcons/Linkden_Icon.png" alt="" />
                <img src="Images/SocialIcons/TikTok_Icon.png" alt="" />
                <img src="Images/SocialIcons/Youtube_Icon.png" alt="" />
              </div>
            </div>
          </div>
          {/* Stack is a Layout Component to arrange child components */}
          <Stack spacing={2} sx={{ width: 230 }}>
            <Autocomplete
              className="searchBar"
              ref={textInputRef}
              options={projectData.map((option) => option.name)}
              // params contains the necessary props and refs to render the input field
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <input
                    type="text"
                    placeholder="search for a Project"
                    {...params.inputProps}
                  />
                  <i className="ri-search-line"></i>
                </div>
              )}
            />
          </Stack>

        </div>
       

        <div className="jobTitle">
          <h1>Cinematographer & 3D/FX Designer</h1>
        </div>
      </div>
  



      

    


   
      
    
    <div className={active === 'home' ? 'activeSection' : 'notActiveSection'  } id="activeSection">
        <Home projectData={projectData} setProjectInspectData = {setProjectInspectData} setActive = {setActive} setNavActive={setNavActive}/>
        <Projects setNavActive = {setNavActive} setActive = {setActive} projectData={projectData} setProjectInspectData = {setProjectInspectData}/>
        <Contact/>

    
      
      


    </div>


    <div className={active === 'projectInspect' ? 'newActiveSection' : 'notNewActiveSection'  } id="projectInspect">
      <ProjectInspect setActive = {setActive} setNavActive={setNavActive} projectInspectData = {projectInspectData} active = {active}/>
      
      
      

    </div>
    
      

    

     
      
    
    

   

    
    
    

    

    

    </>
  )
}

export default App
