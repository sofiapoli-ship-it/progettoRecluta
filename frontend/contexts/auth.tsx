"use client";

import { createContext, useContext } from "react";

const AuthContext = createContext<any>({
  user: {
    username: "sofia",
    email: "sofia@example.com",
    bio: "Questo è un profilo mock-up temporaneo 💙",
  },
  loading: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider
      value={{
        user: {
          username: "sofia",
          email: "sofia@example.com",
          bio: "Questo è un profilo mock-up temporaneo 💙",
        },
        loading: false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}