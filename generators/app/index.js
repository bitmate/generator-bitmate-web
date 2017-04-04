const bitmate = require('@oligibson/bitmate-generator');

module.exports = bitmate.Base.extend({
  prompting() {
    return this.bitmatePrompts();
  },

  composing() {
    if (this.props.server !== 'none') {
      this.composeWith(`bitmate-${this.props.server}`, {
        options: {
          framework: this.props.server,
          client: this.props.client,
          runner: this.props.runner,
          skipInstall: this.props.skipInstall,
          skipCache: this.props.skipCache
        }
      }, {
        local: require.resolve(`@oligibson/generator-bitmate-${this.props.server}/generators/app`)
      });
    }

    if (this.props.client !== 'none') {
      this.composeWith(`bitmate-${this.props.client}`, {
        options: {
          framework: this.props.client,
          css: this.props.css,
          html: this.props.html,
          js: this.props.js,
          modules: this.props.modules,
          runner: this.props.runner,
          skipInstall: this.props.skipInstall,
          skipCache: this.props.skipCache
        }
      }, {
        local: require.resolve(`@oligibson/generator-bitmate-${this.props.client}/generators/app`)
      });
    }

    this.composeWith(`bitmate-${this.props.runner}`, {
      options: {
        client: this.props.client,
        modules: this.props.modules,
        css: this.props.css,
        js: this.props.js,
        skipInstall: this.props.skipInstall,
        skipCache: this.props.skipCache
      }
    }, {
      local: require.resolve(`@oligibson/generator-bitmate-${this.props.runner}/generators/app`)
    });

    this.composeWith(`bitmate-readme`, {
      options: {
        client: this.props.client,
        modules: this.props.modules,
        css: this.props.css,
        js: this.props.js,
        skipInstall: this.props.skipInstall,
        skipCache: this.props.skipCache
      }
    }, {
      local: require.resolve(`@oligibson/generator-bitmate-readme/generators/app`)
    });
  }
});
