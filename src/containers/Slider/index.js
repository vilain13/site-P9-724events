import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) => 
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1 // modification de l'ordre de tri > au lieu de < pour avoir un ordre décroissant
  ); 
  const nextCard = () => {
    if (byDateDesc) {  // ajout du test pour éléminer le warning sur l'élémént non défini
      setTimeout( () => setIndex(index < byDateDesc.length-1 ? index + 1 : 0),  5000 // modification du test sur nombre enregistrements maxi à afficher en tenant compte id démarre à 0 et pas 1
      );
    }
  };
  useEffect(() => {
    nextCard();
  }, [index, byDateDesc]); // Ajout des dépendances dans hook useEffect
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => ( 
        <div key={event.title}>  {/* Utilisation d'une div avec la clé unique plutot qu'un fragment sans clé unique */}
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt={event.desscription} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={_.date} // changemnent de clé unique 
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} // remplacement idx par index pour indiquer la position de l'image affichée
                  readOnly // ajout pour éviter que l'utilisateur  modifier le bouton radio
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
