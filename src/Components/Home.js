// done

import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useRouteMatch,
  useLocation,
  useHistory,
} from "react-router-dom";
import CreateDeck from "./CreateDeck";
import Deck from "./Deck";
import { listDecks, deleteDeck } from "../utils/api/index";

export const Home = () => {
  const [decks, setDecks] = useState([]); // this is a state function
  const history = useHistory();

  //   this loads the deck of cards just  using an api listed in the files already
  useEffect(() => {
    async function fetchDecks() {
      const abortController = new AbortController();
      try {
        const deckResponse = await listDecks(abortController.signal);
        setDecks(deckResponse);
      } catch (error) {
        console.error("something went wrong with loading the decks", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchDecks();
  }, []);

  // this is a handler to delete post upon click (refers to the "deck" that has been mapped)
  async function handleDelete(deck) {
    const result = window.confirm(
      `Delete this deck? You will not be able to recover it`
    );
    if (result) {
      await deleteDeck(deck.id); //this fx was from the list of api pre-created
      history.go("/");
    }
  }

  return (
    <>
      <div className="button">
        {/* this is the button that links to Create New Deck page */}
        <Link to="/decks/new">
          <button className="btn btn-secondary"> &#43; Create Deck</button>
        </Link>
        <br />

        {/* This is the "card section" the list of decks */}
        {/* take "decks" and map it */}
        <div className="card-deck mt-4">
          {decks.map((deck) => {
            return (
              <div class="card" key={deck.id}>
                <div class="card-body">
                  <h5 class="card-title">{deck.name}</h5>
                  <div className="card-subtitle text-muted">
                    {`${deck.cards.length} cards`}
                  </div>
                  <p class="card-text">{deck.description}</p>
                  <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
                    View
                  </Link>
                  <Link
                    to={`/decks/${deck.id}/study`}
                    className="btn btn-primary mx-2"
                  >
                    Study
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(deck)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
