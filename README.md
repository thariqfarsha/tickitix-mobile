<div id="top"></div>

<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/thariqfarsha/tickitix-mobile">
    <img src="https://res.cloudinary.com/dm8rg2aj8/image/upload/v1657095396/Tickitix/SS/mobile/ic_launcher_tnaed5.png" alt="Logo">
  </a>

  <h2 align="center">Tickitix Mobile</h2>

  <p align="center">
    Online movie ticket booking app
    <br />
    <br />
    <a href="https://drive.google.com/file/d/1uD8Zmg80kDVHEfGYbqt_OMs_WCChMhb0/view?usp=drivesdk" target="_blank">Download APK</a>
    ·
    <a href="https://github.com/thariqfarsha/tickitix-mobile/issues" target="_blank">Report Bug</a>
    ·
    <a href="https://github.com/thariqfarsha/tickitix-mobile/issues" target="_blank">Request Feature</a>
  </p>
  <br/>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<img src="https://res.cloudinary.com/dm8rg2aj8/image/upload/v1656912031/Tickitix/SS/mobile/Screenshot_1656647849_yd1lb4.png" height="320">
<img src="https://res.cloudinary.com/dm8rg2aj8/image/upload/v1656912032/Tickitix/SS/mobile/Screenshot_1656648849_djinoy.png" height="320">
<img src="https://res.cloudinary.com/dm8rg2aj8/image/upload/v1656912031/Tickitix/SS/mobile/Screenshot_1656648894_ltsbnl.png" height="320">
<img src="https://res.cloudinary.com/dm8rg2aj8/image/upload/v1656912029/Tickitix/SS/mobile/Screenshot_1656648932_gs6xfy.png" height="320">
<img src="https://res.cloudinary.com/dm8rg2aj8/image/upload/v1656912029/Tickitix/SS/mobile/Screenshot_1656649028_tdhnng.png" height="320">
<br/>
<br/>

Tickitix Mobile is an android app to do movie ticket booking. This app is compatible with Android 5 (Lollipop) and later. Tickitix provides a simple and straighforward user interface to find a movie and its show schedules with multiple payment channels using Midtrans as the third party payment gateway.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Redux](https://react-redux.js.org/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

Please refer to [this react native documentation](https://reactnative.dev/docs/environment-setup) about setting up development environment.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/thariqfarsha/tickitix-mobile.git
   ```
1. Install NPM packages
   ```sh
   npm install
   ```
1. Create an env file on root directory for API base url
   ```
   URL_BACKEND=https://tickitix.herokuapp.com/
   ```
1. Run your android emulator or connect your android device to your computer. Make sure the device is connected by running this command
   ```sh
   adb devices
   ```
1. Run Metro on your terminal with this command
   ```sh
   npx react-native start
   ```
   Exclude "npx" if you install react native globally on your computer
1. Run this project on your android emulator or your device with this command on different terminal
   ```sh
   npx react-native run-android
   ```
   Wait for the process until the app is succesfully running on your emulator or device

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

© [Thariq Farsha](https://github.com/thariqfarsha/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Email: mthariqfarsha@gmail.com

Project Link: [https://github.com/thariqfarsha/tickitix-mobile](https://github.com/thariqfarsha/tickitix-mobile)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

These are several dependencies and resources that I find helpful for this app development

- [Moment](https://momentjs.com/)
- [Numbro](https://numbrojs.com/)
- [UI Avatar - Generate avatars with initials from names](https://ui-avatars.com/)
- [React Native Push Notification](https://github.com/zo0r/react-native-push-notification)
- [React Native Tab View](https://github.com/satya164/react-native-tab-view)
- [React Native QRCode SVG](https://github.com/awesomejerry/react-native-qrcode-svg)
- [React Native Select Dropdown](https://github.com/AdelRedaa97/react-native-select-dropdown)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
- [Validator](https://github.com/validatorjs/validator.js)
- [Best README template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
