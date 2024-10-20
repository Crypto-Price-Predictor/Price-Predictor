// jest.setup.js
import '@testing-library/jest-dom/extend-expect'; // Adds custom jest matchers for DOM nodes
import '@testing-library/jest-dom';
import 'matchmedia-polyfill';

global.window = Object.create(window);
global.window.matchMedia = global.window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {},
  };
};
