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

import { readDeck, deleteCard, deleteDeck } from "../utils/api/index";

export const Deck = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const history = useHistory();

  //   this loads the specified deck just using an api listed in the files already
  useEffect(() => {
    async function fetchOneDeck() {
      const abortController = new AbortController();
      try {
        const deckResponse = await readDeck(deckId, abortController.signal);
        setDeck(deckResponse);
        setCards(deckResponse.cards);
      } catch (error) {
        console.error("something went wrong with loading the one deck", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchOneDeck();
  }, [deckId]);

  //   handles deleting the deck
  async function handleDeleteDeck(deck) {
    const result = window.confirm(
      `Delete this deck? You will not be able to recover it`
    );
    if (result) {
      await deleteDeck(deck.id); //this fx was from the list of api pre-created
      history.push("/");
    }
  }

  //   handles deleting a card in the deck
  async function handleDeleteCard(card) {
    const result = window.confirm(
      `Delete this card? You will not be able to recover it`
    );
    if (result) {
      await deleteCard(card.id); //this fx was from the list of api pre-created
      history.go(`/decks/${deckId}`);
    }
  }

  return (
    <>
      {/* Nav Bar */}
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>

      {/* brief description */}
      <div>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
      </div>

      {/* List of Action Buttons that lead to different pages regarding the deck*/}
      <Link to={`/decks/${deck.id}/edit`} className="btn btn-primary">
        Edit
      </Link>
      <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mx-2">
        Study
      </Link>
      <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
        Add Card
      </Link>
      <button
        className="btn btn-danger mx-2"
        onClick={() => handleDeleteDeck(deck)}
      >
        Delete
      </button>

      {/* list of cards */}
      {/* we will map out the cards and each button */}
      <h1 className="mt-4">Cards</h1>
      <div class="card-deck">
        {cards.map((card) => {
          return (
            <div class="card" key={card.id}>
              <div class="card-body">
                <p class="card-front">{card.front}</p>
                <p class="card-back">{card.back}</p>
                <Link
                  to={`/decks/${deck.id}/cards/${card.id}/edit`}
                  className="btn btn-secondary"
                >
                  Edit
                </Link>

                <button
                  className="btn btn-danger mx-2"
                  onClick={() => handleDeleteCard(card)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Deck;
