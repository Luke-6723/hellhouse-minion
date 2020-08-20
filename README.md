## Hellhouse Minion

A moderation bot for the [Hellhouse Discord](https://hellhouse.xyz)

### Setup

Setup the config file in `src/` with the name `config.json`

```json
{
  "bot": {
    "amqpUser": "",
    "amqpPass": "",
    "amqpHost": "",
    "amqpPrefix": ""
  },
  "redis": {
    "host": "",
    "port": 6379,
    "password": "",
    "prefix": ""
  },
  "database": {
    "mongoIp": "",
    "mongoUser": "",
    "mongoPass": "",
    "mongoDbName": ""
  },
  "discord": {
    "discordApiUrl": "https://discord.com/api",
    "apiVersion": "v6"
  }
}
```