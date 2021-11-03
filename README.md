# CoinMarketCap Daily Diamonds

Puppeteer script running in a Github action to claim daily diamonds on [CoinMarketCap](https://coinmarketcap.com/).

## How to run (locally)

Install dependencies

    $ npm install

Copy example dotenv file without the .example extension.

    $ cp .env.example .env

Launch script

    $ npm run start

## How to run (Github action)

You will need to add `EMAIL` and `PASSWORD` as [secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) in your repository settings.
