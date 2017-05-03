# i18n-translate-json

Automatically translates node-i18n JSON files into different languages via Google Translate API.

## Installation

```
npm install -g i18n-translate-json
```

## Usage

You need a [Google Translate API Key](https://cloud.google.com/translate/).

```
i18n-translate-json apiKey dir sourceLang (targetLang1,targetLang2,..)
```

e.g.

```
i18n-translate-json iuOHAEbo9H788d34h93h4diouehIUHI locale/ en es,fr
```

This would translate all strings in `locale/en.json` (relative to current folder in the shell) from English to Spanish and French, based on the Google Translate API language codes.

The target languages list is optional. When not present, it will be translated to all languages supported by Google Translate.

## Credits

Based on [i18n-translate](https://github.com/thomasbrueggemann/i18n-translate) by Thomas Brüggemann.

This fork is sponsored by [Meedan](http://meedan.com).
