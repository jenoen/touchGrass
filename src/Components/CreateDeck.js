// DONE

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

import { listDecks, createDeck } from "../utils/api/index";

export const CreateDeck = () => {
  const [decks, setDecks] = useState({});

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

  const [newDeckData, setNewDeckData] = useState({});
  const history = useHistory();

  const handleChange = ({ target }) => {
    setNewDeckData({
      ...newDeckData,
      [target.name]: target.value,
      id: decks.length + 1,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await createDeck(
      { ...newDeckData },
      abortController.signal
    );

    history.push(`/decks/${newDeckData.id}`);
    return response;
  }

  const handleCancel = (event) => {
    console.log("deck creation is canceled");
    history.push("/");
  };

  return (
    <>
      {/* Nav Bar */}
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>

      {/* Form - for creating a deck of cards */}
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <h1>Create Deck</h1>

        {/* Field - name of deck */}
        <label>Name</label>
        <input
          id="name"
          type="textarea"
          name="name"
          className="form-control"
          onChange={handleChange}
          value={newDeckData.name}
        />

        {/* Field - description of deck */}
        <label className="mt-3">Description</label>
        <textarea
          id="description"
          type="text"
          name="description"
          className="form-control "
          onChange={handleChange}
          value={newDeckData.description}
        />
        <button className="btn btn-secondary my-3" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-primary mx-2" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default CreateDeck;
