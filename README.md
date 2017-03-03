# MTG Discord Bot
[![Code Climate](https://codeclimate.com/github/bra1n/judgebot/badges/gpa.svg)](https://codeclimate.com/github/bra1n/judgebot)

Discord Bot for Magic / Judge related content

[Add the bot to your server](https://discordapp.com/oauth2/authorize?client_id=240537940378386442&scope=bot)

## Setup

Clone the Git repository and run the following commands:
```sh
npm install
export DISCORD_TOKEN="<your Discord bot token>"
export CR_ADDRESS="http://media.wizards.com/2016/docs/MagicCompRules_20160930.txt"
node server.js
```

## Supported commands

- **!mtg \<partial cardname\>**: searches for an (English) card by name and outputs the card together with an image, if available, *Example: !mtg Tarmogoyf*
- **!rule \<paragraph number\>**: shows the chosen paragraph from the [Comprehensive Rules](https://rules.wizards.com/rulebook.aspx?game=Magic&category=Game+Rules), *Example: !rule 100.6b*
- **!define \<keyword\>**: shows the chosen keyword definition from the [Comprehensive Rules](https://rules.wizards.com/rulebook.aspx?game=Magic&category=Game+Rules), *Example: !define banding*
- **!help**: show a list of available commands (in a direct message)
