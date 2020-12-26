var lang;

if ($.cookie('stg_lang') !== undefined)
    lang = $.cookie('stg_lang');
else
    lang = 'en-GB';

var _LayoutRsc;
readTextFile('./App_Component/Controller/Locale/Script/_Layout.' + lang + '.json', function (text) {
    _LayoutRsc = JSON.parse(text);
});
