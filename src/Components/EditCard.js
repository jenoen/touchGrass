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
import CardForm from "./CardForm.js";

export const EditCard = () => {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});

  //   this loads the specified deck just using an api listed in the files already
  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      try {
        const deckResponse = await readDeck(deckId, abortController.signal);

        // this sets the deck and card variable to the deck/card loaded
        setDeck(deckResponse);
      } catch (error) {
        console.error("something went wrong with loading the one deck", error);
      }
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, [deckId, cardId]);

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
            Edit Card {cardId}
          </li>
        </ol>
      </nav>

      {/* title */}
      <h1>Edit Card</h1>

      {/* Form */}
      <CardForm create={false} />
    </>
  );
};

export default EditCard;
