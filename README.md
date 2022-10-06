# klaytn_challengeII
This repository contains required system related to 2nd task at Klaytn.
It consists of the following modules:
1. [BE](/BE) - this includes the BE API required to verify the signature
2. [FE](FE) - this includes the FE react app which is responsible of connecting wallet (using web3modal) & signing plus verifying the signature

# BE Deployment
To deploy backend please perform following steps:
## 1. Install the dependencies
```shell
cd BE
npm install
```
## 2. To run the tests
```shell
npm test
```
## 3. To deploy server
```shell
npm run server
```

# FE Deployment
To deploy FE please perform following steps:

## 1. Install the dependencies
```shell
cd ../FE
npm install
```
## 2. To deploy FE react app
```shell
npm start
```
### Note:
Screenshots of react app is shared below
1.  [image1](./FE/1.png) - shows the UI when app is loaded
2.  [image2](./FE/2.png) - shows the UI when signature is verified from BE.

 You can connect your Metamask wallet with this react-app to sign & verify the message.
### Dev env
Developed & Tested with following node & npm versions:
```shell
node  v16.17.0
npm  v8.19.2

```
## Live Demo
React app is deployed and config with BE API at following URL:
http://3.87.167.130:3000/
