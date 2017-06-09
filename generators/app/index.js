'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      `Welcome to the posh ${chalk.red('generator-vue-seed')} generator!`
    ));

    const prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'Please input project name (vue-project):',
      default: 'vue-project'
    }, {
      type: 'input',
      name: 'userName',
      message: 'Please input your name:'
    }, {
      type: 'input',
      name: 'email',
      message: 'Please input your email:'
    }, {
      type: 'input',
      name: 'description',
      message: 'Please input project description:'
    }, {
      type: 'input',
      name: 'version',
      message: 'Please input project version (0.1.0):',
      default: '0.1.0'
    }, {
      type: 'input',
      name: 'repository',
      message: 'Please input project git repository:'
    }];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  default() {
    if (path.basename(this.destinationPath()) !== this.props.projectName) {
      this.log(`Your generator must be inside a folder named ${this.props.projectName}
                I'll automatically create this folder.`);

      mkdirp.sync(this.props.projectName);
      this.destinationRoot(this.destinationPath(this.props.projectName));
    }
  }
  _copy(from, to) {
    if (to === undefined) {
      to = from;
    }
    this.fs.copy(
      this.templatePath(from),
      this.destinationPath(to)
    );
  }
  writing() {
    this._copy('conf');
    this._copy('src');
    this._copy('.babelrc');
    this._copy('gitignore', '.gitignore');
    this._copy('webpack.config.js');
    this._copy('README.md');
    this._copy('LICENSE');

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        projectName: this.props.projectName,
        userName: this.props.userName,
        email: this.props.email,
        description: this.props.description,
        version: this.props.version,
        repository: this.props.repository
      }
    );
  }

  install() {
    this.installDependencies({bower: false, callback: () => {
      this._end();
    }});
  }
  _end() {
    const cmd = chalk.green(`cd ${this.props.projectName}`);
    this.log(`Please run ${cmd}`);
  }
};
