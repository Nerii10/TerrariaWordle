import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn2 } from "../../../variant2";
import { fadeIn4 } from "../../../variant4";

function Background()
{
    const Backgrounds = ["/TerrariaWordle/Backgrounds/background1.png","/TerrariaWordle/Backgrounds/background2.png","/TerrariaWordle/Backgrounds/background3.png","/TerrariaWordle/Backgrounds/background4.png","/TerrariaWordle/Backgrounds/background5.png","/TerrariaWordle/Backgrounds/background6.png","/TerrariaWordle/Backgrounds/background7.png"]
    const [currbg, setcurrbg] = useState(0)


    function Change(x)
    {
        if(x==-1)
        {
            if(currbg>0)
            {
                setcurrbg(currbg-1)
            }
        }
        if(x==1)
            {
                if(currbg<6)
                {
                    setcurrbg(currbg+1)
                }
            }
    }

  


    return(
        <>  
               
               <div style={{ padding: "20px", display: "flex", justifyContent: "space-between",  zIndex:"200", height:"0px"}}>
            <motion.button 
                className="guess-button-bg" 
                whileTap={{ scale: 1.25, rotate: "-5deg"}}
                onClick={() => Change(-1)}
                variants={fadeIn4("down",0)}
                initial="hidden" 
                whileInView="show" 
                transition={{ duration: 0.05 }} 
                viewport={{once: false}}
            >
             &lt;
            </motion.button>

            <motion.button 
            variants={fadeIn4("down",0)}
                initial="hidden" 
                whileInView="show" 
                transition={{ duration: 0.05 }} 
                viewport={{once: false}}
            className="guess-button-bg" 
                whileTap={{ scale: 1.25, rotate: "5deg"}}
                onClick={() => Change(1)}
         >
         &gt;
            </motion.button>
                </div>

              


            <div className="background1" style={{ backgroundImage: `url(${Backgrounds[currbg]})` }}></div>

            <div className="background2"></div>
            <div className="background3"></div>
        </>
    )  
   

}

export default Background;