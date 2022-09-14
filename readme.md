# Preview

![Alt Text](./IMG/output720p.gif)


# Prerequisites

- https://reactnative.dev/docs/environment-setup

- `yarn install`

# Run

- `yarn start`

# generate apk

- `yarn release`

# docs

- https://docs.nativebase.io/Components.html
- https://rnfirebase.io/auth/usage

# Patches - Hot-patching dependencies with patch-package

- http://johnliu.net/blog/2018/12/hot-patching-our-dependencies-with-patch-package

This is configured to run after yarn install the configuration is inside package.json in the scripts section: `"postinstall": "patch-package"`

Right after yarn install the project must be ran once which might result in a crash, this is likely caused by the patch package module, which might not be patching in time, if that's the case just run the project again and from thereon there shouldn't be any problems
