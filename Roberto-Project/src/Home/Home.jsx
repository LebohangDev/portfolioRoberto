import {useEffect, useState } from "react"
import styles from "./Home.module.css"






function Home({projectData, setProjectInspectData, setActive, setNavActive}){

   



    
    

    const [currentReviewIndex, setcurrentReviewIndex] = useState(0)

    const [currentReview, setCurrentReview] = useState([])
    const [reviewData, setReviewData] = useState([{}])
  
    
    useEffect(() =>{
        async function getReviews(){
            try{
                const response = await fetch('https://portfoliorobertoserver.onrender.com/api/Portfolio/Reviews',)
                const data = await response.json();

                setReviewData(data)

        
            }catch(e){
                console.log(e)
            }
        }

            
            

        getReviews()


    }, [])



    // function to handle getting the current review
    const getCurrentReview = () =>{

      

        try{
             // update function to keep the rpevious value and change it from there
            setcurrentReviewIndex(CRI => (CRI +1) % reviewData.length)

        
          
            reviewData.forEach((review, index) =>{
                if(index === currentReviewIndex){
                
                    

                    setCurrentReview([review])
                    
                    

                    
                    
                }

               

            })

        }catch(e){
            console.log("reviews data is missing")

        }

        


    
       
            
            

        
        

      

    
       

    }

    useEffect(() =>{
        getCurrentReview();

    }, [reviewData])
    
   

    useEffect(() =>{

        const interval = setInterval(() =>{
            getCurrentReview()
            

        }, 10000)
         // to prevent memory leaks
        return() => clearInterval(interval); 

    }, [currentReview])


   


    



    

    


    
    return(
        <>
        <div className={styles.homeContainer}>
            
            <div className={
                styles.projectShowcase}>
                <video src="Images/Projects/ProjectShowcase.mp4"  autoPlay muted loop playsInline controls={false} controlsList="nodownload nofullscreen noplaybackrate noremoteplayback" disablePictureInPicture aria-hidden="true"></video>
            </div>

            <div className={styles.homeContent}>
                <div className={styles.aboutContainer}>
                    <div className={styles.aboutTitle}>
                        <h1>About</h1>

                    </div>
                    <div className={styles.aboutDesc}>
                        <p>I’m <span>Roberto Fernandez</span>, a dedicated student at ArtFX, where I’m developing my skills in cinematography and 3D/FX artistry. I have a deep passion for visual storytelling and enjoy pushing my creative boundaries to craft immersive and captivating cinematic experiences. With a focus on blending technical precision and artistic vision, I’m committed to mastering my craft and making my mark in the world of digital arts and filmmaking</p>

                    </div>
                    
                    <div className={styles.aboutIcons}>
                        <img src="Images/aboutIcons/aftereffects-original.png" alt="" />
                        <img src="Images/aboutIcons/blender-original.png" alt="" />
                        <img src="Images/aboutIcons/premierepro-original.png" alt="" />
                        <img src="Images/aboutIcons/unity-original.png" alt="" />
                        
                    </div>
                </div>
                <div className={styles.reviewsContainer}>
                    <div className={styles.reviewsTitle}>
                        <h1>Reviews</h1>

                    </div>
                    
                    {currentReview.map((review, index) => (
                        
                        <div key={index} className={styles.review} onClick={() => {getCurrentReview()}}>
                            <div className={styles.reviewText}>
                                "{review.text}"
                            </div>
                            <div className={styles.reviewHeader}>
                                <div className={styles.reviewProfileImg}>
                                    <img src={review.img} alt="" />

                                </div>
                                <div className={styles.reviewNameHolder}>
                                    <h1>{review.name}</h1>
                                    <p>{review.job}</p>
                                </div>
                                <div className={styles.rating}>
                                    <p>5</p>

                                    {Array.from({length: review.rating}).map((_, index) =>(
                                        <div key={index} className={styles.star}>
                                            <i  className="ri-star-fill"></i>

                                        </div>
                                        
                                       
                                            
                                       
                                        
                                        
                                        
                                    ))}

                                </div>

                            </div>

                        </div>

                    ))}

                    
                    <div className={styles.reviewDotsContainer}>
                        {Array.from({length: reviewData.length}).map((_, index) =>(
                            <i key={index} className={index === currentReviewIndex ? styles.dotActive : styles.dot }></i>

                        ))}
                        

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home