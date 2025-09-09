
import { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { AnimatePresence, motion} from "framer-motion";
import styles from './Projects.module.css';








function Projects({setNavActive, setActive, projectData, setProjectInspectData, setIsLoading, isLoading}){

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    

    


    useEffect(() =>{


        const Interval = setInterval(() =>{
        if ( projectData.length >= 1){
            console.log("isLoadingFalse:", isLoading)
            setIsLoading(false)
        }else{

            console.log("isLoadingTrue:", isLoading)
            setIsLoading(true)
        

        }

        },  3000)


        return () => clearInterval(Interval)
        
       


    }, [projectData])


    async function deleteProject(project){

        let projectName = project.name
        try{
            const response = await fetch(`http://localhost:3000/api/Portfolio/Projects/${projectName}`,{

                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },

            })

            if(!response.ok){
                 throw new error(`http error! status: ${response.status},`)
                

            }

        

            console.log("succcesfully deleted", project, "project!")



            

        }catch(e){

        }

    }


    const emptyGridArray = [{img: "Images/Projects/noProjects/empty-grid1.png"},
                            {img: "Images/Projects/noProjects/empty-grid2.png"},
                            {img: "Images/Projects/noProjects/empty-grid3.png"},
                            {img: "Images/Projects/noProjects/empty-grid4.png"},
                            {img: "Images/Projects/noProjects/empty-grid5.png"},
                            {img: "Images/Projects/noProjects/empty-grid6.png"},
                        ]

   

   

    

   


    
    
    return(
        <>

       
           
            
                <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 950: 3}} gutter="40px" style={{ width: '100%' }} >
                    <Masonry>

                        {isLoading === true ? emptyGridArray.map((EG, index) =>(
                            <motion.div
                            key={index}
                            initial={{opacity: 0}}
                            animate={{opacity: [0.4, 1, 0.4]}} // fade in and out affect
                            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut"}}
                            className={styles.blackBoxContainer}>
                                <div className={styles.blackbox}>
                                    <img src={EG.img} alt="no image" />

                                </div>
                           





                            </motion.div>
                        
                       
                        ))
                
                        :   
                            projectData.map((PD, index) =>(
                                <motion.div
                                key={index}
                                initial={{opacity: 0, y: -30}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{amount: 0.2, once: false}}
                                transition={{delay: index * 0.1}}>
                                    <div className={styles.ProjectImg} key={index} >
                                        {/*<button onClick={(e) =>{e.preventDefault(), deleteProject(PD)}}>Delete</button>*/}

                                       

                                        <video src={PD.video}  allow="autoplay; fullscreen" allowFullScreen onClick={(e) => {e.preventDefault(), setNavActive(false), setActive('projectInspect'), setProjectInspectData(PD)}}></video>

                                        

                                      

                                            

                                       
                                        
                                        <div className={styles.title}>
                                            <h1>{PD.name}</h1>
                                            <div className={styles.tags}>
                                                <p>{PD.tags}</p>
                                   

                                            </div>
                                

                                        </div>
                            

                            

                                    </div>





                                </motion.div>
                        
                       
                            ))
                
                        }

                        



                    </Masonry>


            
                </ResponsiveMasonry>

           
        
        

       
        
        
        


        
        
        </>
    )
}

export default Projects


