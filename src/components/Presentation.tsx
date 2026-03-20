import { useState, useEffect, useCallback } from "react";
import { ArtDecoSunburst } from "@/components/ArtDecoSunburst";

const IMG_PORTRAIT = "https://cdn.poehali.dev/projects/ff7608fd-3505-400d-8927-3a4a9685a33a/files/4e0ef3d9-f996-41b3-b67f-5688a7fe49d9.jpg";
const IMG_OPRICHNINA = "https://cdn.poehali.dev/projects/ff7608fd-3505-400d-8927-3a4a9685a33a/files/0395c7c8-8344-4fc0-ba17-94f536374aa2.jpg";
const IMG_COURT = "https://cdn.poehali.dev/projects/ff7608fd-3505-400d-8927-3a4a9685a33a/files/57bdc5f7-9e78-462d-bdd3-594dece47d16.jpg";

const timelineEvents = [
  { year: "1530", title: "Рождение", description: "Иван IV родился в Коломенском. Отец умер, когда мальчику было 3 года.", type: "neutral" as const },
  { year: "1547", title: "Венчание на царство", description: "В 17 лет первым принял титул «Царь всея Руси» в Успенском соборе.", type: "positive" as const },
  { year: "1549", title: "Избранная рада", description: "Создан совет реформаторов. Начало масштабных государственных преобразований.", type: "positive" as const },
  { year: "1550", title: "Судебник", description: "Принят новый свод законов, упорядочивший судопроизводство по всей стране.", type: "positive" as const },
  { year: "1552", title: "Взятие Казани", description: "Казанское ханство покорено. Присоединение Поволжья к России.", type: "positive" as const },
  { year: "1560", title: "Смерть Анастасии", description: "Смерть любимой жены — переломный момент. Царь обвинил бояр в отравлении.", type: "negative" as const },
  { year: "1565", title: "Опричнина", description: "Введена система государственного террора. Страна разделена на две части.", type: "negative" as const },
  { year: "1570", title: "Погром Новгорода", description: "По приказу царя разгромлен Великий Новгород. Тысячи мирных жителей убиты.", type: "negative" as const },
  { year: "1572", title: "Отмена опричнины", description: "После нашествия Девлет-Гирея опричнина упразднена. Само слово запрещено.", type: "neutral" as const },
  { year: "1581", title: "Убийство сына", description: "В припадке гнева Иван убил наследника Ивана Ивановича. Конец династии.", type: "negative" as const },
  { year: "1584", title: "Смерть царя", description: "Иван IV умер за шахматной доской. Оставил страну в состоянии кризиса.", type: "neutral" as const },
];

const typeStyles = {
  positive: { dot: "bg-primary border-primary", label: "Реформа", color: "text-primary" },
  negative: { dot: "bg-destructive border-destructive", label: "Преступление", color: "text-destructive" },
  neutral: { dot: "bg-muted-foreground border-muted-foreground", label: "Событие", color: "text-muted-foreground" },
};

