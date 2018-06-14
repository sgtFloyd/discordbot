const matches = [
  { time: Date.parse('June 14, 2018 15:00 GMT'), desc: 'Group A — 🇷🇺  Russia vs 🇸🇦  Saudi Arabia' },

  { time: Date.parse('June 15, 2018 12:00 GMT'), desc: 'Group A — 🇪🇬  Egypt vs 🇺🇾  Uruguay' },
  { time: Date.parse('June 15, 2018 15:00 GMT'), desc: 'Group B — 🇲🇦  Morocco vs 🇮🇷  Iran' },
  { time: Date.parse('June 15, 2018 18:00 GMT'), desc: 'Group B — 🇵🇹  Portugal vs 🇪🇸  Spain' },

  { time: Date.parse('June 16, 2018 10:00 GMT'), desc: 'Group C — 🇫🇷  France vs 🇦🇺  Australia' },
  { time: Date.parse('June 16, 2018 13:00 GMT'), desc: 'Group D — 🇦🇷  Argentina vs 🇮🇸  Iceland' },
  { time: Date.parse('June 16, 2018 16:00 GMT'), desc: 'Group C — 🇵🇪  Peru vs 🇩🇰  Denmark' },
  { time: Date.parse('June 16, 2018 19:00 GMT'), desc: 'Group D — 🇭🇷  Croatia vs 🇳🇬  Nigeria' },

  { time: Date.parse('June 17, 2018 12:00 GMT'), desc: 'Group E — 🇨🇷  Costa Rica vs 🇷🇸  Serbia' },
  { time: Date.parse('June 17, 2018 15:00 GMT'), desc: 'Group F — 🇩🇪  Germany vs 🇲🇽  Mexico' },
  { time: Date.parse('June 17, 2018 18:00 GMT'), desc: 'Group E — 🇧🇷  Brazil vs 🇨🇭  Switzerland' },

  { time: Date.parse('June 18, 2018 12:00 GMT'), desc: 'Group F — 🇸🇪  Sweden vs 🇰🇷  South Korea' },
  { time: Date.parse('June 18, 2018 15:00 GMT'), desc: 'Group G — 🇧🇪  Belgium vs 🇵🇦  Panama' },
  { time: Date.parse('June 18, 2018 18:00 GMT'), desc: 'Group G — 🇹🇳  Tunisia vs 🇬🇧  England' },

  { time: Date.parse('June 19, 2018 12:00 GMT'), desc: 'Group H — 🇨🇴  Colombia vs 🇯🇵  Japan' },
  { time: Date.parse('June 19, 2018 15:00 GMT'), desc: 'Group H — 🇵🇱  Poland vs 🇸🇳  Senegal' },
  { time: Date.parse('June 19, 2018 18:00 GMT'), desc: 'Group A — 🇷🇺  Russia vs 🇪🇬  Egypt' },

  { time: Date.parse('June 20, 2018 12:00 GMT'), desc: 'Group B — 🇵🇹  Portugal vs 🇲🇦  Morocco' },
  { time: Date.parse('June 20, 2018 15:00 GMT'), desc: 'Group A — 🇺🇾  Uruguay vs 🇸🇦  Saudi Arabia' },
  { time: Date.parse('June 20, 2018 18:00 GMT'), desc: 'Group B — 🇮🇷  Iran vs 🇪🇸  Spain' },

  { time: Date.parse('June 21, 2018 12:00 GMT'), desc: 'Group C — 🇩🇰  Denmark vs 🇦🇺  Australia' },
  { time: Date.parse('June 21, 2018 15:00 GMT'), desc: 'Group C — 🇫🇷  France vs 🇵🇪  Peru' },
  { time: Date.parse('June 21, 2018 18:00 GMT'), desc: 'Group D — 🇦🇷  Argentina vs 🇭🇷  Croatia' },

  { time: Date.parse('June 22, 2018 12:00 GMT'), desc: 'Group E — 🇧🇷  Brazil vs 🇨🇷  Costa Rica' },
  { time: Date.parse('June 22, 2018 15:00 GMT'), desc: 'Group D — 🇳🇬  Nigeria vs 🇮🇸  Iceland' },
  { time: Date.parse('June 22, 2018 18:00 GMT'), desc: 'Group E — 🇷🇸  Serbia vs 🇨🇭  Switzerland' },

  { time: Date.parse('June 23, 2018 12:00 GMT'), desc: 'Group G — 🇧🇪  Belgium vs 🇹🇳  Tunisia' },
  { time: Date.parse('June 23, 2018 15:00 GMT'), desc: 'Group F — 🇰🇷  South Korea vs 🇲🇽  Mexico' },
  { time: Date.parse('June 23, 2018 18:00 GMT'), desc: 'Group F — 🇩🇪  Germany vs 🇸🇪  Sweden' },

  { time: Date.parse('June 24, 2018 12:00 GMT'), desc: 'Group G — 🇬🇧  England vs 🇵🇦  Panama' },
  { time: Date.parse('June 24, 2018 15:00 GMT'), desc: 'Group H — 🇯🇵  Japan vs 🇸🇳  Senegal' },
  { time: Date.parse('June 24, 2018 18:00 GMT'), desc: 'Group H — 🇵🇱  Poland vs 🇨🇴  Colombia' },

  { time: Date.parse('June 25, 2018 14:00 GMT'), desc: 'Group A — 🇸🇦  Saudi Arabia vs 🇪🇬  Egypt' },
  { time: Date.parse('June 25, 2018 14:00 GMT'), desc: 'Group A — 🇺🇾  Uruguay vs 🇷🇺  Russia' },
  { time: Date.parse('June 25, 2018 18:00 GMT'), desc: 'Group B — 🇮🇷  Iran vs 🇵🇹  Portugal' },
  { time: Date.parse('June 25, 2018 18:00 GMT'), desc: 'Group B — 🇪🇸  Spain vs 🇲🇦  Morocco' },

  { time: Date.parse('June 26, 2018 14:00 GMT'), desc: 'Group C — 🇦🇺  Australia vs 🇵🇪  Peru' },
  { time: Date.parse('June 26, 2018 14:00 GMT'), desc: 'Group C — 🇩🇰  Denmark vs 🇫🇷  France' },
  { time: Date.parse('June 26, 2018 18:00 GMT'), desc: 'Group D — 🇮🇸  Iceland vs 🇭🇷  Croatia' },
  { time: Date.parse('June 26, 2018 18:00 GMT'), desc: 'Group D — 🇳🇬  Nigeria vs 🇦🇷  Argentina' },

  { time: Date.parse('June 27, 2018 14:00 GMT'), desc: 'Group F — 🇰🇷  South Korea vs 🇩🇪  Germany' },
  { time: Date.parse('June 27, 2018 14:00 GMT'), desc: 'Group F — 🇲🇽  Mexico vs 🇸🇪  Sweden' },
  { time: Date.parse('June 27, 2018 18:00 GMT'), desc: 'Group E — 🇨🇭  Switzerland vs 🇨🇷  Costa Rica' },
  { time: Date.parse('June 27, 2018 18:00 GMT'), desc: 'Group E — 🇷🇸  Serbia vs 🇧🇷  Brazil' },

  { time: Date.parse('June 28, 2018 14:00 GMT'), desc: 'Group H — 🇯🇵  Japan vs 🇵🇱  Poland' },
  { time: Date.parse('June 28, 2018 14:00 GMT'), desc: 'Group H — 🇸🇳  Senegal vs 🇨🇴  Colombia' },
  { time: Date.parse('June 28, 2018 18:00 GMT'), desc: 'Group G — 🇬🇧  England vs 🇧🇪  Belgium' },
  { time: Date.parse('June 28, 2018 18:00 GMT'), desc: 'Group G — 🇵🇦  Panama vs 🇹🇳  Tunisia' },
]


module.exports = {
  matches: matches
}
