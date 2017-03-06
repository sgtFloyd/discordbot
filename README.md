# Discord Bot

## Setup
1. Clone the Git repository  
2. Configure `.env` environment file:
```sh
DISCORD_TOKEN="yourDiscordBotToken"
COMMAND_CHAR="!"
LOG_LEVEL="INFO"
```
3. Start the bot:
```sh
npm install
npm start
```

## Supported commands
- `!help`: show a list of available commands (in a direct message)
- `!mtg cardname`
  - search for an MTG card by name and outputs the card together with an image, if available
  - *Example: !mtg Tarmogoyf*
- `!rule paragraph number`
  - shows the chosen paragraph from the [MTG Comprehensive Rules](https://rules.wizards.com/rulebook.aspx?game=Magic&category=Game+Rules)
  - *Example: !rule 100.6b*
- `!define keyword`
  - show the chosen keyword definition from the [MTG Comprehensive Rules](https://rules.wizards.com/rulebook.aspx?game=Magic&category=Game+Rules)
  - *Example: !define banding*
