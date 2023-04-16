// DONE

import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useRouteMatch,
  useLocation,
  useParams,
  useHistory,
} from "react-router-dom";

import { readDeck } from "../utils/api/index";

export const Study = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]); // note that this is an array! impt!
  const [cardNumber, setCardNumber] = useState(1);
  const [frontOfCard, isFrontOfCard] = useState(true);
  const history = useHistory();

  //   this loads the specified deck just using an api listed in the files already
  useEffect(() => {
    async function fetchOneDeck() {
      const abortController = new AbortController();
      try {
        const deckResponse = await readDeck(deckId, abortController.signal);
        setDeck(deckResponse);
        setCards(deckResponse.cards); // this sets an array of the cards from the deck
      } catch (error) {
        console.error("something went wrong with loading the one deck", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchOneDeck();
  }, [deckId]);

  // "flip" functionality/handler
  function flipCard() {
    if (frontOfCard) {
      isFrontOfCard(false); // if frontOfCard is TRUE > set variable to false
    } else {
      isFrontOfCard(true);
    }
  }

  // "next" functionality + restart prompt
  function nextCard(currentCardIndex, totalCards) {
    console.log(currentCardIndex);
    if (currentCardIndex < totalCards) {
      setCardNumber(cardNumber + 1);
      isFrontOfCard(true);
    } else {
      if (
        window.confirm(
          `Restart cards? Click 'cancel' to return to the home page`
        )
      ) {
        setCardNumber(1);
        isFrontOfCard(true);
      } else {
        history.push("/");
      }
    }
  }

  // when to show the "next button" (The Next button appears after the card is flipped.)
  function showNextButton(cards, currentCardIndex) {
    if (frontOfCard) {
      return null;
    } else {
      return (
        <button
          onClick={() => nextCard(currentCardIndex + 1, cards.length)}
          className="btn btn-primary mx-1"
        >
          Next
        </button>
      );
    }
  }

  // enough cards screen
  function enoughCards() {
    return (
      // mapping out the cards
      <div className="card">
        {cards.map((card, index) => {
          if (index === cardNumber - 1) {
            return (
              <div className="card-body" key={card.id}>
                <div className="card-title">
                  <h3>{`Card ${index + 1} of ${cards.length}`}</h3>
                </div>
                <div className="card-text">
                  {frontOfCard ? card.front : card.back}
                </div>
                <button onClick={flipCard} className="btn btn-secondary mx-1">
                  Flip
                </button>
                {showNextButton(cards, index)}
              </div>
            );
          }
        })}
      </div>
    );
  }

  // not enough cards screen with "add cards" button/link
  function notEnoughCards() {
    return (
      <div>
        <h2>Not enough cards.</h2>
        <p>
          You need at least 3 cards to study. There are {cards.length} cards in
          this deck.
        </p>
        <Link
          to={`/decks/${deck.id}/cards/new`}
          className="btn btn-primary mx-1"
        >
          Add Cards
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Nav Bar */}
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li class="breadcrumb-item">
            <a href={`/decks/${deckId}`}>{deck.name}</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>

      {/* Title */}
      <h1>{deck.name}: Study</h1>

      {/* decides on which screen to display:  */}
      <div>{cards.length > 2 ? enoughCards() : notEnoughCards()}</div>
    </>
  );
};

export default Study;
