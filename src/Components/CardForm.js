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

import { readDeck, createCard, readCard, updateCard } from "../utils/api/index";

export const CardForm = ({ create = false }) => {
  const { deckId, cardId } = useParams();

  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const history = useHistory();

  //   this loads the specified deck just using an api listed in the files already
  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const cardResponse = await readCard(cardId, abortController.signal);
        const deckResponse = await readDeck(deckId, abortController.signal);
        // this sets the deck and card variable to the deck/card loaded
        setDeck(deckResponse);
        setCard(cardResponse);
      } catch (error) {
        console.error("something went wrong with loading the one deck", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, [deckId, cardId]);

  // setting the form/card data (this records your keystroke but it doesn't save until SUBMIT)
  const handleChange = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  };

  //   setting the form/deck edit buttons
  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    // created a variable that lets me know which page is calling the form
    if (create) {
      setCard({ ...card });
      const response = await createCard(
        deckId,
        { ...card },
        abortController.signal
      );
      history.push(`/decks/${deckId}`);
      return response;
    } else {
      const response = await updateCard({ ...card }, abortController.signal);
      // to get back to the specificDeck main page
      history.push(`/decks/${deckId}`);
      return response;
    }
  }

  const handleCancel = (event) => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <>
      {/* Form - for editing a card */}
      <form onSubmit={handleSubmit}>
        {/* Field - front of card */}
        <label>Front</label>
        <textarea
          id="front"
          type="text"
          name="front"
          className="form-control"
          onChange={handleChange}
          value={card.front}
        />

        {/* Field - back of card */}
        <label className="mt-3">Back</label>
        <textarea
          id="back"
          type="text"
          name="back"
          className="form-control"
          onChange={handleChange}
          value={card.back}
        />
        <button className="btn btn-secondary mt-3" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-primary mt-3 mx-2" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default CardForm;
