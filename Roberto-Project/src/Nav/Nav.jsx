import styles from "./Nav.module.css"



function Nav({setActive, active}){
    console.log(active)
    return(
        <>
        <div className={styles.navigationContainer}>
            <div className={styles.navigationHeader}>
                <div className={styles.imgContainer}>
                    <img src="/Images/UserProfile/Roberto.jfif" alt="" />
                </div>
                <div className={styles.userInformation}>
                    <h1>Roberto Fernandez Ruiz</h1>
                    <div className={styles.institution}>
                        <i className="ri-graduation-cap-fill"></i>
                        <p>Student at ArtFX</p>
                    </div>
                    <div className={styles.email}>
                        <i className="ri-mail-ai-fill"></i>
                        <p>etho009@outlook.es</p>
                    </div>
                    
                    
                    <div className={styles.socialIcons}>
                        <img src="/Images/SocialIcons/Instagram_Icon.png" alt="" />
                        <img src="/Images/SocialIcons/Linkden_Icon.png" alt="" />
                        <img src="/Images/SocialIcons/TikTok_Icon.png" alt="" />
                        <img src="/Images/SocialIcons/Youtube_Icon.png" alt="" />

                        
                    </div>
                </div>
            </div>
            <div className={styles.navigationContent}>
                <div className={styles.navigationBar}>
                    <div className={active === 'home' ? styles.homeActive : styles.home} onClick={(e) => {e.preventDefault(); setActive('home')}}>
                        <i className="ri-home-9-fill"></i>
                        <h1>Home</h1>
                    </div>
                    <div className={active === 'projects' ? styles.projectsActive : styles.projects} onClick={(e) => {e.preventDefault(); setActive('projects')}}   >
                        <i className="ri-palette-fill"></i>
                        <h1>Projects</h1>
                    </div>
                    <div className={active === 'contact' ? styles.contactActive : styles.contact} onClick={(e) => {e.preventDefault(); setActive('contact')}}>
                        <i className="ri-contacts-fill"></i>
                        <h1>Contact</h1>
                    </div>
                
                </div>
                <div className={styles.resumeDownload}>
                    <button>Download Resume</button>

                </div>                

                </div>

           
            </div>
        
        </>
    )
}

export default Nav