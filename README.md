# <img src="logo.svg" alt="ApeSwap" height="160px"> <img src="logo-b.svg" alt="Balancer" height="64px"> 
# Balancer Frontend App (v2)
Frontend Vue app for Balancer exchange and pool management.

This repository contains the code for the ApeSwap DEX V2. This project is a fork of [balancer-frontend-v2](https://github.com/balancer-labs/frontend-v2). For more further information please see their detailed [documentation](https://docs.balancer.fi/) as we build out ours.


## Pulling Upstream Changes
Balancer V2 Frontend is an actively maintained repository. The unaltered Balancer V2 code lives in the [balancer-v2](https://github.com/ApeSwapFinance/apeswap-swap-v2-monorepo/tree/balancer-v2) branch. To pull in new updates to that branch run the following: 

```bash
git checkout balancer-v2
git fetch upstream
git merge upstream/master
```

Now the new updates will be in the [balancer-v2](https://github.com/ApeSwapFinance/balancer-frontend-v2/tree/balancer-v2) branch. These updates can then be merged into a feature branch off of `main` reconcile the updates.  

```
git checkout main
git checkout -b feature/<feature-name>
git merge balancer-v2
```

## Development
<!-- TODO: Update README link -->
To setup the development environment first clone the repo:
```bash
git clone https://github.com/balancer-labs/frontend-v2.git && cd frontend-v2
```

### Local env
Install dependencies:
```bash
npm install
```

Start the app:
```bash
npm run serve
```

The app should be live at [http://localhost:8080](http://localhost:8080)

### Docker
If you'd rather spin up the app in a docker container:

```bash
docker-compose up
```

The app should be live at [http://localhost:8080](http://localhost:8080)

### Change app network
<!-- TODO: A|S README: Update network config and env config -->
To change your local development app network, update the network key for
`VUE_APP_NETWORK` in `.env.development`. Available networks:
```
1 - Mainnet
56 - BNB Chain
97 - BNB Chain Testnet
```

### Update Application Config
Configuration settings for this application are managed in multiple locations. Use the legend below to make updates as needed.

- [config/index.ts](./src/lib/config/index.ts): Pull in JSON files with BalancerV2 protocol specific contract addresses per network.
- [config.service.ts](./src/services/config/config.service.ts): Pull in environment variables and set general application config values
- [constants/tokenlists.ts](./src/constants/tokenlists.ts): Token lists config per chain: 
- [constants/pools.ts](./src/constants/pools.ts): Whitelisted pool addresses per network.
- [constants/tokens.ts](./src/constants/tokens.ts): Setup popular tokens and native assets per network.
- [constants/initialTokens.json](./src/constants/initialTokens.json): Set initial swap tokens per network

## Self-Hosting

As we believe in decentralization at all layers, we've made it easy to host your own Balancer Frontend.

### Docker Production Image

We've created a production ready [docker image](./Dockerfile) that connects to Mainnet and runs
a pre-built version of Balancer Frontend-v2 using nginx. You'll need your own [Infura](https://infura.io), [Alchemy](https://www.alchemy.com/), and [Blocknative](https://blocknative.com) API keys in order to fetch data and make trades.

You can also specify your Portis Dapp ID if you wish to use that service, otherwise it will use a default key.

Here's an example of how to run the container. This can also be found in [scripts/run-docker.sh](./scripts/run-docker.sh).

```bash
docker run \ 
  -e INFURA_PROJECT_ID=   \ # Required
  -e ALCHEMY_KEY=         \ # Required
  -e BLOCKNATIVE_DAPP_ID= \ # Required
  -e PORTIS_DAPP_ID=      \ # Optional
  balancerfi/frontend-v2
```

### Digital Ocean Deploy

Click the button below to deploy the frontend Docker image to a new instance in your Digital Ocean account. You will be prompted to provide your Infura Project ID, Alchemy Key, and Blocknative Dapp ID as these are required for the frontend to work correctly.

[![Deploy to DO](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/balancer-labs/frontend-v2/tree/UI-769-one-click-deploy-to-digital-ocean)

## Design System
The app is using [Tailwind](https://tailwindcss.com/) to configure base styles. In development these styles can be viewed by running:

```bash
npm run tailwind-viewer
```
Your browser should load the app at [http://localhost:3000](http://localhost:3000).
