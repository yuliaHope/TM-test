import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import Head from 'next/head';
import initApollo from './initApollo';
import initRedux from './initRedux';
import { selectEvent } from '../src/actions/index';

function getComponentDisplayName(Component) {
  return Component.displayName || Component.name || 'Unknown';
}

export default ComposedComponent => {
  return class WithData extends Component {
    static displayName = `WithData(${getComponentDisplayName(ComposedComponent)})`;

    static async getInitialProps(ctx) {
      let serverState = {};

      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps({ ...ctx });
      }

      if (!process.browser) {
        const url = { query: ctx.query, pathname: ctx.pathname };

        try {
          await getDataFromTree(this.withDataBody(composedInitialProps, url))
        } catch (error) {
        }
        Head.rewind();

        const redux = initRedux(initApollo());
        const state = redux.getState();

        serverState = {
          apollo: {
            data: state.apollo.data,
          },
        };
      }

      return {
        serverState,
        ...composedInitialProps
      }
    }

    constructor(props) {
      super(props);
    }

    withDataBody(props, url, initState = {}){
      const apollo = initApollo();
      const redux = initRedux(apollo, initState);
       return (
        <ApolloProvider client={apollo} store={redux}>
          <ComposedComponent url={url} {...props} />
        </ApolloProvider>
      )
    }

    render() {
      return this.withDataBody(this.props, {}, this.props.serverState)
    }
  }
}
