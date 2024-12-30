/** @format */
'use client';
import { createContext, useContext, useState } from 'react';
import { GlobalPageContext } from '@//types/GlobalContext';

const PageContext = createContext<GlobalPageContext | undefined>(undefined);

export const PageContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSignUpButtonClicked, setIsSignUpButtonClicked] =
    useState<boolean>(false);
  const [isLoginButtonClicked, setIsLoginButtonClicked] =
    useState<boolean>(false);

  return (
    <PageContext.Provider
      value={{
        isSignUpButtonClicked,
        setIsSignUpButtonClicked,
        isLoginButtonClicked,
        setIsLoginButtonClicked,
      }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error('usePageContext must be used within a PageContextProvider');
  }
  return context;
};
