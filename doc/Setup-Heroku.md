# Project setup

In order to set up the project on heroku, perform the following steps:

* **Install [Heroku Toolbelt](https://toolbelt.heroku.com/)**.
* **Clone from github** `git clone https://github.com/codefoundries/isomorphic-material-relay-starter-kit`.
* **Create an app** `heroku create`.
* **Specify JWT secret** using `heroku config:set JWT_SECRET=tMMoDN3WCZWoV13wpBjUVcgLQRrCP3c3veNMMV5JlxNelC23oAja8eTVSzgK94LR9TpmLrwqGfuiSzOQ` where you replace the secret value with a secret of your choosing. Verify that the value is set with `hroku config`.
* **Deploy the app** `git push heroku master`.

For more information refer to [Getting Started with Node.js on Heroku - Deploy the app](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app)
