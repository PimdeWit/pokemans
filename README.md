#### Prerequisites

This project requires the following major dependencies:

- Node.js, used to run JavaScript tools from the command line.
- npm, the node package manager, installed with Node.js and used to install Node.js packages.
- gulp, a Node.js-based build tool.
- bower, a Node.js-based package manager used to install front-end packages.
- SASS, a CSS compiler.


***. Note: All commands `highlighted` are supposed to be executed inside the Command Prompt (or Terminal on Mac) .***

**To install dependencies:**

0) Install SASS [sass-lang.com](https://sass-lang.com/install)


---

1)  Check your Node.js version.

`node --version`

- The version should be at or above 0.12.x.


---

2)  If you don't have Node.js installed, or you have a lower version, go to [nodejs.org](https://nodejs.org) and click on the big green Install button.


---


3)  Install `gulp` and `bower` globally.

`sudo npm install -g gulp bower`


- This lets you run `gulp` and `bower` from the command line.

---

4)  Install the projects `npm` and `bower` dependencies.

`cd path/to/pokemans && sudo npm install && bower install`




#### Everything installed? Lets set up our server.

`gulp serve`

This outputs an IP address you can use to locally test and another that can be used on devices connected to your network.
