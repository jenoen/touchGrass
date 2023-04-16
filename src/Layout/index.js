import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import AddCard from "../Components/AddCard";
import CreateDeck from "../Components/CreateDeck";
import Deck from "../Components/Deck";
import EditCard from "../Components/EditCard";
import EditDeck from "../Components/EditDeck";
import Home from "../Components/Home";
import Study from "../Components/Study";
import Post from "../Components/Post";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        {/* The routes have to be in a specific order */}

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/new">
            <Post />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          {/* this is the last route for "not found" */}
          <NotFound />
        </Switch>
      </div>
    </>
  );
}

export default Layout;
