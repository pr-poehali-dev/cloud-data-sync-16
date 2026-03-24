import PptxGenJS from "pptxgenjs";

const DARK_BG = "1A1610";
const GOLD = "C9A84C";
const GOLD_LIGHT = "E8C97A";
const WHITE = "F5F0E8";
const GRAY = "999080";
const DARK_CARD = "252015";
const BORDER = "3A3020";

function addCorners(slide: PptxGenJS.Slide) {
  const size = 0.25;
  const margin = 0.2;
  const w = 10;
  const h = 7.5;
  const opts = { line: { color: GOLD, width: 1.5 }, fill: { type: "none" as const } };

  slide.addShape("rect", { x: margin, y: margin, w: size, h: size, line: { color: GOLD, width: 1.5 }, fill: { type: "none" } });
  slide.addShape("rect", { x: w - margin - size, y: margin, w: size, h: size, ...opts });
  slide.addShape("rect", { x: margin, y: h - margin - size, w: size, h: size, ...opts });
  slide.addShape("rect", { x: w - margin - size, y: h - margin - size, w: size, h: size, ...opts });
}

function addLabel(slide: PptxGenJS.Slide, text: string, y = 0.55) {
  slide.addText(text.toUpperCase(), {
    x: 0.6, y, w: 8.8, h: 0.25,
    fontSize: 8, bold: true, color: GOLD,
    charSpacing: 4, align: "left",
  });
}

function addTitle(slide: PptxGenJS.Slide, text: string, y = 0.9, size = 32) {
  slide.addText(text, {
    x: 0.6, y, w: 8.8, h: 1.2,
    fontSize: size, bold: true, color: WHITE,
    fontFace: "Georgia", align: "left",
  });
}

function addGoldAccent(slide: PptxGenJS.Slide, text: string, y = 0.9, size = 32) {
  slide.addText(text, {
    x: 0.6, y, w: 8.8, h: 1.2,
    fontSize: size, bold: true, color: GOLD_LIGHT,
    fontFace: "Georgia", align: "left",
  });
}

function addBody(slide: PptxGenJS.Slide, text: string, x: number, y: number, w: number, h: number, size = 13) {
  slide.addText(text, {
    x, y, w, h,
    fontSize: size, color: WHITE,
    align: "left", valign: "top",
    wrap: true,
  });
}

function addDivider(slide: PptxGenJS.Slide, y: number) {
  slide.addShape("line", {
    x: 0.6, y, w: 8.8, h: 0,
    line: { color: BORDER, width: 0.75 },
  });
}

