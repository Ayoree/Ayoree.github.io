var days = [ 'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ];

class Lesson {
  constructor(name, cabinet) {
    this.name = name;
    this.cabinet = cabinet;
  }
  getName() {
    if (this.name) return this.name;
    return '';
  }

  getCabinet() {
    if (this.cabinet) return ('('+this.cabinet+')');
    return '';
  }
}

class Couple {

  group = false;
  week = false;
  constructor(lessons = [], group = false, week = false) {
    this.group = group;
    this.week = week;
    this.lessons = lessons;
  }

  getLessonsNames() {
    var res = [];
    for (var i = 0; i < this.lessons.length; i++) {
      res.push(this.lessons[i].getName());
    }
    if (res.length > 0) return res;
    return false;
  }

  getLessonsCabinets() {
    var res = [];
    for (var i = 0; i < this.lessons.length; i++) {
      res.push(this.lessons[i].getCabinet());
    }
    if (res.length > 0) return res;
    return false;
  }

}

var times = [
  "8:30 - 9:50 (10)",
  "10:00 - 11:20 (30)",
  "11:50 - 13:10 (10)",
  "13:20 - 14:40 (10)",
  "14:50 - 16:10 (20)",
  "16:30 - 17:50 (10)",
  "18:00 - 19:20",
];

var full_week = [
  [ // понедельник
    new Couple(),
    new Couple(),
    new Couple(),
    new Couple([
      new Lesson("Правовое обеспечение", "610ВЦ")
    ]),
    new Couple([
      new Lesson("Системы и сети", "610ВЦ")
    ]),
    new Couple([
      new Lesson("1п. Английский", "104"),
      new Lesson("2п. Базы данных", "610ВЦ")
    ], true),
    new Couple()
  ],
  [ // вторник
    new Couple(),
    new Couple(),
    new Couple([
      new Lesson("Физра", "Спорт-зал")
    ]),
    new Couple([
      new Lesson("WEB-design", "69ВЦ")
    ]),
    new Couple([
      new Lesson("1п. Системы и сети", "610ВЦ"),
      new Lesson("1п. WEB-design", "69ВЦ"),
      new Lesson("2п. WEB-design", "69ВЦ"),
      new Lesson("2п. Системы и сети", "610ВЦ")
    ], true, true),
    new Couple([
      new Lesson(),
      new Lesson("Базы данных", "610ВЦ")
    ], false, true),
    new Couple()
  ],
  [ // среда
    new Couple(),
    new Couple(),
    new Couple([
      new Lesson("Правовое обеспечение", "610ВЦ")
    ]),
    new Couple([
      new Lesson("Системы и сети", "610ВЦ")
    ]),
    new Couple([
      new Lesson("Экономика", "610ВЦ")
    ]),
    new Couple([
      new Lesson("Базы данных", "610ВЦ")
    ]),
    new Couple()
  ],
  [ // четверг
    new Couple(),
    new Couple(),
    new Couple(),
    new Couple([
      new Lesson("Экономика", "610ВЦ"),
      new Lesson()
    ], false, true),
    new Couple([
      new Lesson("Системы и сети", "610ВЦ")
    ]),
    new Couple([
      new Lesson("Базы данных", "610ВЦ")
    ]),
    new Couple()
  ],
  [ // пятница
    new Couple([
      new Lesson("Системы и сети", "610ВЦ")
    ]),
    new Couple([
      new Lesson("1п. Базы данных", "610ВЦ"),
      new Lesson("2п. Английский", "104")
    ], true),
    new Couple([
      new Lesson("Базы данных", "610ВЦ")
    ]),
    new Couple(),
    new Couple(),
    new Couple(),
    new Couple()
  ],
  [  // суббота
    new Couple(),
    new Couple([
      new Lesson("1п. Базы данных", "610ВЦ"),
      new Lesson("2п. Базы данных", "610ВЦ")
    ], false, true),
    new Couple([
      new Lesson("1п. Базы данных", "610ВЦ"),
      new Lesson("2п. Базы данных", "610ВЦ")
    ], false, true),
    new Couple([
      new Lesson("2п. Базы данных", "610ВЦ"),
      new Lesson("1п. Базы данных", "610ВЦ"),
    ], false, true),
    new Couple([
      new Lesson("2п. Системы и сети", "610ВЦ"),
      new Lesson("1п. Базы данных", "610ВЦ")
    ], false, true),
    new Couple(),
    new Couple()
  ]
];

$(document).ready(function() {
  var wrapper = $('.school-table-wrapper');
  wrapper.append("<table class='school-table'></table>");
  var table = $('.school-table');
  table.append("<thead class='school-thead'></thead>");
  table.append("<tbody class='school-tbody'></tbody>");
  makeTableHeader();
  makeTableBody();

  for (var i = 0; i < 6; i++) {
    var rows = $('.school-row-'+ i);

    rows.hover(
      function() {
        var n = this.className;
        var rows = $('.school-id-'+ n[n.length-1]); //косячная фигня
        rows.addClass('id-hovered');
      },
      function() {
        var n = this.className;
        // тут hovered добавляется в начало ХЗ ПОЧЕМУ
        var rows = $('.school-id-'+ n[n.length-1]); // косячная фигня
        rows.removeClass('id-hovered');
      }
    );
  }
  for (var i = 0; i < 6; i++) {
    var cols = $('.school-col-'+ i);

    cols.hover(
      function() {
        var n = this.className;
        var cols = $('.school-col-'+ n[n.length-1]); //косячная фигня
        cols.addClass('col-hovered');
      },
      function() {
        var n = this.className;
        // 9 - длина hovered + пробел + цифра в конце предыдущего класса
        var cols = $('.school-col-'+ n[n.length-13]); // косячная фигня
        cols.removeClass('col-hovered');
      }
    );

  }
});

function getWeekDay() {
  var day = new Date().getDay();
  return day;
}

function getWeekNum() {
  var onejan = new Date((new Date).getFullYear(), 0, 1);
  return Math.ceil(((((new Date) - onejan) / 86400000) + onejan.getDay()) / 7);
}

function makeTableHeader() {
  var header = $('.school-thead');
  header.append('<tr class="school-thead-days"></tr>');
  var row = $('.school-thead-days');
  row.append('<th rowspan="2" colspan="2" class="school-thead-id">Номер пары</th>');
  for (var i = 1; i < days.length; i++) {
    if (getWeekDay() != i) row.append('<th colspan="2" class="school-thead-'+ (i) +'">'+days[i]+'</th>');
    else row.append('<th colspan="2" class="school-current-day school-thead-'+ (i) +'">'+days[i]+'</th>');
  }
  header.append('<tr class="school-thead-week"></tr>');
  row = $('.school-thead-week');
  for (var i = 1; i < days.length; i++) {
    if (getWeekDay() != i) {
      row.append('<td class="school-week-even">Четная</th>');
      row.append('<td class="school-week-odd">Нечетная</th>');
    }
    else {
      var even = getWeekNum() % 2;
      if (!even) {
        row.append('<td class="school-week-even">Четная</th>');
        row.append('<td class="school-current-week-odd school-week-odd">Нечетная</th>');
      }
      else {
        row.append('<td class="school-current-week-even school-week-even">Четная</th>');
        row.append('<td class="school-week-odd">Нечетная</th>');
      }
    }
  }
}

function makeTableBody() {
  var body = $('.school-tbody');

  for (var i = 0; i < 6; i++) {

    var indexes = [];
    body.append('<tr class="school-row-'+ i +'"></tr>');
    row = $('.school-row-'+ i);
    row.append('<th colspan="2" rowspan="2" class="school-id-'+ i +'">'+ (i+1) +'</th>');

    // добавление верхней строки
    for (var j = 0; j < 6; j++) {
      var couple = full_week[j][i];
      var names = couple.getLessonsNames();
      var cabinets = couple.getLessonsCabinets();
      var name = '';
      var cabinet = '';
      if (names[0]) name = names[0];
      if (cabinets[0]) cabinet = cabinets[0];

      //console.log("пары: ", names);
      //console.log("кабинеты: ", cabinets);

      if (couple.group) {
        indexes.push(j);
      }

      if (getWeekDay() != j+1) {
        if (couple.week) {
          if (name != '') row.append('<td colspan="'+ (2-couple.week) +'" rowspan="'+ (2-couple.group) +'" class="school-col-'+ j +'">'+ name +' '+ cabinet +'</td>');
          else row.append('<td colspan="'+ (2-couple.week) +'" rowspan="'+ (2-couple.group) +'"></td>');
          if (names[1] != '') row.append('<td colspan="1" rowspan="'+ (2-couple.group) +'" class="school-col-'+ j +'">'+ names[1] +' '+ cabinets[1] +'</td>');
          else row.append('<td colspan="1" rowspan="'+ (2-couple.group) +'"></td>');
        }
        else {
          if (name != '') row.append('<td colspan="'+ (2-couple.week) +'" rowspan="'+ (2-couple.group) +'" class="school-col-'+ j + '">'+ name +' '+ cabinet +'</td>');
          // пустая ячейка
          else row.append('<td colspan="'+ (2-couple.week) +'" rowspan="'+ (2-couple.group) +'"></td>');
        }
      }
      else {
        if (couple.week) {
          if (name != '') row.append('<td colspan="'+ (2-couple.week) +'" rowspan="'+ (2-couple.group) +'" class="current-col school-col-'+ j +'">'+ name +' '+ cabinet +'</td>');
          else row.append('<td colspan="'+ (2-couple.week) +'" rowspan="'+ (2-couple.group) +'"></td>');
          if (names[1] != '') row.append('<td colspan="1" rowspan="'+ (2-couple.group) +'" class="current-col school-col-'+ j +'">'+ names[1] +' '+ cabinets[1] +'</td>');
          else row.append('<td colspan="1" rowspan="'+ (2-couple.group) +'"></td>');
        }
        else {
          if (name != '') row.append('<td colspan="'+ (2-couple.week) +'" rowspan="'+ (2-couple.group) +'" class="current-col school-col-'+ j + '">'+ name +' '+ cabinet +'</td>');
          // пустая ячейка
          else row.append('<td colspan="'+ (2-couple.week) +'" rowspan="'+ (2-couple.group) +'"></td>');
        }
      }
    }
    // если на строке не все пары по подгруппам
    if (indexes.length < 6) {
        body.append('<tr class="school-row-'+ i +'"></tr>');
    }
    // добавление нижней строки
    row = $('.school-row-'+i).next();
    for (var j = 0; j < indexes.length; j++) {
      couple = full_week[indexes[j]][i];
      names = couple.getLessonsNames();
      cabinets = couple.getLessonsCabinets();
      if (couple.group && couple.week) {
        name = names[2];
        cabinet = cabinets[2];
      }
      else {
        name = names[1];
        cabinet = cabinets[1];
      }
      if (getWeekDay() != indexes[j]+1) {
        if (name != '') row.append('<td colspan="'+ (2-couple.week) +'" class="school-col-'+ indexes[j] + '">'+ name + ' '+ cabinet +'</td>');
        else row.append('<td colspan="'+ (2-couple.week) +'"></td>');
        if (couple.week) {
          if (names[3] != '') row.append('<td colspan="1" rowspan="'+ (2-couple.group) +'" class="school-col-'+ indexes[j] + '">'+ names[3] +' '+ cabinets[3] +'</td>');
          else row.append('<td colspan="1" rowspan="'+ (2-couple.group) +'"></td>');
        }
      }
      else {
        if (name != '') row.append('<td colspan="'+ (2-couple.week) +'" class="current-col school-col-'+ indexes[j] + '">'+ name + ' '+ cabinet +'</td>');
        else row.append('<td colspan="'+ (2-couple.week) +'"></td>');
        if (couple.week) {
          if (names[3] != '') row.append('<td colspan="1" rowspan="'+ (2-couple.group) +'" class="current-col school-col-'+ indexes[j] + '">'+ names[3] +' '+ cabinet +'</td>');
          else row.append('<td colspan="1" rowspan="'+ (2-couple.group) +'"></td>');
        }
      }
    }
  }
}
