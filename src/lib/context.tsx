"use client";

import React, { createContext, useContext, useReducer, useCallback, type ReactNode } from "react";

interface AppState {
  favorites: string[];
  watchHistory: { dramaId: string; episode: number; timestamp: number }[];
  likes: Record<string, boolean>;
  coins: number;
  isLoggedIn: boolean;
  username: string;
  avatar: string;
}

type Action =
  | { type: "TOGGLE_FAVORITE"; dramaId: string }
  | { type: "ADD_HISTORY"; dramaId: string; episode: number }
  | { type: "TOGGLE_LIKE"; episodeId: string }
  | { type: "ADD_COINS"; amount: number }
  | { type: "SPEND_COINS"; amount: number }
  | { type: "LOGIN" }
  | { type: "LOGOUT" };

const initialState: AppState = {
  favorites: [],
  watchHistory: [],
  likes: {},
  coins: 999999,
  isLoggedIn: true,
  username: "Premium User",
  avatar: "https://ui-avatars.com/api/?name=VIP&background=dc2626&color=fff&bold=true",
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "TOGGLE_FAVORITE": {
      const exists = state.favorites.includes(action.dramaId);
      return {
        ...state,
        favorites: exists
          ? state.favorites.filter((id) => id !== action.dramaId)
          : [...state.favorites, action.dramaId],
      };
    }
    case "ADD_HISTORY": {
      const filtered = state.watchHistory.filter(
        (h) => !(h.dramaId === action.dramaId && h.episode === action.episode)
      );
      return {
        ...state,
        watchHistory: [
          { dramaId: action.dramaId, episode: action.episode, timestamp: Date.now() },
          ...filtered,
        ].slice(0, 100),
      };
    }
    case "TOGGLE_LIKE": {
      return {
        ...state,
        likes: { ...state.likes, [action.episodeId]: !state.likes[action.episodeId] },
      };
    }
    case "ADD_COINS":
      return { ...state, coins: state.coins + action.amount };
    case "SPEND_COINS":
      return { ...state, coins: Math.max(0, state.coins - action.amount) };
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        username: "Premium User",
        avatar: "https://ui-avatars.com/api/?name=VIP&background=dc2626&color=fff&bold=true",
      };
    case "LOGOUT":
      return { ...state, isLoggedIn: false, username: "Guest", avatar: "" };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const isFavorite = useCallback(
    (id: string) => state.favorites.includes(id),
    [state.favorites]
  );

  const toggleFavorite = useCallback(
    (id: string) => dispatch({ type: "TOGGLE_FAVORITE", dramaId: id }),
    []
  );

  return (
    <AppContext.Provider value={{ state, dispatch, isFavorite, toggleFavorite }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
