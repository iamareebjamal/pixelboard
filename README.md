# Pixelboard
A Reddit Place pseudo-clone made in Firebase and VueJS


## Live deployment 

### Clone the project locally

*We'll need it later*

1. `git clone https://github.com/iamareebjamal/pixelboard`

### Create a project at [Firebase](https://console.firebase.google.com/)

1. Head to https://console.firebase.google.com/
2. Sign in with Google
3. Create "Create a Project"
4. Enter a project name - other details can be left default

### Enable Free Hosting

#### Configure Project Rules for You

1. From any Firebase console page, get your *Project ID* from the URL bar

![Project ID example](https://i.imgur.com/ajLo7h1.png)

2. Replace the "Default" value in `.firebaserc` file with your Project ID

![Replacement example](https://i.imgur.com/KrWWpzf.png)

#### Get your Firebase Keys

1. From the Firebase console page, Click Project Overview

![Project Overview](https://i.imgur.com/NoN6Zjc.png)

2. Click Add app, and select Web</>

3. Enter a name - Ignore the rest, *we'll get it later!*

4. Click Continue to console

5. View your app by clicking "1 app" (where Add app was)

![1 App location](https://i.imgur.com/5cqhr35.png)

6. Click the Gear ⚙️ icon to visit the settings page

7. Scroll down to *Firebase SDK snippet*, and select Config

![Firebase SDK Snippit Config](https://i.imgur.com/rzQmGE5.png)

8. Create a file in `src/` called `firebaseconf.ts`, and make it `export default` your Firebase SDK snippit config

![Example of step 8](https://i.imgur.com/d5xfqos.png)

#### Compile

1. Run `yarn install`

2. Run `yarn build`

#### Host

1. From inside your project console, click Hosting

![Hosting location image](https://i.imgur.com/JOSG3gL.png)

2. Click Get Started

3. From where your project is locally, follow the steps for *Set up Firebase Hosting*

4. Run `firebase deploy`

5. You're done! Click the Hosting URL in your console to view your project!

![Hosting URL location](https://i.imgur.com/P7i6KDD.png)


# Live Demos

Demo 1: https://pixelboardsetupclone1.web.app/