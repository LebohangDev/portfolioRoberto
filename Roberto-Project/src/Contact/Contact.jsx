
import { useState, useEffect, useRef, use } from "react";
import styles from "./Contact.module.css";
import { AnimatePresence, motion} from "framer-motion";
function Contact(){

    const [lang, setLang] = useState('Together');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [emailValid, setEmailValid] = useState(false);
    const [messageValid, setMessageValid] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    const emailRef = useRef()
    const subjectRef = useRef()
    const messageRef = useRef()
    const buttonRef = useRef()

    const Languages = [
        "Together",     // English
        "함께",         // Korean (hamkke)
        "Juntos",       // Spanish
        "Ensemble",     // French
        "一起",         // Chinese (yìqǐ)
        "معًا",         // Arabic (ma'an)
        "Saam",         // Afrikaans
        "Ndawonye"      // Zulu
    ];
    const circles = [
        { img: 'Images/Circles/circle1.png' },
        { img: 'Images/Circles/circle2.png' },
        { img: 'Images/Circles/circle3.png' }
    ];

    const changeLanguage = (() =>{
        
        Languages.forEach((lang, index) =>{
            
            if(currentIndex === index){
                setCurrentIndex(c => c+1)
                
                setLang(lang)
              
            } else if( currentIndex === Languages.length){
                setCurrentIndex(0)

            }
            
        })

       

    }) 
    

    useEffect(() =>{
    
        const interval = setInterval(() =>{
            changeLanguage()
                
    
        }, 2000)
            // to prevent memory leaks
        return() => clearInterval(interval); 
    
    }, [currentIndex])

    useEffect(() =>{
        const emailInputField = emailRef.current
        const messageInputField = messageRef.current;
        const submitButton = buttonRef.current
        console.log("messageRef:", messageRef)
        

        
        const handleEmail = ((event) =>{
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            let emailInput = event.target.value
            let isEmailValid = emailRegex.test(emailInput)
            

            if(isEmailValid === true){
                setEmailValid(true)
                setErrorMsg("")
                
            }else{
                setEmailValid(false)
                setErrorMsg("Invalid Email!")
                
            }
        })
        const handleMessage = ((event) =>{
            
            const messageRegex = /^.{1,50}$/;
            let messageInput = event.target.value
            let isMessageValid = messageRegex.test(messageInput)

            if(isMessageValid === true){
                setMessageValid(true)
                setErrorMsg("")
                
            }else{
                setMessageValid(false)
                setErrorMsg("Message is too long or too short!")
                
                
            }

           
        })
        
       

         if(messageValid === true && emailValid === true){
            setButtonDisabled(false)
           
         }else{
            setButtonDisabled(true)
           
         }

         async function handleForm (e){
            let subjectData = subjectRef.current.value
            let emailData = emailRef.current.value
            let messageData = messageRef.current.value
            e.preventDefault()
            
            let formData = {
                'email': emailData,
                'subject': subjectData,
                'message': messageData,
            }
            console.log("form data:", FormData)

            try{
                const response = await fetch('http://localhost:3000/api/Portfolio/Messages', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData)
                })

                if(!response.ok){
                    throw new error(`http error! status: ${response.status},`)
                }

                const responseData = await response.json()
                console.log("response data:", responseData)

            }catch(e){
                console.error("failed to store data and send to client to server")

            }
            


        }

        emailInputField.addEventListener('change', handleEmail)
        submitButton.addEventListener('click', handleForm)
        messageInputField.addEventListener('change', handleMessage)
        


        return () =>{
            emailInputField.removeEventListener('change', handleEmail)
            submitButton.removeEventListener('click', handleForm)
            messageInputField.removeEventListener('change', handleMessage)
            

        }
        
    }, [messageValid, emailValid, buttonDisabled])


    



    return(
        <>
        <div className={styles.contactContainer}>
            <div className={styles.contactInformation}>
                <div className={styles.circlesContainer}>

                    {circles.map((c, index) =>(
                        <motion.div
                            key={index}
                            initial={{opacity: 0, y: -30}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{amount: 0.1, once: false}}
                            transition={{delay: index * 0.1}}
                            className={styles.circle}>

                                 <img src={c.img} alt="" />
                            


                           

                        </motion.div>

                    ))}
                   
                   
                </div>
                <div className={styles.title}>
                    <p>Contact</p>
                    <h1>Let's Make Something Great </h1>
                    {/*handles the mounting and unmounting of the animation */}
                    <AnimatePresence mode="wait">
                        <motion.div
                        //it ensures that every new 'langauge' is treated as a seperate component allowing ti to trigger the exit/enter animation
                        key={lang}
                        initial={{opacity: 0}}
                        animate ={{opacity: 1}}
                        exit={{opacity: 0}}>
                            <span>{lang}</span>
                        


                        </motion.div>


                    </AnimatePresence>
                   
                    
                </div>
                 
                <div className={styles.contactDescription}>
                    <p>Feel free to get in touch — I’m always open to new connections, collaborations, and creative opportunities. Whether you’d like to discuss a project, share ideas, or just say hello, I’d love to hear from you!</p>
                </div>
               
                <div className={styles.contactIcons}>
                    <img src="Images/SocialIcons/Instagram_Icon.png" alt="" />
                    <img src="Images/SocialIcons/Linkden_Icon.png" alt="" />
                    <img src="Images/SocialIcons/TikTok_Icon.png" alt="" />
                    <img src="/Images/SocialIcons/Youtube_Icon.png" alt="" />
                </div>
                <div className={styles.projectShowcase}>
                    <img src="Images/Projects/Progressive-Blur.png" alt="" />
                </div>


            </div>

            <div className={styles.contactForm}>
                
                <form action="">
                    <div className={styles.nameInputContainer}>
                        <div className={styles.nameInput}>
                            <p>First Name</p>
                            <input type="text" placeholder="First Name" />
                        </div>
                         <div className={styles.nameInput}>
                            <p>Last Name</p>
                            <input type="text" placeholder="Last Name" />
                        </div>                
                    </div>
         

                    <div className={emailValid === false ? styles.emailInputInvalid : styles.emailInputValid}>
                        <p>Email <span>*</span></p>
                        <input type="email" ref={emailRef} placeholder="Email Address" />
                    </div>
                     

                    <div className={styles.subjectInput}>
                        <p>Subject</p>
                        <input type="text" ref={subjectRef} placeholder="Subject" />
                    </div>

                    <div className={ messageValid === true ? styles.messageInputValid : styles.messageInputInvalid}>
                        <p>Your Message <span>*</span></p>
                        <textarea className="messageInput" ref={messageRef} placeholder="Your Message" />
                    </div>
                    <div className={styles.msg}>
                        <p>{errorMsg}</p>
                    </div>

                    <div className={ buttonDisabled === false ? styles.submitButton : styles.submitButtonDisabled }>
                        <button disabled={buttonDisabled} ref={buttonRef}>Submit Form</button>
                            
                    </div>
                        


                </form>
                
            </div>
        </div>
       


        
        </>
    )

}


export default Contact;