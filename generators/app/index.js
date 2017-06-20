'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const mkdirp = require('mkdirp');
const cp = require('child_process');

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
      type: 'confirm',
      name: 'npm',
      message: 'Would you like to install node dependencies?'
    }, {
      type: 'confirm',
      name: 'vueRouter',
      message: 'Would you like to install vue router?',
      default: false
    }, {
      type: 'confirm',
      name: 'docker',
      message: 'Would you like to build Docker image?',
      default: false
    }, {
      type: 'input',
      name: 'centos',
      message: 'Please input centos registry of docker image (centos):',
      default: 'centos'
    }, {
      type: 'input',
      name: 'nginx',
      message: 'Please input nginx registry of docker image (nginx):',
      default: 'nginx'
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
  _copy(from, to, options) {
    let action = 'copy';
    if (!to) {
      to = from;
    }
    if (options) {
      action = 'copyTpl';
    }

    this.fs[action](
      this.templatePath(from),
      this.destinationPath(to),
      options
    );
  }
  writing() {

    const {
      projectName, 
      version, 
      centos,
      nginx,
      userName,
      email,
      description,
      repository,
      vueRouter
    } = this.props;

    this._copy('conf');
    if (vueRouter) {
      this._copy('src');
    } else {
      this._copy('src/less');
      this._copy('src/index.ejs');
    }
    this._copy('.babelrc');
    this._copy('gitignore', '.gitignore');
    this._copy('webpack.config.js');
    this._copy('README.md');
    this._copy('LICENSE');
    this._copy('CentOS-Base.repo');
    this._copy('bootstrap.sh');
    this._copy('Dockerfile-data');

    this._copy('Dockerfile', null, {
      projectName,
      centos
    });

    this._copy('docker-compose.yaml', null, {
      projectName,
      nginx,
      version
    });

    this._copy(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        projectName,
        userName,
        email,
        description,
        version,
        repository,
        vueRouter
      }
    );

    this._copy('src/index.js', null, {
      vueRouter
    });
    
    this._copy('src/App.vue', null, {
      vueRouter
    });
  }

  install() {
    const {npm, docker} = this.props;

    if (docker) {
      this._buildDocker();
    }

    if (npm) {
      this.installDependencies({bower: false, callback: () => {
        this._end();
      }});
    } else {
      this._end();
    }
  }

  _buildDocker() {
    const {projectName, version, docker} = this.props;
    const cmd = chalk.green(`${projectName}:${version}`);
    // const imageCmd = `docker images | grep ${projectName} | awk '{print $3}'`;

    this.spawnCommandSync('docker', ['build', '-t', `${projectName}:${version}`, '.']);
    this.log(`Build docker image ${cmd} success`);

    // const imageId = cp.spawnSync('sh', ['-c', imageCmd]).stdout.toString().trim();
    // const dockerRunCmd = chalk.green(`docker run -dP ${imageId}`);
    // this.log(`You can run ${dockerRunCmd} to start vue hot server`);
  }

  _end() {

    const {docker} = this.props;

    const cmd = chalk.green(`cd ${this.props.projectName}`);
    this.log(`You can run ${cmd} enter the project`);

    if (docker) {
      this.log(`Then you can run ${chalk.green('docker-compose up -d')} to start web server`)
      this.log(`Then you can visit website by ${chalk.green('http://localhost/dist/')}`);
    }
    
  }
};
