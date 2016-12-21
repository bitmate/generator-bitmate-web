const bitmate = require('bitmate-generator');

module.exports = bitmate.Base.extend({
  initializing() {

  },
  prompting: {
    server() {
      return this.serverPrompts();
    },
    client() {
      return this.clientPrompts();
    }
  },

  composing() {
    this.composeWith(`bitmate-${this.props.server}`, {
      options: {
        framework: this.props.server,
        client: this.props.client,
        skipInstall: this.props.skipInstall,
        skipCache: this.props.skipCache
      }
    }, {
      local: require.resolve(`generator-bitmate-${this.props.server}/generators/app`)
    });

    if (this.props.client !== 'none'){
      this.composeWith(`bitmate-${this.props.client}`, {
        options: {
          framework: this.props.client,
          skipInstall: this.props.skipInstall,
          skipCache: this.props.skipCache
        }
      }, {
        local: require.resolve(`generator-bitmate-${this.props.client}/generators/app`)
      });
    }

    this.composeWith(`bitmate-grunt`, {}, {
      local: require.resolve(`generator-bitmate-grunt/generators/app`)
    });
  }
});
