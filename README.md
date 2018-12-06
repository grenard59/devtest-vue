# Pingflow Api server

### Prerequisite
 
* NodeJS 8.9.x
* `Pingflow Api server` up and running

* Lastest version of `yarn` : ```npm install -g yarn```


The `MASTER_KEY` must be setup inside the `Pingflow Api server` 

## Getting started

### Install packages
Run the following command
* `yarn install`

### Configure the server 
Inside : `/src/Constants.js

#### Create secret token
Edit the MASTER_KEY with the same value as in `Pingflow Api server`

#### Edit the API server url
 Edit the `API_URL` to match the `Pingflow Api server` URL
  
## Fire it up
Start the server by running `yarn start`
