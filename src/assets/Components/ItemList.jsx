import { useState, useEffect } from "react";
import data from './Data'; 
import { motion } from 'framer-motion';
import { fadeIn } from "../../../variant";
import { fadeIn2 } from "../../../variant2";
import { fadeIn3 } from "../../../variant3";
import rarityData from './rarity.json';
import { fadeIn4 } from "../../../variant4";
function ItemList() {
  const [UserGuess, SetUserGuess] = useState("");
  const [UserItems, setUserItems] = useState([]);
  const [TodayItems, setTodayItems] = useState([]);
  const [Guessed, setGuessed] = useState(false);
  const [UserScore, setUserScore] = useState(0);
  const [SerachList, setSearchList] = useState([]);
  const [CurrentHintButton, setCurrentHintButton] = useState(0);


  // Adds an item to the user's list if the guess is correct
  function addItem() {
    if (!Guessed) {
      let item = data.find(item => item.name.toLowerCase() === UserGuess.toLowerCase());
      if (item) {
        if (!UserItems.some(item => item.name.toLowerCase() === UserGuess.toLowerCase())) 
          {
          if (UserGuess === TodayItems[0].name) {
            setUserItems([...UserItems, item]);
            setGuessed(true);
            SetUserGuess("");
          } else {
            {console.log(item.obtained)}
            setUserItems([...UserItems, item]);
            setUserScore(prevScore => prevScore + 1)
            SetUserGuess("");
          }
        } else
        {
          SetUserGuess("");
        }
      } else
      {
        if(SerachList[0])
          {
          SetUserGuess(SerachList[0].name)
          }
      }
    }
  }

  // Updates the user's guess
  function guessItem(event) {
    SetUserGuess(event.target.value);
  }

  // Selects a random item for the day
  useEffect(() => {
    TodayItemRandom();
  }, []);

  function TodayItemRandom() {
    const randomIndex = Math.floor(Math.random() * data.length);
    setTodayItems([data[randomIndex]]);
  }

  // Updates the search list based on the user's guess
  useEffect(() => {
    UpdateSerachList();
  }, [UserGuess]);

  function UpdateSerachList() {
    if (UserGuess === "") {
      setSearchList([]);
      return;
    }
    setSearchList(data.filter(item => item.name.toLowerCase().includes(UserGuess.toLowerCase())));
  }

  function handleHint(x) {
    const hint = Array.from(document.getElementsByClassName("hint")); // Konwertujemy HTMLCollection na tablicę

    if (CurrentHintButton === x) {
        setCurrentHintButton(0);
        hint.forEach((item) => {
            item.style.display = "none";
        });
        return;
    }

    // Jeśli kliknięto 0, ukryj wszystkie wskazówki przed ustawieniem nowego widoku
    if (x === 0) {
        hint.forEach((item) => {
            item.style.display = "none";
        });
    } else {
        hint.forEach((item, index) => {
            item.style.display = index === x - 1 ? "block" : "none";
        });
    }

    setCurrentHintButton(x);
}

function handleKeyDown(event) {
  if (event.key === "Enter") {
          if(SerachList[0])
            {
            SetUserGuess(SerachList[0].name)
            }

    addItem(); 
  }
}
function restartGame() {
  setGuessed(false);
  setUserItems([]);
  setUserScore(0);
  TodayItemRandom();
}

  return (
    <>  
      


      

      <motion.button onClick={restartGame} className="RestartButton"
       whileTap={{ scale: 1.25, rotate: "-5deg"}}
       variants={fadeIn4("down",0)}
       initial="hidden" 
       whileInView="show" 
       transition={{ duration:0.1 }} 
       viewport={{once: false}}
      >Restart</motion.button>


      
      
      
      
      <motion.div 
        className="nav" 
        variants={fadeIn("down", 0.2)} 
        initial="hidden" 
        whileInView="show" 
        transition={{ duration: 0.2 }} 
        viewport={{ once: true }}
      >
        <div className="nav-hints">
          <motion.button 
            className="hint-button" 
            whileTap={{ scale: 1.5, rotate: "5deg" }} 
            onClick={() => handleHint(1)}
          >
            <img src="/TerrariaWordle/Hints/selling_price_hint.png" alt="selling price hint" />
          </motion.button>
          <motion.button 
            className="hint-button" 
            whileTap={{ scale: 1.5, rotate: "5deg" }} 
            onClick={() => handleHint(2)}
          >
            <img src="/TerrariaWordle/Hints/tooltip_hint.png" alt="tooltip hint" />
          </motion.button>
          <motion.button 
            className="hint-button" 
            whileTap={{ scale: 1.5, rotate: "5deg" }} 
            onClick={() => handleHint(3)}
          >
            <img src="/TerrariaWordle/Hints/image_hint.png" alt="image hint" />
          </motion.button>
        </div>
        <h2 style={{margin:0 ,textAlign:"center", fontSize:"20px"}}>Attempts: {UserScore}</h2>
        
        <br></br>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
  {TodayItems && TodayItems.length > 0 ? (
    <p style={{ position: "absolute", display: "none" }} className="hint">{TodayItems[0].sell}</p>
  ) : <p>No items available</p>}

  <p style={{ position: "absolute", display: "none", width:"200px",overflow:"hidden", height:"60px", textAlign:"center" }} className="hint">{TodayItems[0] ? `${TodayItems[0].tooltip}` : "No Description"}</p>
  
  {TodayItems && TodayItems.length > 0 && TodayItems[0].id ? (
    <img style={{ position: "absolute", display: "none",filter: "drop-shadow(0px 10px 0.1px rgba(0, 0, 0, 0.486))", zIndex:0}} className="hint" src={`/TerrariaWordle/ItemImages/${TodayItems[0].id}.png`} alt="item" />
  ) : <p>Image not available</p>}
</div>
<br></br>
        <br></br>
      
        <div className="nav-inputs">
          <input 
            className="nav-inputs-text" 
            type="text" 
            placeholder="Guess Item" 
            value={UserGuess} 
            onChange={guessItem} 
            onKeyDown={handleKeyDown}
          />
          <motion.button 
            className="guess-button" 
            onClick={() => { addItem(); handleButtonClick(); }} 
            whileTap={{ scale: 1.5, rotate: "5deg" }}
          >
            Guess
          </motion.button>
        </div>

        <div className="search-listUp">
          <div className={UserGuess === "" ? "search-list-disabled" : "search-list"}>
            {SerachList.length === 0 ? (
              <p>No Items Found</p>
            ) : (
              SerachList.map((item, index) => (
                <button 
                  className="search-item" 
                  key={index} 
                  onClick={() => { SetUserGuess(item.name); }} 
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img src={`/TerrariaWordle/ItemImages/${item.id}.png`} className="imgsmall" />
                  <h1 className="search-item-name">{item.name}</h1>
                </button>
              ))
            )}
          </div>
        </div>
      </motion.div>

      <br /><br />
      <div style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
      {Guessed && (
  <motion.h1
    variants={fadeIn3("down")}
    initial="hidden"
    animate="show"
    viewport={{ once: true }}
    className="Win"
  >
    Congratulations, You got it right in {UserScore + 1} attempt!
  </motion.h1>
)}
</div>
<br /><br />
      <motion.div 
        className="item-container" 
        variants={fadeIn("down", 0.4)} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true }}
      >
        <div className="row header">
          {["Image", "Name", "Rarity", "Damage", "DamageType", "Speed", "Knockback", "Material", "Obtained", "Sell Price"].map((header, index) => (
            <motion.div 
              key={index} 
              className="row-header-one" 
              variants={fadeIn("down", 0.5 + index * 0.1)} 
              initial="hidden" 
              whileInView="show" 
              viewport={{ once: true }}
            >
              {header}
            </motion.div>
          ))}
        </div>

        {UserItems.slice().reverse().map((item, index) => (
          <div key={item.id}>
            <motion.div 
              className="row" 
              variants={fadeIn2("left", 0)} 
              initial="hidden" 
              whileInView="show" 
              viewport={{ once: true }}
            >
              <motion.div 
                className={item.id == TodayItems[0].id ? "guessed" : "missed"} 
                variants={fadeIn("down", 0.1)} 
                initial="hidden" 
                whileInView="show" 
                viewport={{ once: true }}
              >
                <img src={`/TerrariaWordle/ItemImages/${item.id}.png`} alt="item" />
              </motion.div>

              <motion.div 
                className={item.name == TodayItems[0].name ? "guessed" : "missed"} 
                variants={fadeIn("down", 0.2)} 
                initial="hidden" 
                whileInView="show" 
                viewport={{ once: true }}
              >
                {item.name}
              </motion.div>

              <motion.div 
                className={item.rarity == TodayItems[0].rarity ? "guessed" : "missed"} 
                variants={fadeIn("down", 0.3)} 
                initial="hidden" 
                whileInView="show" 
                viewport={{ once: true }}
              >
                {rarityData[item.rarity]}
              </motion.div>

              <motion.div 
                className={item.damage == TodayItems[0].damage ? "guessed" : "missed"} 
                variants={fadeIn("down", 0.4)} 
                initial="hidden" 
                whileInView="show" 
                viewport={{ once: true }}
              >
                {item.damage} {Number(item.damage) > Number(TodayItems[0].damage) ? "↓" : Number(item.damage) < Number(TodayItems[0].damage) ? "↑" : ""}
              </motion.div>

              <motion.div 
                className={item.damageType == TodayItems[0].damageType ? "guessed" : "missed"} 
                variants={fadeIn("down", 0.5)} 
                initial="hidden" 
                whileInView="show" 
                viewport={{ once: true }}
              >
                {item.damageType}
              </motion.div>

              <motion.div 
                className={item.speed == TodayItems[0].speed ? "guessed" : "missed"} 
                variants={fadeIn("down", 0.6)} 
                initial="hidden" 
                whileInView="show" 
                viewport={{ once: true }}
              >
                {item.speed}
              </motion.div>

              <motion.div 
                className={item.knockback == TodayItems[0].knockback ? "guessed" : "missed"} 
                variants={fadeIn("down", 0.7)} 
                initial="hidden" 
                whileInView="show" 
                viewport={{ once: true }}
              >
                {item.knockback}
              </motion.div>

              <motion.div 
                className={item.material == TodayItems[0].material ? "guessed" : "missed"} 
                variants={fadeIn("down", 0.8)} 
                initial="hidden" 
                whileInView="show" 
                viewport={{ once: true }}
              >
                {item.material == true ? "Material" : "Not Material"}
              </motion.div>

              <motion.div 
                className={item.obtained.some(el => TodayItems[0].obtained.includes(el)) ? "guessed" : "missed"}
                variants={fadeIn("down", 0.9)} 
                initial="hidden" 
                whileInView="show" 
                viewport={{ once: true }}
              >
                {item.obtained}
              </motion.div>

              <motion.div 
                className={item.sell == TodayItems[0].sell ? "guessed" : "missed"} 
                variants={fadeIn("down", 1)} 
                initial="hidden" 
                whileInView="show" 
                viewport={{ once: true }}
              >
                {item.sell.replace(/\s*coins?$/i, "").trim()}
              </motion.div>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </>
  );
}

export default ItemList;
