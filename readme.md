# shit I haven't done yet:

- add the add notes functionality to the moutain
- do the notes screens

# prerequisites

- https://reactnative.dev/docs/environment-setup

- `yarn install`

# run

(might be necessary to run a second time if it crashes the first time)

- `yarn start`

# generate apk

- `yarn release`

# docs

- https://docs.nativebase.io/Components.html
- https://rnfirebase.io/auth/usage

# Workflow

- branch per developer once feature is implemented we merge to main
- before merging to main if there is a merge request the other party must review it
- write notes for everything

# Patches - Hot-patching dependencies with patch-package

- http://johnliu.net/blog/2018/12/hot-patching-our-dependencies-with-patch-package

This is configured to run after yarn install the configuration is inside package.json in the scripts section: `"postinstall": "patch-package"`

Right after yarn install the project must be ran once which might result in a crash, this is likely caused by the patch package module, which might not be patching in time, if that's the case just run the project again and from thereon there shouldn't be any problems

# whenever you push you dont add yarn.lock package-lock or package

(full checkbox = ✅)

# Tasks

- Main page
- Login (VADIM)

  - ✅ Register
  - ✅ Persistent Auth
  - ✅ Login/Signout

- Mood tracker (MARIAN)

  - ⬜️ create page
    IN PROGRESS...
  - ⬜️ create functionality to color
    IN PROGRESS...
  - ⬜️ save to db
  - ⬜️ autopopulate svg
  - ⬜️ save the svg in gallery

- habit tracker (MARIAN)

  - ⬜️ create page
  - ⬜️ create tick functionality
  - ⬜️ save to db
  - ⬜️ autopopulate svg

- journal (VADIM)
  - ⬜️ create page
  - ⬜️ create functionality
  - ⬜️ save to db
  - ⬜️ autopopulate svg

# DB STRUCTURE

when u create an accout that returns a promise, we can use the uuid from the returned promise to identify the users

```json
{
    "uuid": "...",
    "email": "...",
    "mood_tracker": {
        "..."
    },
    "habit_tracker": {
        "..."
    },
    "journal": {
        "..."
    }
}
```
