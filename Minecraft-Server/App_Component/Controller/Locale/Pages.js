var lang;

if ($.cookie('stg_lang') !== undefined)
    lang = $.cookie('stg_lang');
else {
    $.cookie('stg_lang', 'en-GB');
    lang = 'en-GB';
}  

var _LayoutRsc;
readTextFile('./App_Component/Controller/Locale/Script/_Layout.' + lang + '.json', function (text) {
    _LayoutRsc = JSON.parse(text);
});

var NewsResc;
readTextFile('./App_Component/Controller/Locale/Script/News.' + lang + '.json', function (text) {
    NewsResc = JSON.parse(text);
});
