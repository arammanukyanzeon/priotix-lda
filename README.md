## Subject generator
Microservice that generates subjects from tweets.

### Development environment
This service requires `PostgreSQL` and `nodejs` > v15.0.0

Set PostgreSQL database configs in `.env` file.

- `npm install`
- `npm migrate`
- `npm start`

⚠ Note if you want to run this microservice you will also need to run [twitter-scraper](https://github.com/arammanukyanzeon/twitter-scraper) and set `host:port` in `.env` file.
