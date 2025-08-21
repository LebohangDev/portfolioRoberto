
import { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { AnimatePresence, motion} from "framer-motion";
import styles from './Projects.module.css';








function Projects({setNavActive, setActive, projectData, setProjectInspectData}){

   

   

    

   


    
    
    return(
        <>
        <div className={styles.projectContainer} id='Projects'>
            
            <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
                <Masonry columnsCount={3} gutter="40px">

                    {projectData.map((PD, index) =>(
                        <motion.div
                          key={index}
                          initial={{opacity: 0, y: -30}}
                          whileInView={{opacity: 1, y: 0}}
                          viewport={{amount: 0.2, once: false}}
                          transition={{delay: index * 0.1}}>
                            <div className={styles.ProjectImg} key={index} >
                                <video src={PD.video}  autoPlay muted loop playsInline controls={false} controlsList="nodownload nofullscreen noplaybackrate noremoteplayback" disablePictureInPicture aria-hidden="true" alt="" onClick={(e) => {e.preventDefault(), setNavActive(false), setActive('projectInspect'), setProjectInspectData(PD)}} />

                                <div className={styles.title}>
                                    <h1>{PD.name}</h1>
                                    <div className={styles.tags}>
                                        <p>{PD.tags}</p>
                                   

                                    </div>
                                

                                </div>
                            

                            

                            </div>





                        </motion.div>
                        
                       
                    ))}



                </Masonry>


            
            </ResponsiveMasonry>

        </div>
        
        </>
    )
}

export default Projects


