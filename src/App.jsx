import { useState } from 'react'
import ItemList from './assets/Components/ItemList'
import { motion } from 'framer-motion'
import { fadeIn } from '../variant'
function App() {

  return (
    <>
      <body>
        <motion.div variants={fadeIn("down",0)} initial="hidden" whileInView="show" viewport={{ once: true }} className="Text">
          <img src='/logo.png'></img>
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
