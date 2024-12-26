import { useState } from 'react'
import ItemList from './assets/Components/ItemList'
import { motion } from 'framer-motion'
import { fadeIn } from '../variant'
import Background from './assets/Components/backgrounds'

function App() {

  return (
    <>
      <Background></Background>

      <body>
        <motion.div variants={fadeIn("down",0)} initial="hidden" whileInView="show"  className="GameLogoContainer">
          <img src='/TerrariaWordle//logo.png' className='GameLogo'></img>
        </motion.div>
       


        <div className="ItemList">
          <ItemList></ItemList>
        </div>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>

      </body>
    </>
  )
}

export default App
