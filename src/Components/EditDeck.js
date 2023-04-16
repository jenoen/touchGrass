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

import { readDeck, updateDeck } from "../utils/api/index";

export const EditDeck = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const history = useHistory();

  //   initial deck name and description
  const initialFormState = {
    name: deck.name,
    description: deck.description,
    id: deck.id,
  };

  //   this loads the specified deck just using an api listed in the files already
  useEffect(() => {
    async function fetchOneDeck() {
      const abortController = new AbortController();
      try {
        const deckResponse = await readDeck(deckId, abortController.signal);
        // this sets the deck variable to the deck loaded
        setDeck(deckResponse);
      } catch (error) {
        console.error("something went wrong with loading the one deck", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchOneDeck();
  }, [deckId]);

  // setting the form/deck data (this records your keystroke but it doesn't save until SUBMIT)
  const handleChange = ({ target }) => {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  };

  //   setting the form/deck edit buttons
  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await updateDeck({ ...deck }, abortController.signal);
    // to get back to the specificDeck main page
    history.push(`/decks/${deckId}`);
    return response;
  }

  const handleCancel = (event) => {
    console.log("deck creation is canceled");
    setDeck({ ...initialFormState });
    history.push(`/decks/${deckId}`);
  };

  return (
    <>
      {/* Nav Bar */}
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li class="breadcrumb-item">
            <a href={`/decks/${deck.id}`}>{deck.name}</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      {/* Form - for editing a deck of cards */}
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <h1>Edit Deck</h1>

        {/* Field - name of deck */}
        <label className="mt-2">Name</label>
        <input
          id="name"
          type="textarea"
          name="name"
          className="form-control"
          onChange={handleChange}
          value={deck.name}
        />

        {/* Field - description of deck */}
        <label className="mt-3">Description</label>
        <textarea
          id="description"
          type="text"
          name="description"
          className="form-control"
          onChange={handleChange}
          value={deck.description}
        />
        <button className="btn btn-secondary mt-3" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-primary mx-2 mt-3" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default EditDeck;
