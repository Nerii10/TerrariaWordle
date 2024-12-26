import { useState, useEffect } from "react";
import data from './Data'; 
import { motion } from 'framer-motion';
import { fadeIn } from "../../../variant";
import { fadeIn2 } from "../../../variant2";

function ItemList() {
  const [UserGuess, SetUserGuess] = useState("");
  const [UserItems, setUserItems] = useState([]);
  const [TodayItems, setTodayItems] = useState([]);
  const [Guessed, setGuessed] = useState(false);
  const [UserScore, setUserScore] = useState(0);
  const [SerachList, setSearchList] = useState([]);
  const [Hint, setHint] = useState("");
  const [HintShowImage, setHintShowImage] = useState(false);
  const [CurrentHint, setCurrentHint] = useState(0);

  // Adds an item to the user's list if the guess is correct
  function addItem() {
    if (!Guessed) {
      let item = data.find(item => item.name.toLowerCase() === UserGuess.toLowerCase());
      if (item) {
        if (!UserItems.some(item => item.name.toLowerCase() === UserGuess.toLowerCase())) {
          if (UserGuess === TodayItems[0].name) {
            setUserItems([...UserItems, item]);
            setGuessed(true);
            SetUserGuess("");
          } else {
            setUserItems([...UserItems, item]);
            setUserScore(UserScore + 1);
            SetUserGuess("");
          }
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
    setSearchList(data.filter(item => item.name.toLowerCase().startsWith(UserGuess.toLowerCase())));
  }

  // Handles the hint logic
  function handleHint(x) {
    switch (x) {
      case 1:
        if (UserScore < 3) {
          setHint(`try ${-UserScore + 3} more times`);
          return;
        }
        if (CurrentHint === 1) {
          setHint("");
          setCurrentHint(0);
          setHintShowImage(false);
          return;
        }
        setHint(TodayItems[0].sell);
        setCurrentHint(1);
        setHintShowImage(false);
        break;

      case 2:
        if (UserScore < 5) {
          setHint(`try ${-UserScore + 5} more times`);
          return;
        }
        if (CurrentHint === 2) {
          setHint("");
          setCurrentHint(0);
          setHintShowImage(false);
          return;
        }
        setHint("No description");
        setHintShowImage(false);
        setCurrentHint(2);
        break;

      case 3:
        if (UserScore < 7) {
          setHint(`try ${-UserScore + 7} more times`);
          return;
        }
        if (CurrentHint === 3) {
          setHint("");
          setCurrentHint(0);
          setHintShowImage(false);
          return;
        }
        setHint(TodayItems[0].id);
        setCurrentHint(3);
        setHintShowImage(true);
        break;
    }
  }

  return (
    <>  
      <div className="background1"></div>
      <div className="background2"></div>
      <div className="background3"></div>
      <h2>your tries: {UserScore}</h2>

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

        <br />

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ textAlign: "center", maxWidth: "50%", height: "50px" }}>
            <p style={{ margin: 0 }}>
              {!HintShowImage ? Hint : ""}
            </p>

            {TodayItems && TodayItems.length > 0 && HintShowImage && (
              <img src={`/TerrariaWordle/ItemImages/${TodayItems[0].id}.png`} alt="item" style={{ filter: "blur(2px)" }} />
            )}
          </div>
        </div>

        <br />

        <div className="nav-inputs">
          <input 
            className="nav-inputs-text" 
            type="text" 
            placeholder="Guess Item" 
            value={UserGuess} 
            onChange={guessItem} 
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
                className={item.id === TodayItems[0].id ? "guessed" : "missed"} 
                variants={fadeIn("down", 0.1)} 
                initial="hidden" 
                whileInView="show" 
                viewport={{ once: true }}
              >
                <img src={`/TerrariaWordle/ItemImages/${item.id}.png`} alt="item" />
              </motion.div>

              <motion.div 
                className={item.name === TodayItems[0].name ? "guessed" : "missed"} 
                variants={fadeIn("down", 0.2)} 
                initial="hidden" 
                whileInView="show" 
                viewport={{ once: true }}
              >
                {item.name}
              </motion.div>

              <motion.div 
                className={item.rarity === TodayItems[0].rarity ? "guessed" : "missed"} 
                variants={fadeIn("down", 0.3)} 
                initial="hidden" 
                whileInView="show" 
                viewport={{ once: true }}
              >
                <img src={`/TerrariaWordle/Rarities/${item.rarity}.png`} alt="Rarity" />
              </motion.div>

              <motion.div 
                className={item.damage === TodayItems[0].damage ? "guessed" : "missed"} 
                variants={fadeIn("down", 0.4)} 
                initial="hidden" 
                whileInView="show" 
                viewport={{ once: true }}
              >
                {item.damage}
              </motion.div>

              <motion.div 
                className={item.damageType === TodayItems[0].damageType ? "guessed" : "missed"} 
                variants={fadeIn("down", 0.5)} 
                initial="hidden" 
                whileInView="show" 
                viewport={{ once: true }}
              >
                {item.damageType}
              </motion.div>

              <motion.div 
                className={item.speed === TodayItems[0].speed ? "guessed" : "missed"} 
                variants={fadeIn("down", 0.6)} 
                initial="hidden" 
                whileInView="show" 
                viewport={{ once: true }}
              >
                {item.speed}
              </motion.div>

              <motion.div 
                className={item.knockback === TodayItems[0].knockback ? "guessed" : "missed"} 
                variants={fadeIn("down", 0.7)} 
                initial="hidden" 
                whileInView="show" 
                viewport={{ once: true }}
              >
                {item.knockback}
              </motion.div>

              <motion.div 
                className={item.material === TodayItems[0].material ? "guessed" : "missed"} 
                variants={fadeIn("down", 0.8)} 
                initial="hidden" 
                whileInView="show" 
                viewport={{ once: true }}
              >
                {item.material == true ? "Material" : "Not Material"}
              </motion.div>

              <motion.div 
                className={item.obtained === TodayItems[0].obtained ? "guessed" : "missed"} 
                variants={fadeIn("down", 0.9)} 
                initial="hidden" 
                whileInView="show" 
                viewport={{ once: true }}
              >
                {item.obtained}
              </motion.div>

              <motion.div 
                className={item.sell === TodayItems[0].sell ? "guessed" : "missed"} 
                variants={fadeIn("down", 1)} 
                initial="hidden" 
                whileInView="show" 
                viewport={{ once: true }}
              >
                {item.sell}
              </motion.div>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </>
  );
}

export default ItemList;
