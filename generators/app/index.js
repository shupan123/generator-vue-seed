'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const mkdirp = require('mkdirp');

const copy = function (from, to) {
  if (to === undefined) {
    to = from;
  }
  this.fs.copy(
    this.templatePath(from),
    this.destinationPath(to)
  );
};

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
      message: 'Please input project git repository (https://github.com/shupan123/generator-vue-seed.git):',
      default: 'https://github.com/shupan123/generator-vue-seed.git'
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
  writing() {
    copy.call(this, 'conf');
    copy.call(this, 'src');
    copy.call(this, '.babelrc');
    copy.call(this, 'webpack.config.js');
    copy.call(this, '.gitignore');
    copy.call(this, 'README.md');
    copy.call(this, 'LICENSE');

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
    this.installDependencies({bower: false});
  }
};
