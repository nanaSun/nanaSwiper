import {createContext} from 'react';

const createNamedContext = name => {
  const context = createContext();
  context.Provider.displayName = `${name}.Provider`;
  context.Consumer.displayName = `${name}.Consumer`;
  return context;
}

const context = createNamedContext('Swiper');
export default context;