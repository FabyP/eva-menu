import React,  { createContext, useReducer, useEffect }from 'react'
import http from '../http-common';
const GlobalStateContext = React.createContext()
const GlobalDispatchContext = React.createContext()


function globalReducer(state, action) {
  switch (action.type) {
    case 'SET_CART_COUNT': {
      
      return {cartCount: action.payload}
    }
    case 'INC_CART_COUNT': {
      console.log(state.cartCount); 
     
      return {cartCount: state.cartCount+1}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}


function GlobalProvider({children}) {
    const [state, dispatch] = useReducer(globalReducer, {cartCount: 0})
    const fetchCartCount = async() => {
        await http.get('/cart/count')
        .then(function (response) {
            dispatch({type: 'SET_CART_COUNT', payload: response.data.data.count});
        })
        .catch(function (error) {
            console.log(error);
        })
    };
    function incrementCartCount(){
      dispatch({type: 'INC_CART_COUNT'});

    }
  return (
    <GlobalStateContext.Provider value={{cartCount: state.cartCount,fetchCartCount,incrementCartCount}}>
      <GlobalDispatchContext.Provider value={{dispatch, fetchCartCount }}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}
function useGlobalState() {
  const context = React.useContext(GlobalStateContext)
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalProvider')
  }
  return context
}
function useGlobalDispatch() {
  const context = React.useContext(GlobalDispatchContext)
  if (context === undefined) {
    throw new Error('useGlobalDispatch must be used within a GlobalProvider')
  }
  return context
}
export {GlobalProvider, useGlobalState, useGlobalDispatch}