"use client";
import React from "react";

type ImageLoadHistory = Map<
  string,
  {
    src: string;
    resolution: {
      width: number;
      height: number;
    };
  }
>;

const ImageLoadContext = React.createContext<{
  history: ImageLoadHistory;
  addImageToHistory: (
    src: string,
    data: {
      src: string;
      resolution: {
        width: number;
        height: number;
      };
    },
  ) => void;
} | null>(null);

export function ImageLoadContextProvider(props: { children: React.ReactNode }) {
  const [history, setHistory] = React.useState<ImageLoadHistory>(new Map());

  const addImageToHistory = React.useCallback(
    (
      src: string,
      data: {
        src: string;
        resolution: {
          width: number;
          height: number;
        };
      },
    ) => {
      setHistory((prev) => {
        const newHistory = new Map(prev);
        newHistory.set(src, data);
        return newHistory;
      });
    },
    [],
  );

  return (
    <ImageLoadContext.Provider value={{ history, addImageToHistory }}>
      {props.children}
    </ImageLoadContext.Provider>
  );
}

export function useImageLoadHistory() {
  const context = React.useContext(ImageLoadContext);
  if (!context) {
    throw new Error(
      "useImageLoadHistory must be used within a ImageLoadContextProvider",
    );
  }
  return context;
}