const accusations = [
  {
    id: 1, year: "1565–1572", title: "Опричнина",
    charge: "Создание системы государственного террора, массовые казни без суда и следствия",
    prosecution: [
      { text: "За 7 лет опричнины казнено от 4 000 до 10 000 человек. Опричники убивали по доносам без доказательств.", source: "Р. Г. Скрынников, «Иван Грозный», 1975" },
      { text: "Иван сам составлял «синодики» — списки убитых — и рассылал их по монастырям, признавая произвол казней.", source: "Летописный сборник, XVI в." },
      { text: "Опричнина подорвала боеспособность армии и привела к тяжёлым поражениям в Ливонской войне.", source: "А. А. Зимин, «Опричнина», 1964" },
    ],
    defense: [
      { text: "Опричнина была ответом на реальный боярский заговор в условиях тяжёлой войны на несколько фронтов.", source: "В. Б. Кобрин, «Иван Грозный», 1989" },
      { text: "По меркам XVI века это была норма: Варфоломеевская ночь во Франции унесла 30 000 жизней за одну ночь.", source: "Сравнительный анализ, Д. Н. Альшиц" },
    ],
    verdict: "Наиболее спорный эпизод: историки до сих пор не пришли к единому мнению о масштабах репрессий.",
  },
  {
    id: 2, year: "1570", title: "Погром Новгорода",
    charge: "Уничтожение Великого Новгорода по подозрению в измене — тысячи мирных жителей убиты без суда",
    prosecution: [
      { text: "Карательный поход длился 6 недель. По летописям, погибло от 2 700 до 60 000 человек — целые кварталы истреблены.", source: "Новгородская третья летопись, XVI в." },
      { text: "Поводом послужила подложная грамота. Доказательств реального заговора найдено не было.", source: "Г. П. Федотов, «Святые Древней Руси»" },
      { text: "Разграблены церкви, монастыри и склады — уничтожена экономика крупнейшего торгового города России.", source: "Генрих Штаден, «Записки о Московии»" },
    ],
    defense: [
      { text: "Новгород вёл тайные переговоры с польским королём о переходе под его власть — это являлось государственной изменой.", source: "С. М. Соловьёв, «История России», т. 6" },
      { text: "Цифры потерь в источниках расходятся в 20 раз. Реальные масштабы трагедии не установлены.", source: "Р. Г. Скрынников, «Трагедия Новгорода», 1994" },
    ],
    verdict: "Одно из наиболее документально подтверждённых преступлений царя. Жестокость похода признаётся большинством историков.",
  },
  {
    id: 3, year: "1568", title: "Убийство митрополита Филиппа",
    charge: "Расправа над главой Русской православной церкви, осудившим опричный террор",
    prosecution: [
      { text: "Митрополит трижды публично отказал царю в благословении. За это лишён сана и задушен опричником Малютой Скуратовым.", source: "Житие митрополита Филиппа, XVII в." },
      { text: "Расправа уничтожила традицию «печалования» — права духовенства заступаться за осуждённых перед царём.", source: "Г. П. Федотов, «Святые Древней Руси»" },
    ],
    defense: [
      { text: "Официально Филипп осуждён Церковным собором за нарушение монашеского устава — царь лишь утвердил решение.", source: "Акты Церковного собора, 1568" },
      { text: "Вопрос о том, убил ли Скуратов Филиппа самовольно или по приказу царя — до сих пор дискуссионен.", source: "В. Б. Кобрин, «Иван Грозный», 1989" },
    ],
    verdict: "Русская церковь канонизировала Филиппа как мученика. Его гибель — один из самых тёмных эпизодов царствования.",
  },
  {
    id: 4, year: "1581", title: "Убийство царевича Ивана",
    charge: "Убийство собственного сына и наследника, что обрекло династию на угасание",
    prosecution: [
      { text: "В припадке гнева Иван IV ударил сына посохом по голове. Смерть подтверждает папский легат Поссевино — очевидец.", source: "Антонио Поссевино, «Московия», 1586" },
      { text: "Гибель наследника привела к кризису: следующий сын Фёдор был бездетным, что через 14 лет пресекло династию Рюриковичей.", source: "Н. М. Карамзин, «История государства Российского», т. 9" },
    ],
    defense: [
      { text: "Версия об убийстве основана на единственном иностранном источнике. Ряд историков считает смерть царевича следствием болезни.", source: "Судебно-медицинская экспертиза, 1963" },
      { text: "Иван был убит горем: молился у гроба сына 43 дня, жертвовал огромные суммы монастырям на помин его души.", source: "Синодики Ивана Грозного" },
    ],
    verdict: "Экспертиза 1963 года показала высокое содержание ртути в останках обоих, что ставит вопрос об отравлении.",
  },
];

type SlideId =
  | "title"
  | "about"
  | "timeline"
  | "accusation-intro"
  | "accusation-1" | "accusation-2" | "accusation-3" | "accusation-4"
  | "gallery"
  | "quote"
  | "verdict";

const SLIDE_ORDER: SlideId[] = [
  "title", "about", "timeline",
  "accusation-intro", "accusation-1", "accusation-2", "accusation-3", "accusation-4",
  "gallery", "quote", "verdict",
];

