# Initial Machine Setup
* **Install [Node.js](https://nodejs.org)**.  
* **Install [Git](https://git-scm.com/downloads)**.

I have only tested this running on MacOS. I am copying the instructions for other operating systems from the **[React Slingshot](https://github.com/coryhouse/react-slingshot)**. I have not had a chance to test them and would appreciate help with that. If you have done that please open an issue with the results whether successful or not, and feel free to PR to update this document and/or the setup.

## **On Linux:**  
Run this to [increase the limit](http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc) on the number of files Linux will watch. [Here's why](https://github.com/coryhouse/react-slingshot/issues/6).    
`echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`

## **On Windows:**  
1. **Install [Python 2.7](https://www.python.org/downloads/)**. Browser-sync (and various other Node modules) rely on node-gyp, which requires Python on Windows.  
2. **Install C++ Compiler**. [Visual Studio Express](https://www.visualstudio.com/en-US/products/visual-studio-express-vs) comes bundled with a free C++ compiler. Or, if you already have Visual Studio installed: Open Visual Studio and go to File -> New -> Project -> Visual C++ -> Install Visual C++ Tools for Windows Desktop. The C++ compiler is used to compile browser-sync (and perhaps other Node modules).


# Project setup

In order to set up the project locally, perform the following steps:

* **Clone from github.** `git clone https://github.com/codefoundries/isomorphic-material-relay-starter-kit`.
* **Install node packages.** `npm install`.
* **Perform initial setup.** `npm run setup-local`.
* **Specify JWT_SECRET** by modifying the `.env` file. This step can be skipped if you do not care about the actual security and simply want to get the project running.
* **Start the server.** `npm run start`.
* **The application is available at:** `http://localhost:4444`.
