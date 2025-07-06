// src/utils/logger.js
export const createLogger =
  moduleTag =>
  (fnTag, ...msgs) => {
    if (__DEV__) {
      console.log(`[${moduleTag}] [${fnTag}]`, ...msgs);
    }
  };
