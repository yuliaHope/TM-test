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
    static propTypes = {
      serverState: PropTypes.object.isRequired,
    }

    static async getInitialProps(ctx) {
      let serverState = {};

      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps({ ...ctx });
      }

      if (!process.browser) {
        const apollo = initApollo();
        const redux = initRedux(apollo);
        const url = { query: ctx.query, pathname: ctx.pathname };

        try {
          await getDataFromTree(
            <ApolloProvider client={apollo} store={redux}>
              <ComposedComponent url={url} {...composedInitialProps} />
            </ApolloProvider>
          )
        } catch (error) {
        }
        Head.rewind();

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
      this.apollo = initApollo();
      this.redux = initRedux(this.apollo, this.props.serverState);
    }

    render() {
      return (
        <ApolloProvider client={this.apollo} store={this.redux}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      )
    }
  }
}
