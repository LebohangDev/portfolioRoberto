
import styles from './ProjectInspect.module.css';
import { useState, useEffect, useRef } from "react"

function ProjectInspect({setNavActive, setActive, projectInspectData}){
    const [rect, setRect] = useState(0)
    const [showcaseData, setShowcaseData] = useState([{}])
    const projectInspectRef = useRef(null)


    useEffect( () =>{

       
        projectInspectRef.current.scrollTop = 0;
        setShowcaseData(projectInspectData?.showcase?.length)
        
       
        

    }, [projectInspectData])

    

   
        


   

    useEffect(() => {
      
       

    }, [projectInspectData] )

    return(
        <>
        
        <div  className={styles.ProjectInspectContainer} ref={projectInspectRef}>
            <div className={styles.header}>
                <div className={styles.imgContainer} id='imgContainer'>
                    <img src="Images/UserProfile/Roberto.jfif" alt="" />

                </div>
                <div className={styles.button}>
                    <button onClick={(e) => {e.preventDefault(), setNavActive(true), setActive('home')}} >BACK HOME</button>

                </div>
                
            </div>
           
            <div className={styles.projectVideo}>
                <video src={projectInspectData.video} autoPlay muted loop playsInline controls={false} controlsList="nodownload nofullscreen noplaybackrate noremoteplayback" disablePictureInPicture aria-hidden="true" alt="" />
                   
            </div>
            <div className={styles.projectDetails}>
                <div className={styles.title}>
                    <div className={styles.projectName}>
                        <h1>{projectInspectData.name}</h1>
                        <p>{projectInspectData.tags}</p>
                    </div>
                    
                   
                    
                </div>
                <div className={styles.projectDescription}>
                    <div className={styles.desc}>
                        <p>{projectInspectData.description}</p>

                    </div>
                    <div className={styles.collaboration}>
                        <div className={styles.userRole}>
                            <h1>ROLE</h1>
                            <p>{projectInspectData.role}</p>
                        </div>
                        <div className={styles.collaborators}>
                            <h1>COLLABORATORS</h1>
                            {projectInspectData.collaborator?.map((c, index) =>(
                                <p key={index}>{c}</p>
                            ))}
                        </div>
                        <div className={styles.Duration}>
                            <h1>DURATION</h1>
                            <p>{projectInspectData.duration}</p>
                        </div>
                        <div className={styles.Tools}>
                            <h1>TOOLS</h1>
                            {projectInspectData.tools?.map((t, index) =>(
                                <p key={index}>{t}</p>
                            ))}
                            
                        </div>
                        
                    </div>
                    {showcaseData >= 1 ? 
                        <div className={styles.projectShowcase}>
                            {projectInspectData.showcase?.map((s, index) =>(
                                <div className={styles.projectIMG} key={index}>
                                    <img src={s} alt="" />
                                
                            
                                </div>
                            ))}
                        
                        </div>
                    
                    
                    : null}
                   
                </div>
            </div>
        </div>
        
        
        
        
           
                
            
                

 
           
           
        
        </>
    )
}


        
    
    
    


export default ProjectInspect
