# **🖥️DDS-NET🎲**

*Stylish Retro Party Management and Dice Rolling System for the Shin Megami Tensei Tabletop Roleplaying game.* Tool by EtherAwaits

![DDS-NET on Startup](https://i.imgur.com/rFb5jpr.png)

![SMT Inspired Arm COMP](https://i.imgur.com/C2dDiIw.jpeg)

## **📑 Table of Contents**

1. [📕Introduction](#introduction)

2. [💾Installation](#installation)

3. [🔧Important Files](#important-files)

4. [🪄Custom UI](#custom-ui)

5. [💚Contributing](#contributing)

6. [💌Contact Me](#contact-me)

7. [📄Credits](#credits)

8. [📜License](#license)

9. [📝Changelog](#changelog)

10. [🚗Roadmap](#roadmap)

## **📕Introduction**

DDS-NET is a party management and dice roller system for the Shin Megami Tensei Tabletop Roleplaying Game, though in the future will feature other TTRPGs such as Cyberpunk Red. The design is inspired by the classic SNES games and made to simulate a terminal display. Designed to run on any screen and system, even a Raspberry Pi 5. Running locally, you can even use API to interact with a connected Arduino, [creating a cyberdeck like my own](https://www.reddit.com/r/Megaten/comments/1hr6dyp/smt_ttrpg_arm_comp_making_your_own/). DDS-NET is a webapp made with Node.JS using Tailwindcss with DaisyUI for CSS. You can try out DDS-NET online at [digitaldicesystem.net](https://digitaldicesystem.net). If you want to support the project, you can help with my hosting costs below!

<a href='https://ko-fi.com/K3K319F19W' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi6.png?v=6' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

## **💾Installation**

1. ### 📦Download Node.js

    Follow instructions for your OS to download the most recent version of Node.JS to run the server. [Download Node.JS](https://nodejs.org/en/download)

2. ### 🔎Verify Node.js installation

    Check your current Node.js version.

    ```bash
    node --version
    ```

    You should recieve something like "v22.12.0" confirming Node.js is installed.

3. ### ✅Run the server

    After cloning this repository, open terminal to your new DDS-NET directory and run the server by activating server.js!

    ```bash
    node server
    ```

    You should recieve "SMT Web app is running at http://localhost:80".
    Follow the link to open DDS-NET!

## **🔧Important Files**

*Important files to note.*

### 💽DDS-NET/server.js

This will be used to start up the webapp with Node.js as well as establish API routes and statically serve the /src files. You can edit this to use API utilities with your own Arduino!

### 🧾DDS-NET/src/index.html

The bare html web page. This is controlled and manipulated with data.js

### 🎵DDS-NET/src/audio.js

Functions to handle the sound effects.

### ⌨️DDS-NET/src/terminal.js

Handles the termtext() function to simulate a terminal interface and bootup message.

### 📥DDS-NET/src/input.css

Main file for changing the CSS and themes for those familiar with tailwindcss.

### 🔊DDS-NET/src/sounds/

.mp3's to be used with audio.js

### 🪟DDS-NET/src/views/

Contains all images.

### 🧮DDS-NET/src/data.css

Handles menus, forms, local storage, key bindings, and just about everything else. This is the main file to edit.

### 📊Data Management

All data is saved into the browser using local storage. However, uploaded user images are kept in IndexedDB.

## **🪄Custom UI**

DDS-NET Uses [Tailwindcss](https://tailwindcss.com/docs/styling-with-utility-classes) along with [DaisyUI](https://daisyui.com) to handle all the CSS heavy lifting. When making changes to the UI, update continuously using the simple command in /DDS-NET.

```bash
npm run dev
```

## 💚Contributing

I love to see others create their own customized creations. DDS-NET was created with the idea of giving others the ability to create their own stylish cyberdeck for TTRPG management and entertainment. Just make sure to include credit.

1. Fork the repository.

2. Create a new branch for your changes.

3. Make your changes.

4. Test your changes.

5. Commit your changes.

6. Push your changes to your forked repository.

7. Create a pull request with a clear description.

Contributions to the core system are welcomed, while forks can have their own features.

## 💌Contact Me

If for any reason you have problems, suggestions, questions ect. Feel free to contact my discord etherawaits or my email <brettwilliams343@gmail.com> for anything you need. I also love to see what people create with it.

## 📄Credits

This project features a reduced CRT filter from [aleclownes.com](https://aleclownes.com/2017/02/01/crt-display.html).

Skill icons created by Q-Bit.

## 📜License

MIT License

## 📝Changelog

- **1.1** 💅UI Customization

- **1.0** 🎉Release

## 🚗Roadmap

- ~~💅UI Customization~~

- 📖Custom Skills & Compendium

- 😈Demon Compendium

- ⚔️Enemy Combat System

- 📞VTT API Handling

- 😎Begin Work on Cyberpunk Red Version
