# Architect-project
#### Powered by
[![webstap](https://gtosss.github.io/static-public-files/logo-mini-dark.svg)](http://webstap.ru/)

A flexible template generator for any project

  - Implements the generation of files according to a prepared template
  - Allows you to process assets
  - File customization and support for any frameworks
  - Support EsLint/Prettier


### Documentation


[See the full documentation](http://architect-project.webstap.ru/)

### Installation

Architect-project requires [Node.js](https://nodejs.org/) v6+ to run.

Install architect-project with npm

```sh
npm install -D architect-project
```

or yarn
```sh
yarn add --dev architect-project
```

## CLI command structure

To see all commands, write `arc` in your terminal
and you will see this
```shell
Options:
  -V, --version           output the version number
  -w, --watch             use watcher
  -e, --eslint            use esLint
  -mta, --module_to_atom  from module to atom
  -atm, --atom_to_module  from atom to module
  -u, --undo              undoing changes
  -r, --redo              redoing changes
  -c, --config <path>     path of the configuration to use
  -h, --help              display help for command

Commands:
  start|s                 Start architect-project generation
  convert|con             Convert source-map
  change                  Undoing and Redoing Changes
  help [command]          display help for command
```

## Command arc start|s

To start generating files based on templates and source-map,
which we covered in the previous chapters, you need to run
`arc start|s` .

You can run this command with flags
`arc s --watch |--eslint |--config <path>`
>`-w, --watch` - this flag allows you to start tracking files,
> specified in `config.js`

>`-e, --eslint` - this flag starts Eslint, which looks at the generated
> files and makes them look pretty

* there must be files `.eslintrc.js` and` .prettierrc.js`
  if you use this in the root of the project *

> `-c, --config <path>`  - this flag lets you run Architect
> with a custom path to the settings directory


* by default this directory should be named `architect` *

## Command arc convert|con

`arc convert` is used to translate` source-map`
from modular to atomic state


You can run this command with flags
`arc con --module_to_atom | --atom_to_module`

## Command arc change

Every time you use
`arc con --module_to_atom | --atom_to_module` Architect
retains the history of the previous states of `source-map`
If suddenly you did something wrong, you can easily
undo your actions using the command
`arc change`

You can run this command with flags
`arc change --undo | --redo`