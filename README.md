# Pixelboard
A Reddit Place pseudo-clone made in Firebase and VueJS


## Live deployment 

### Get the project locally

*We'll need it later*

### Create a project at [Firebase](https://console.firebase.google.com/)

1. Head to https://console.firebase.google.com/
2. Sign in with Google
3. Create "Create a Project"
4. Enter a project name - other details can be left default

### Enable Realtime Database

Todo: This whole section might not be required

1. From inside your project console, click Realtime Database

![Databse location image](https://i.imgur.com/6eH5OMu.png)

2. Click Create Database

*Feel free to leave defaults - our deploy will change the rules later!*

Todo: This is definitely not required

3. From within the Realtime Database, click Rules

![Rules location image](https://i.imgur.com/NCKsxxt.png)

4. Replace the entire rules set with the following:

```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

![Rules image](https://i.imgur.com/QhzLyHV.png)

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

8. Create a file in `src/` called `firebaseconf.ts`, and make it export a *jsonified* version of your Firebase SDK snippit config

![Example of step 8](https://i.imgur.com/nXqF6YX.png)

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


- Todo: An image of it running