function Corner() {
  return (
    <>
      <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-primary/60" />
      <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-primary/60" />
      <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-primary/60" />
      <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-primary/60" />
    </>
  );
}

function SlideLabel({ label }: { label: string }) {
  return <p className="text-primary tracking-[0.3em] uppercase text-xs mb-6">{label}</p>;
}

export function Presentation() {
  const [current, setCurrent] = useState(0);

  const [verdict, setVerdict] = useState<"guilty" | "innocent" | null>(null);

  const total = SLIDE_ORDER.length;
  const slideId = SLIDE_ORDER[current];

  const go = useCallback((dir: 1 | -1) => {
    setCurrent((c) => Math.max(0, Math.min(total - 1, c + dir)));
  }, [total]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") go(1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") go(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go]);

  const accusationIndex = ["accusation-1","accusation-2","accusation-3","accusation-4"].indexOf(slideId);
  const accusation = accusationIndex >= 0 ? accusations[accusationIndex] : null;

  return (
    <div className="fixed inset-0 bg-background dark flex flex-col select-none">

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-border z-20">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>

      {/* Slide counter */}
      <div className="absolute top-4 right-20 z-20 text-muted-foreground text-xs tracking-widest">
        {current + 1} / {total}
      </div>

      {/* ─── SLIDES ─── */}
      <div className="flex-1 overflow-hidden relative">

        {/* TITLE */}
        {slideId === "title" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center overflow-hidden">
            <ArtDecoSunburst />
            <Corner />
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-4 mb-10">
                <div className="w-20 h-px bg-primary" />
                <div className="w-3 h-3 rotate-45 border border-primary" />
                <div className="w-20 h-px bg-primary" />
              </div>
              <SlideLabel label="Историческое расследование · XVI век" />
              <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-foreground leading-tight mb-8">
                <span className="text-gold-gradient">Суд над</span>
                <br />Иваном Грозным
              </h1>
              <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
                Обвинения, доказательства, защита — вынесите свой вердикт первому царю всея Руси
              </p>
              <p className="mt-10 text-muted-foreground text-sm tracking-widest uppercase animate-pulse">
                Нажмите → для начала
              </p>
            </div>
          </div>
        )}

        {/* ABOUT */}
        {slideId === "about" && (
          <div className="absolute inset-0 flex items-center justify-center px-8 md:px-20">
            <Corner />
            <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center">
              <div>
                <SlideLabel label="О процессе" />
                <h2 className="font-serif text-5xl md:text-6xl text-foreground mb-8 leading-tight">
                  Где история встречает справедливость
                </h2>
                <div className="space-y-5">
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Иван IV Васильевич — один из самых противоречивых правителей в истории России. Реформатор и тиран, победитель Казани и создатель опричнины.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Изучите доказательства обеих сторон, взвесьте аргументы — и вынесите собственный обоснованный вердикт.
                  </p>
                </div>
              </div>
              <div className="relative hidden md:block">
                <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-primary z-10" />
                <div className="absolute -top-3 -right-3 w-10 h-10 border-t-2 border-r-2 border-primary z-10" />
                <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-primary z-10" />
                <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-primary z-10" />
                <img src={IMG_PORTRAIT} alt="Иван Грозный" className="w-full object-cover" style={{ filter: "sepia(20%) brightness(0.85)", maxHeight: "60vh" }} />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent py-4 px-6">
                  <p className="text-primary text-xs tracking-[0.2em] uppercase text-center">Иван IV Васильевич · 1530–1584</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TIMELINE */}
        {slideId === "timeline" && (
          <div className="absolute inset-0 flex flex-col px-8 md:px-16 py-14 overflow-y-auto">
            <Corner />
            <div className="max-w-5xl mx-auto w-full">
              <SlideLabel label="Биография" />
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-10">Хроника правления</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0 relative">
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
                {timelineEvents.map((ev, i) => {
                  const s = typeStyles[ev.type];
                  const isLeft = i % 2 === 0;
                  return (
                    <div key={ev.year} className={`flex gap-4 pb-6 ${isLeft ? "md:pr-12" : "md:pl-12 md:col-start-2"}`}>
                      <div className="flex flex-col items-center flex-shrink-0 mt-1.5">
                        <div className={`w-3 h-3 rounded-full border-2 ${s.dot}`} />
                        {i < timelineEvents.length - 2 && <div className="w-px flex-1 bg-border mt-1" style={{ minHeight: 20 }} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-serif text-primary text-lg">{ev.year}</span>
                          <span className={`text-xs tracking-wider uppercase ${s.color}`}>{s.label}</span>
                        </div>
                        <p className="font-serif text-foreground">{ev.title}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed">{ev.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ACCUSATION INTRO */}
        {slideId === "accusation-intro" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
            <Corner />
            <div className="relative z-10 max-w-3xl">
              <SlideLabel label="Материалы дела" />
              <h2 className="font-serif text-6xl md:text-7xl text-foreground mb-8 leading-tight">
                Разбор<br /><span className="text-gold-gradient">обвинений</span>
              </h2>
              <p className="text-muted-foreground text-xl leading-relaxed mb-12">
                Четыре ключевых обвинения. По каждому — аргументы прокуратуры, доводы защиты и оценка историков.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {accusations.map((a) => (
                  <div key={a.id} className="border border-border p-4 text-left">
                    <p className="text-primary text-xs tracking-widest uppercase mb-1">{a.year}</p>
                    <p className="font-serif text-foreground text-sm">{a.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ACCUSATION SLIDES */}
        {accusation && (
          <div className="absolute inset-0 flex flex-col px-8 md:px-16 py-10 overflow-y-auto">
            <Corner />
            <div className="max-w-6xl mx-auto w-full flex flex-col gap-5">
              {/* Header */}
              <div>
                <SlideLabel label={`Обвинение ${accusation.id} из 4 · ${accusation.year}`} />
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3">{accusation.title}</h2>
                <div className="border-l-2 border-primary pl-4">
                  <p className="text-muted-foreground italic leading-relaxed text-sm">{accusation.charge}</p>
                </div>
              </div>

              {/* Two columns */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Prosecution */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rotate-45 bg-destructive flex-shrink-0" />
                    <p className="text-destructive text-xs tracking-[0.2em] uppercase font-medium">Обвинение</p>
                  </div>
                  {accusation.prosecution.map((arg, i) => (
                    <div key={i} className="bg-card border border-border border-l-2 border-l-destructive p-4">
                      <p className="text-foreground text-sm leading-relaxed mb-1.5">{arg.text}</p>
                      <p className="text-destructive/60 text-xs tracking-wide">— {arg.source}</p>
                    </div>
                  ))}
                </div>

                {/* Defense */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rotate-45 bg-primary flex-shrink-0" />
                    <p className="text-primary text-xs tracking-[0.2em] uppercase font-medium">Защита</p>
                  </div>
                  {accusation.defense.map((arg, i) => (
                    <div key={i} className="bg-card border border-border border-l-2 border-l-primary p-4">
                      <p className="text-foreground text-sm leading-relaxed mb-1.5">{arg.text}</p>
                      <p className="text-primary/60 text-xs tracking-wide">— {arg.source}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verdict */}
              <div className="bg-card border border-primary/30 p-4">
                <p className="text-primary text-xs tracking-[0.2em] uppercase mb-1.5">Оценка историков</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{accusation.verdict}</p>
              </div>
            </div>
          </div>
        )}

        {/* GALLERY */}
        {slideId === "gallery" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 md:px-16">
            <Corner />
            <div className="max-w-5xl w-full">
              <SlideLabel label="Иллюстрации эпохи" />
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-10">Образы XVI века</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { src: IMG_OPRICHNINA, title: "Опричнина", sub: "Тайная полиция Ивана IV · 1565–1572" },
                  { src: IMG_COURT, title: "Судебный процесс", sub: "Документы и летописи эпохи" },
                ].map((img) => (
                  <div key={img.title} className="relative">
                    <div className="absolute -top-2 -left-2 w-7 h-7 border-t-2 border-l-2 border-primary z-10" />
                    <div className="absolute -top-2 -right-2 w-7 h-7 border-t-2 border-r-2 border-primary z-10" />
                    <div className="absolute -bottom-2 -left-2 w-7 h-7 border-b-2 border-l-2 border-primary z-10" />
                    <div className="absolute -bottom-2 -right-2 w-7 h-7 border-b-2 border-r-2 border-primary z-10" />
                    <img src={img.src} alt={img.title} className="w-full object-cover" style={{ maxHeight: "40vh", filter: "sepia(15%) brightness(0.85)" }} />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                      <p className="font-serif text-foreground">{img.title}</p>
                      <p className="text-muted-foreground text-sm">{img.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* QUOTE */}
        {slideId === "quote" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
            <Corner />
            <div className="relative max-w-3xl z-10">
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-primary/10 font-serif text-[12rem] leading-none pointer-events-none">&ldquo;</div>
              <p className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-relaxed italic mb-10 relative z-10">
                Хочу, чтобы страх перед мной был сильнее страха смерти — ибо лишь так можно удержать державу в единстве и порядке.
              </p>
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="w-12 h-px bg-primary" />
                <div className="w-2 h-2 rotate-45 bg-primary" />
                <div className="w-12 h-px bg-primary" />
              </div>
              <p className="text-muted-foreground tracking-widest">Иван IV Васильевич · <span className="text-primary">Царь всея Руси</span></p>
            </div>
          </div>
        )}

        {/* VERDICT */}
        {slideId === "verdict" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center overflow-hidden">
            <ArtDecoSunburst />
            <Corner />
            <div className="relative z-10 max-w-2xl">
              <SlideLabel label="Вынесите вердикт" />
              <h2 className="font-serif text-6xl md:text-7xl text-foreground mb-6 leading-tight">
                Виновен<br />или оправдан?
              </h2>
              <p className="text-muted-foreground text-lg mb-12">
                Вы изучили все материалы дела. Суд удаляется на совещание.
              </p>
              {verdict ? (
                <div className="border border-primary/40 p-10 bg-primary/5">
                  <p className="font-serif text-4xl text-primary mb-4">
                    {verdict === "guilty" ? "Виновен" : "Оправдан"}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {verdict === "guilty"
                      ? "История помнит тёмные деяния царя. Но помнит и его великие свершения — всё это неотделимо от образа первого русского царя."
                      : "История сложнее, чем кажется. Эпоха формирует правителей. Судить XVI век меркой XXI — задача неблагодарная."}
                  </p>
                  <button onClick={() => setVerdict(null)} className="mt-6 text-primary text-xs tracking-widest uppercase hover:opacity-70 transition-opacity">
                    Изменить вердикт
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button
                    onClick={() => setVerdict("guilty")}
                    className="px-12 py-5 bg-primary text-primary-foreground font-medium tracking-widest uppercase text-sm hover:bg-primary/90 transition-all duration-300"
                  >
                    Виновен
                  </button>
                  <button
                    onClick={() => setVerdict("innocent")}
                    className="px-12 py-5 border border-primary text-primary font-medium tracking-widest uppercase text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    Оправдан
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ─── NAVIGATION ─── */}
      <div className="flex items-center justify-between px-8 py-4 border-t border-border z-20 bg-background/80 backdrop-blur-sm">
        {/* Slide dots */}
        <div className="hidden md:flex gap-1.5">
          {SLIDE_ORDER.map((id, i) => (
            <button
              key={id}
              onClick={() => { setCurrent(i); }}
              className={`transition-all duration-300 rounded-full ${i === current ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-border hover:bg-primary/50"}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 md:hidden text-muted-foreground text-xs tracking-widest">
          {current + 1} / {total}
        </div>

        {/* Arrows */}
        <div className="flex gap-3">
          <button
            onClick={() => go(-1)}
            disabled={current === 0}
            className="w-12 h-12 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => go(1)}
            disabled={current === total - 1}
            className="w-12 h-12 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}