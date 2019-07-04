import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import AppLayout from "../components/AppLayout";

import withRedux from "next-redux-wrapper";
import {applyMiddleware, compose, createStore} from "redux";
import {Provider } from "react-redux";
import reducer from "../reducers";




const ReactProject = ({ Component, store }) => {

  return (
    <Provider  store={store}>
      <Head>
        <title>react-project</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css"/>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.js" />
      </Head>
      <AppLayout>
        <Component style={{marginBottom:"30vh"}}/>
      </AppLayout>
    </Provider >
  )
}

ReactProject.propTypes = {
  Component: PropTypes.elementType,
  store: PropTypes.object,
}


export default withRedux((initialState, options) => {
  const middlewares = [];
  const enhancer = compose(
    applyMiddleware(...middlewares),
    !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
  );
  const store = createStore(reducer, initialState, enhancer);
  return store;
})(ReactProject);
