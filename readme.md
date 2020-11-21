# prerequisites

- https://reactnative.dev/docs/environment-setup
- npm install
- yarn install
- cd android 
    - ./gradlew.bat installDebug

# run

npx react-native run-android

# docs

- https://docs.nativebase.io/Components.html
- https://rnfirebase.io/auth/usage

# Workflow

- branch per developer once feature is implemented we merge to main
- before merging to main if there is a merge request the other party must review it
- write notes for everything
# whenever you push you dont add yarn.lock package-lock or package 

# Tasks

- Login (VADIM)
    - [  ]  Register
    - [  ]  Persistent Auth
    - [  ]  Login/Signout

- Mood tracker (MARIAN)
    - [  ]  create page
    - [  ]  create functionality to color
    - [  ]  save to db
    - [  ]  autopopulate svg 
    - [  ]  save the svg in gallery 

- habit tracker (MARIAN)
    - [  ]  create page
    - [  ]  create tick functionality
    - [  ]  save to db
    - [  ]  autopopulate svg 

- journal (VADIM)
    - [  ]  create page
    - [  ]  create functionality
    - [  ]  save to db
    - [  ]  autopopulate svg 


# DB STRUCTURE
when u create an accout that returns a promise, we can use the uuid from the returned promise to identify the users

```json
{
    uuid: ....,
    email: ....,
    mood_tracker: {
        ...
    },
    habit_tracker: {
        ...
    },
    journal: {
        ...
    }
}
```