export async function generatePptx() {
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "Ева Теплякова";
  pptx.title = "Суд над Иваном Грозным";

  const masterBg = { fill: DARK_BG };

  // ════════════════════════════
  // СЛАЙД 1: ПАСПОРТ ПРОЕКТА
  // ════════════════════════════
  {
    const slide = pptx.addSlide();
    slide.background = masterBg;
    addCorners(slide);
    addLabel(slide, "Паспорт проекта");
    addTitle(slide, "Суд над ");
    addGoldAccent(slide, "Иваном Грозным", 1.35);

    const rows = [
      ["Автор проекта", "Ева Теплякова"],
      ["Класс", "7А1"],
      ["Классный руководитель", "Авилова Светлана Ивановна"],
      ["Предмет", "История России"],
      ["Тип работы", "Образовательная презентация"],
      ["Форма", "Судебное заседание"],
      ["Период", "XVI век · 1530–1584"],
      ["Дата", "2026 год"],
    ];

    const startY = 2.5;
    const rowH = 0.42;
    rows.forEach(([label, value], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = col === 0 ? 0.6 : 5.3;
      const y = startY + row * rowH;
      const w = 4.5;

      slide.addShape("rect", { x, y, w, h: rowH - 0.04, fill: { color: DARK_CARD }, line: { color: BORDER, width: 0.5 } });
      slide.addText(label.toUpperCase(), { x: x + 0.15, y: y + 0.04, w: w - 0.3, h: 0.18, fontSize: 7, color: GOLD, charSpacing: 2, bold: true });
      slide.addText(value, { x: x + 0.15, y: y + 0.2, w: w - 0.3, h: 0.2, fontSize: 11, color: WHITE, fontFace: "Georgia" });
    });

    const stats = [
      ["4", "обвинения"],
      ["13", "слайдов"],
      ["10", "источников"],
      ["54", "года жизни"],
    ];
    const statY = 6.3;
    stats.forEach(([num, lbl], i) => {
      const x = 0.6 + i * 2.3;
      slide.addText(num, { x, y: statY, w: 1, h: 0.5, fontSize: 28, color: GOLD, fontFace: "Georgia", bold: true });
      slide.addText(lbl.toUpperCase(), { x: x + 0.7, y: statY + 0.12, w: 1.5, h: 0.3, fontSize: 8, color: GRAY, charSpacing: 2 });
    });
  }

  // ════════════════════════════
  // СЛАЙД 2: ВВЕДЕНИЕ
  // ════════════════════════════
  {
    const slide = pptx.addSlide();
    slide.background = masterBg;
    addCorners(slide);
    addLabel(slide, "Введение");
    slide.addText("О проекте: Суд над Иваном Грозным", {
      x: 0.6, y: 0.75, w: 8.8, h: 0.6,
      fontSize: 24, bold: true, color: WHITE, fontFace: "Georgia",
    });

    slide.addText(
      "Иван IV Васильевич — один из самых противоречивых правителей в истории России. Его называли «Грозным» ещё при жизни: он объединял земли, строил государство, побеждал врагов — и в то же время учредил опричнину, казнил тысячи людей и разрушил собственную страну изнутри.\n\nЦель проекта — провести историческое судебное заседание: объективно изучить свидетельства эпохи, выслушать обвинение и защиту и вынести обоснованный вердикт.",
      { x: 0.6, y: 1.4, w: 8.8, h: 1.5, fontSize: 12, color: WHITE, wrap: true, paraSpaceAfter: 6 }
    );

    addDivider(slide, 3.05);

    slide.addText("ЗАДАЧИ ПРОЕКТА", { x: 0.6, y: 3.15, w: 4, h: 0.22, fontSize: 7.5, color: GOLD, bold: true, charSpacing: 3 });
    slide.addText("ОСНОВНЫЕ ВОПРОСЫ", { x: 5.2, y: 3.15, w: 4, h: 0.22, fontSize: 7.5, color: GOLD, bold: true, charSpacing: 3 });

    const tasks = [
      "Изучить биографию и эпоху Ивана Грозного",
      "Проанализировать исторические источники XVI века",
      "Рассмотреть 4 обвинения с позиций сторон",
      "Сопоставить реформы и преступления царя",
      "Сформулировать обоснованный вердикт",
    ];
    const questions = [
      "Был ли Иван Грозный тираном или реформатором?",
      "Можно ли оправдать опричнину обстоятельствами?",
      "Как современники оценивали его правление?",
      "Соответствовали ли методы поставленным целям?",
      "Каков итоговый исторический портрет царя?",
    ];

    tasks.forEach((t, i) => {
      slide.addText(`▸  ${t}`, { x: 0.6, y: 3.45 + i * 0.45, w: 4.4, h: 0.38, fontSize: 11, color: WHITE, wrap: true });
    });
    questions.forEach((q, i) => {
      slide.addText(`?  ${q}`, { x: 5.2, y: 3.45 + i * 0.45, w: 4.4, h: 0.38, fontSize: 11, color: WHITE, wrap: true });
    });
  }

  // ════════════════════════════
  // СЛАЙД 3: СОДЕРЖАНИЕ
  // ════════════════════════════
  {
    const slide = pptx.addSlide();
    slide.background = masterBg;
    addCorners(slide);
    addLabel(slide, "Содержание");
    addTitle(slide, "План презентации", 0.75, 28);

    const items = [
      ["I", "Паспорт проекта", "Автор, класс, руководитель"],
      ["II", "Введение", "Описание проекта и источники"],
      ["III", "Хронология правления", "Ключевые события 1530–1584"],
      ["IV", "Обвинение №1: Опричнина", "1565–1572"],
      ["V", "Обвинение №2: Погром Новгорода", "1570"],
      ["VI", "Обвинение №3: Убийство митрополита Филиппа", "1568"],
      ["VII", "Обвинение №4: Убийство царевича Ивана", "1581"],
      ["VIII", "Галерея эпохи", "Исторические образы"],
      ["IX", "Слово истории", "Цитаты современников"],
      ["X", "Вердикт", "Итоговая оценка"],
    ];

    items.forEach(([num, title, sub], i) => {
      const col = i < 5 ? 0 : 1;
      const row = i < 5 ? i : i - 5;
      const x = col === 0 ? 0.6 : 5.3;
      const y = 1.6 + row * 0.95;
      addDivider(slide, y);
      slide.addText(num, { x, y: y + 0.08, w: 0.5, h: 0.35, fontSize: 14, color: GOLD, fontFace: "Georgia", bold: true });
      slide.addText(title, { x: x + 0.55, y: y + 0.06, w: 4, h: 0.25, fontSize: 12, color: WHITE, bold: true });
      slide.addText(sub, { x: x + 0.55, y: y + 0.32, w: 4, h: 0.2, fontSize: 9, color: GRAY });
    });
  }

  // ════════════════════════════
  // СЛАЙД 4: ТИТУЛЬНЫЙ
  // ════════════════════════════
  {
    const slide = pptx.addSlide();
    slide.background = masterBg;
    addCorners(slide);
    addLabel(slide, "Историческое расследование · XVI век", 3.2);

    slide.addShape("line", { x: 2.5, y: 3.5, w: 1.5, h: 0, line: { color: GOLD, width: 1 } });
    slide.addShape("rect", { x: 4.1, y: 3.44, w: 0.12, h: 0.12, fill: { color: GOLD }, line: { color: GOLD, width: 0 }, rotate: 45 });
    slide.addShape("line", { x: 4.4, y: 3.5, w: 1.5, h: 0, line: { color: GOLD, width: 1 } });

    slide.addText("Суд над", { x: 1, y: 3.65, w: 8, h: 0.7, fontSize: 44, bold: true, color: WHITE, fontFace: "Georgia", align: "center" });
    slide.addText("Иваном Грозным", { x: 1, y: 4.3, w: 8, h: 0.8, fontSize: 44, bold: true, color: GOLD_LIGHT, fontFace: "Georgia", align: "center" });

    slide.addText("Обвинения, доказательства, защита — вынесите свой вердикт первому царю всея Руси", {
      x: 1.5, y: 5.2, w: 7, h: 0.5, fontSize: 13, color: GRAY, align: "center", italics: true,
    });
  }

  // ════════════════════════════
  // СЛАЙД 5: ХРОНОЛОГИЯ
  // ════════════════════════════
  {
    const slide = pptx.addSlide();
    slide.background = masterBg;
    addCorners(slide);
    addLabel(slide, "Биография");
    addTitle(slide, "Хроника правления", 0.75, 26);

    const events = [
      { year: "1530", title: "Рождение", desc: "Иван IV родился в Коломенском. Отец умер когда мальчику было 3 года.", type: "neutral" },
      { year: "1547", title: "Венчание на царство", desc: "В 17 лет первым принял титул «Царь всея Руси».", type: "positive" },
      { year: "1550", title: "Судебник", desc: "Новый свод законов, упорядочивший судопроизводство.", type: "positive" },
      { year: "1552", title: "Взятие Казани", desc: "Казанское ханство покорено. Присоединение Поволжья.", type: "positive" },
      { year: "1565", title: "Опричнина", desc: "Введена система государственного террора.", type: "negative" },
      { year: "1570", title: "Погром Новгорода", desc: "Разгром Великого Новгорода. Тысячи убиты.", type: "negative" },
      { year: "1572", title: "Отмена опричнины", desc: "После нашествия Девлет-Гирея опричнина упразднена.", type: "neutral" },
      { year: "1581", title: "Убийство сына", desc: "В припадке гнева убил наследника Ивана Ивановича.", type: "negative" },
      { year: "1584", title: "Смерть царя", desc: "Иван IV умер за шахматной доской.", type: "neutral" },
    ];

    const cols = [0, 1, 2];
    const perCol = Math.ceil(events.length / 3);

    events.forEach((ev, i) => {
      const col = Math.floor(i / perCol);
      const row = i % perCol;
      const x = 0.5 + col * 3.15;
      const y = 1.55 + row * 1.55;
      const color = ev.type === "negative" ? "8B2020" : ev.type === "positive" ? "1A5C2A" : "2A2510";

      slide.addShape("rect", { x, y, w: 2.9, h: 1.4, fill: { color }, line: { color: BORDER, width: 0.5 } });
      slide.addText(ev.year, { x: x + 0.12, y: y + 0.08, w: 1.2, h: 0.28, fontSize: 15, color: GOLD, fontFace: "Georgia", bold: true });
      slide.addText(ev.title, { x: x + 0.12, y: y + 0.38, w: 2.65, h: 0.28, fontSize: 11, color: WHITE, bold: true });
      slide.addText(ev.desc, { x: x + 0.12, y: y + 0.68, w: 2.65, h: 0.65, fontSize: 9.5, color: GRAY, wrap: true });
    });
  }

  // ════════════════════════════
  // СЛАЙДЫ 6-9: ОБВИНЕНИЯ
  // ════════════════════════════
  const accusations = [
    {
      num: "1", period: "1565–1572", title: "Опричнина",
      charge: "Создание системы государственного террора, массовые казни без суда и следствия",
      prosecution: [
        "За 7 лет казнено от 4 000 до 10 000 человек без доказательств.",
        "Иван сам составлял «синодики» — признавая произвол казней.",
        "Опричнина подорвала армию и привела к поражениям в Ливонской войне.",
      ],
      defense: [
        "Опричнина — ответ на реальный боярский заговор в условиях войны.",
        "По меркам XVI века: Варфоломеевская ночь унесла 30 000 жизней за одну ночь.",
      ],
      verdict: "Наиболее спорный эпизод: историки до сих пор не пришли к единому мнению.",
    },
    {
      num: "2", period: "1570", title: "Погром Новгорода",
      charge: "Уничтожение Великого Новгорода — тысячи мирных жителей убиты без суда",
      prosecution: [
        "Поход длился 6 недель. По летописям — от 2 700 до 60 000 погибших.",
        "Повод — подложная грамота. Реального заговора найдено не было.",
        "Разграблены церкви и склады — уничтожена экономика торгового города.",
      ],
      defense: [
        "Новгород вёл переговоры с польским королём — государственная измена.",
        "Цифры потерь расходятся в 20 раз. Реальный масштаб не установлен.",
      ],
      verdict: "Одно из наиболее документально подтверждённых преступлений царя.",
    },
    {
      num: "3", period: "1568", title: "Убийство митрополита Филиппа",
      charge: "Расправа над главой Церкви, осудившим опричный террор",
      prosecution: [
        "Митрополит трижды публично отказал царю в благословении — задушен Малютой Скуратовым.",
        "Расправа уничтожила право духовенства заступаться за осуждённых.",
      ],
      defense: [
        "Официально Филипп осуждён Церковным собором за нарушение устава.",
        "Убил ли Скуратов Филиппа самовольно или по приказу — дискуссионно.",
      ],
      verdict: "Русская церковь канонизировала Филиппа как мученика.",
    },
    {
      num: "4", period: "1581", title: "Убийство царевича Ивана",
      charge: "Убийство собственного сына и наследника, что обрекло династию на угасание",
      prosecution: [
        "В припадке гнева ударил сына посохом. Подтверждает папский легат Поссевино.",
        "Гибель наследника через 14 лет пресекла династию Рюриковичей.",
      ],
      defense: [
        "Версия основана на единственном иностранном источнике.",
        "Иван до конца жизни оплакивал сына — нетипично для сознательного убийцы.",
      ],
      verdict: "Большинство историков признаёт факт убийства, споря лишь об умысле.",
    },
  ];

  for (const acc of accusations) {
    const slide = pptx.addSlide();
    slide.background = masterBg;
    addCorners(slide);
    addLabel(slide, `Обвинение ${acc.num} из 4 · ${acc.period}`);
    addTitle(slide, acc.title, 0.75, 28);

    slide.addShape("rect", { x: 0.6, y: 1.5, w: 8.8, h: 0.55, fill: { color: DARK_CARD }, line: { color: BORDER, width: 0.5 } });
    slide.addText(`Обвинение: ${acc.charge}`, { x: 0.75, y: 1.56, w: 8.5, h: 0.42, fontSize: 11, color: GRAY, italics: true, wrap: true });

    slide.addText("ОБВИНЕНИЕ", { x: 0.6, y: 2.18, w: 4.2, h: 0.22, fontSize: 7.5, color: "CC4444", bold: true, charSpacing: 3 });
    slide.addText("ЗАЩИТА", { x: 5.2, y: 2.18, w: 4.2, h: 0.22, fontSize: 7.5, color: GOLD, bold: true, charSpacing: 3 });

    acc.prosecution.forEach((p, i) => {
      slide.addShape("rect", { x: 0.6, y: 2.45 + i * 1.0, w: 4.3, h: 0.88, fill: { color: "2A1515" }, line: { color: "5A2020", width: 0.5 } });
      slide.addText(`▸  ${p}`, { x: 0.72, y: 2.52 + i * 1.0, w: 4.05, h: 0.75, fontSize: 10.5, color: WHITE, wrap: true });
    });

    acc.defense.forEach((d, i) => {
      slide.addShape("rect", { x: 5.2, y: 2.45 + i * 1.0, w: 4.3, h: 0.88, fill: { color: DARK_CARD }, line: { color: BORDER, width: 0.75 } });
      slide.addText(`▸  ${d}`, { x: 5.32, y: 2.52 + i * 1.0, w: 4.05, h: 0.75, fontSize: 10.5, color: WHITE, wrap: true });
    });

    const verdictY = 5.6;
    slide.addShape("rect", { x: 0.6, y: verdictY, w: 8.8, h: 0.72, fill: { color: "1E1A0A" }, line: { color: GOLD, width: 0.75 } });
    slide.addText("ОЦЕНКА ИСТОРИКОВ", { x: 0.75, y: verdictY + 0.06, w: 3, h: 0.18, fontSize: 7, color: GOLD, bold: true, charSpacing: 2 });
    slide.addText(acc.verdict, { x: 0.75, y: verdictY + 0.28, w: 8.4, h: 0.36, fontSize: 11, color: GRAY, italics: true, wrap: true });
  }

  // ════════════════════════════
  // СЛАЙД 10: ЦИТАТЫ
  // ════════════════════════════
  {
    const slide = pptx.addSlide();
    slide.background = masterBg;
    addCorners(slide);
    addLabel(slide, "Слово истории");
    addTitle(slide, "Цитаты современников", 0.75, 26);

    const quotes = [
      { text: "«Тиранства его никто не может исчислить и описать»", author: "Генрих Штаден, немецкий опричник, «Записки о Московии», ок. 1578" },
      { text: "«Был он муж чудного рассуждения, в науке книжного поучения доволен и многоречив зело»", author: "Андрей Курбский, «История о великом князе Московском», 1573" },
      { text: "«Разумом он превосходил всех окружающих, памятью обладал изумительной»", author: "Антонио Поссевино, папский легат, «Московия», 1586" },
    ];

    quotes.forEach((q, i) => {
      const y = 1.7 + i * 1.8;
      slide.addShape("line", { x: 0.6, y, w: 0, h: 1.2, line: { color: GOLD, width: 2 } });
      slide.addText(q.text, { x: 1.0, y: y + 0.05, w: 8.4, h: 0.9, fontSize: 15, color: WHITE, fontFace: "Georgia", italics: true, wrap: true });
      slide.addText(`— ${q.author}`, { x: 1.0, y: y + 1.0, w: 8.4, h: 0.28, fontSize: 9.5, color: GRAY });
    });
  }

  // ════════════════════════════
  // СЛАЙД 11: ИСТОЧНИКИ
  // ════════════════════════════
  {
    const slide = pptx.addSlide();
    slide.background = masterBg;
    addCorners(slide);
    addLabel(slide, "Библиография");
    addTitle(slide, "Источники и литература", 0.75, 24);

    const sources = [
      "1. Карамзин Н. М. «История государства Российского». Т. VIII–IX. — М.: Наука, 1989.",
      "2. Скрынников Р. Г. «Иван Грозный». — М.: АСТ, 2001.",
      "3. Флетчер Д. «О государстве Русском» (1591). Пер. с англ. — СПб., 1906.",
      "4. Курбский А. М. «История о великом князе Московском» (XVI в.).",
      "5. Зимин А. А. «Опричнина Ивана Грозного». — М.: Мысль, 1964.",
      "6. Переписка Ивана Грозного с Андреем Курбским / под ред. Д. С. Лихачёва. — Л.: Наука, 1979.",
      "7. Синодик опальных Ивана Грозного (список казнённых). РНБ, XVI в.",
      "8. Энциклопедия Кольера. Статья «Иван IV». Britannica, 2001. britannica.com",
      "9. Российская историческая энциклопедия. Статья «Иван Грозный». РАН, 2015. runivers.ru",
      "10. Государственный исторический музей. Коллекция «Россия XVI века». shm.ru",
    ];

    const half = Math.ceil(sources.length / 2);
    sources.forEach((src, i) => {
      const col = i < half ? 0 : 1;
      const row = i < half ? i : i - half;
      const x = col === 0 ? 0.6 : 5.3;
      const y = 1.65 + row * 0.55;
      slide.addShape("rect", { x, y, w: 4.45, h: 0.48, fill: { color: DARK_CARD }, line: { color: BORDER, width: 0.5 } });
      slide.addText(src, { x: x + 0.12, y: y + 0.05, w: 4.2, h: 0.38, fontSize: 9.5, color: WHITE, wrap: true });
    });
  }

  // ════════════════════════════
  // СЛАЙД 12: ВЕРДИКТ
  // ════════════════════════════
  {
    const slide = pptx.addSlide();
    slide.background = masterBg;
    addCorners(slide);
    addLabel(slide, "Финальное заседание");

    slide.addText("Вердикт", { x: 0.6, y: 0.8, w: 8.8, h: 0.8, fontSize: 40, bold: true, color: WHITE, fontFace: "Georgia", align: "center" });

    slide.addShape("line", { x: 2, y: 1.65, w: 6, h: 0, line: { color: GOLD, width: 1 } });

    slide.addText(
      "Иван Грозный — правитель, чьё наследие невозможно оценить однозначно.\nОн заложил основы российской государственности, расширил границы страны, создал систему законов —\nи он же обескровил страну террором, уничтожил тысячи невинных, подорвал экономику и пресёк собственную династию.",
      { x: 0.8, y: 1.85, w: 8.4, h: 1.8, fontSize: 14, color: WHITE, align: "center", wrap: true, paraSpaceAfter: 8, fontFace: "Georgia", italics: true }
    );

    slide.addShape("line", { x: 2, y: 3.75, w: 6, h: 0, line: { color: GOLD, width: 1 } });

    slide.addText(
      "История не знает простых приговоров.\nСуд над Иваном Грозным — это суд над вечным вопросом:\nможет ли цель оправдывать средства?",
      { x: 1, y: 3.95, w: 8, h: 1.2, fontSize: 16, color: GOLD_LIGHT, align: "center", wrap: true, fontFace: "Georgia", bold: true }
    );

    slide.addText("Автор: Ева Теплякова · 7А1 · 2026", {
      x: 0.6, y: 6.7, w: 8.8, h: 0.3, fontSize: 10, color: GRAY, align: "center",
    });
  }

  // ─── СКАЧИВАНИЕ ───
  await pptx.writeFile({ fileName: "Суд_над_Иваном_Грозным_Теплякова_7А1.pptx" });
}
