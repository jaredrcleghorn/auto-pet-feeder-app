# auto-pet-feeder-app

## Installation

You will need a [Mac](https://www.apple.com/mac/), [Node](https://nodejs.org/),
[Watchman](https://facebook.github.io/watchman/), [Yarn](https://yarnpkg.com/),
[Xcode](https://developer.apple.com/xcode/), the Xcode Command Line Tools, and
[CocoaPods](https://cocoapods.org). You can install Node and Watchman using
[Homebrew](https://brew.sh). To install Homebrew, run

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then, to install Node and Watchman, run

```shell
brew install node watchman
```

Next, to install Yarn, run

```shell
npm i -g yarn
```

You can
[download Xcode from the App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12),
and the Xcode Command Line Tools can be installed by running

```shell
xcode-select --install
```

To install CocoaPods, run

```shell
sudo gem install cocoapods
```

Finally, to install dependencies, move into the project folder and run

```shell
yarn install
```

## Usage

First, start Metro by running

```shell
yarn start
```

Then, to start the app in the iOS Simulator, open a new terminal, move into the
project folder, and run

```shell
yarn ios
```
