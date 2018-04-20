// Настройки API
window.ya.speechkit.settings.lang = 'uk-UA';
window.ya.speechkit.settings.apikey = '6c8a07b4-3927-49e6-898e-7e0b388b716f';

// Настройки обьекта синтеза речи
var tts = new ya.speechkit.Tts(
{
  lang: 'uk-UA',
  emotion: 'good',
  speed: 1.0,
  speaker: 'omazh'
});

// Создание обьекта распознавания речи
var streamer = new ya.speechkit.SpeechRecognition();

// Функция озвучки
function speak() {
  var text = $('#first-in').val();
  tts.speak(
    text, {
    stopCallback: function () {
      console.log("Озвучивание текста завершено.");
    }
    });
}

// Функция скрытия подсказки во вкладке распознавания
function timehide(){
    $('.time').hide();
}

// Функция распознавания речи
function listen() {
  $('#second-in').val(""); // Очищение поля
  // Обработка подсказки
  $('.time span').css('background-color', '#850B40');
  $('.time span').html("Зачекайте секунду...");
  $('.time').show();
  // Непосредственно распознавание
  ya.speechkit.recognize({
      // Функция будет вызвана, когда распознавание завершится.
      doneCallback: function(text) {
        var prev_text = $('#second-in').val();
        if (text != "")
          $('#second-in').val(prev_text + " " + text);
        $('.time span').html("Готово!");
        setTimeout(timehide, 2000);
      },
      // Функция вызовется, как только сессия будет инициализирована.
      initCallback: function () {
        $('.time span').html("Говоріть!");
        $('.time span').css('background-color', '#41BB5E');
      },
      // Вызывается в случае возникновения ошибки.
      errorCallback: function(err) {
           console.log("Возникла ошибка: " + err);
      },
      // Длительность промежутка тишины, при наступлении которой
      // распознавание завершается.
      utteranceSilence: 20
  });
}
