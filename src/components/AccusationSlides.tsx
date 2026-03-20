import { useState } from "react";

interface Argument {
  text: string;
  source: string;
}

interface Accusation {
  id: number;
  year: string;
  title: string;
  charge: string;
  prosecution: Argument[];
  defense: Argument[];
  verdict: string;
}

const accusations: Accusation[] = [
  {
    id: 1,
    year: "1565–1572",
    title: "Опричнина",
    charge: "Создание системы государственного террора, массовые казни бояр и мирных жителей без суда и следствия",
    prosecution: [
      {
        text: "За 7 лет опричнины казнено от 4 000 до 10 000 человек. Опричники грабили, пытали и убивали по доносам без каких-либо доказательств вины.",
        source: "Р. Г. Скрынников, «Иван Грозный», 1975",
      },
      {
        text: "Сам Иван составлял «синодики» — списки убитых — и рассылал их по монастырям для отпевания, признавая тем самым произвол казней.",
        source: "Летописный сборник, XVI в.",
      },
      {
        text: "Введение опричнины разрушило единство государства, подорвало боеспособность армии и привело к тяжёлым поражениям в Ливонской войне.",
        source: "А. А. Зимин, «Опричнина», 1964",
      },
    ],
    defense: [
      {
        text: "Опричнина была ответом на реальный боярский заговор и попытки аристократии ограничить царскую власть в условиях тяжёлой войны.",
        source: "В. Б. Кобрин, «Иван Грозный», 1989",
      },
      {
        text: "По меркам XVI века подавление измены было обычной практикой европейских монархий — Варфоломеевская ночь во Франции унесла 30 000 жизней в одну ночь.",
        source: "Сравнительный анализ, Д. Н. Альшиц",
      },
    ],
    verdict: "Наиболее спорный эпизод: историки до сих пор не пришли к единому мнению о масштабах и обоснованности репрессий.",
  },
  {
    id: 2,
    year: "1570",
    title: "Погром Новгорода",
    charge: "Уничтожение Великого Новгорода по подозрению в измене — тысячи мирных жителей убиты без суда",
    prosecution: [
      {
        text: "Карательный поход длился 6 недель. По данным новгородских летописей, погибло от 2 700 до 60 000 человек — целые кварталы были истреблены.",
        source: "Новгородская третья летопись, XVI в.",
      },
      {
        text: "Поводом послужила подложная грамота о якобы готовящейся измене. Доказательств реального заговора найдено не было.",
        source: "Г. П. Федотов, «Святые Древней Руси»",
      },
      {
        text: "Помимо людей, были разграблены церкви, монастыри и торговые склады — это уничтожило экономику крупнейшего торгового города России.",
        source: "Генрих Штаден, «Записки о Московии»",
      },
    ],
    defense: [
      {
        text: "Новгород действительно вёл тайные переговоры с польским королём Сигизмундом II о переходе под его власть, что являлось государственной изменой.",
        source: "С. М. Соловьёв, «История России», т. 6",
      },
      {
        text: "Цифры потерь в источниках расходятся в 20 раз — от 2 700 до 60 000. Реальные масштабы трагедии по сей день не установлены.",
        source: "Р. Г. Скрынников, «Трагедия Новгорода», 1994",
      },
    ],
    verdict: "Одно из наиболее документально подтверждённых преступлений царя. Жестокость карательного похода признаётся большинством историков.",
  },
  {
    id: 3,
    year: "1568",
    title: "Убийство митрополита Филиппа",
    charge: "Расправа над главой Русской православной церкви, осмелившимся публично осудить опричный террор",
    prosecution: [
      {
        text: "Митрополит Филипп трижды публично отказал царю в благословении, обличая казни. За это был лишён сана, заключён в монастырь и задушен опричником Малютой Скуратовым.",
        source: "Житие митрополита Филиппа, XVII в.",
      },
      {
        text: "Расправа над первоиерархом церкви уничтожила традицию «печалования» — права духовенства заступаться за осуждённых перед царём.",
        source: "Г. П. Федотов, «Святые Древней Руси»",
      },
    ],
    defense: [
      {
        text: "Официально Филипп был осуждён Церковным собором за нарушение монашеского устава — царь лишь утвердил церковное решение.",
        source: "Акты Церковного собора, 1568",
      },
      {
        text: "Вопрос о том, кто именно убил Филиппа — Скуратов самовольно или по приказу царя — остаётся дискуссионным в историографии.",
        source: "В. Б. Кобрин, «Иван Грозный», 1989",
      },
    ],
    verdict: "Русская православная церковь канонизировала Филиппа как мученика. Его гибель считается одним из самых тёмных эпизодов царствования.",
  },
  {
    id: 4,
    year: "1581",
    title: "Убийство царевича Ивана",
    charge: "Убийство собственного сына и наследника престола, что обрекло династию на угасание",
    prosecution: [
      {
        text: "В припадке гнева Иван IV ударил посохом сына по голове. Царевич скончался через несколько дней. Это подтверждает папский легат Антонио Поссевино — очевидец событий.",
        source: "Антонио Поссевино, «Московия», 1586",
      },
      {
        text: "Гибель наследника стала катастрофой: следующий сын Фёдор был болезненным и бездетным, что через 14 лет привело к пресечению династии Рюриковичей.",
        source: "Н. М. Карамзин, «История государства Российского», т. 9",
      },
    ],
    defense: [
      {
        text: "Версия об убийстве основана на единственном иностранном источнике. Ряд современных историков и криминалистов считает смерть царевича следствием болезни.",
        source: "Судебно-медицинская экспертиза останков, 1963",
      },
      {
        text: "Иван Грозный был убит горем: молился у гроба сына 43 дня, жертвовал огромные суммы монастырям на помин его души.",
        source: "Синодики Ивана Грозного",
      },
    ],
    verdict: "Официальная версия — убийство в припадке гнева. Экспертиза 1963 года показала высокое содержание ртути в останках обоих, что ставит вопрос об отравлении.",
  },
];

export function AccusationSlides() {
  const [activeId, setActiveId] = useState(1);
  const [activeTab, setActiveTab] = useState<"prosecution" | "defense">("prosecution");

  const active = accusations.find((a) => a.id === activeId)!;

  return (
    <div className="flex flex-col gap-8">
      {/* Tabs navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {accusations.map((acc) => (
          <button
            key={acc.id}
            onClick={() => { setActiveId(acc.id); setActiveTab("prosecution"); }}
            className={`relative p-4 text-left border transition-all duration-300 group ${
              activeId === acc.id
                ? "border-primary bg-primary/10"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            {activeId === acc.id && (
              <>
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />
              </>
            )}
            <p className="text-primary text-xs tracking-widest uppercase mb-1">{acc.year}</p>
            <p className={`font-serif text-sm leading-tight ${activeId === acc.id ? "text-foreground" : "text-muted-foreground"}`}>
              {acc.title}
            </p>
          </button>
        ))}
      </div>

      {/* Slide content */}
      <div className="border border-border bg-card p-8 md:p-12 relative">
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary" />
        <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-primary" />
        <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-primary" />
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary" />

        {/* Header */}
        <div className="mb-8">
          <p className="text-primary tracking-[0.2em] uppercase text-xs mb-3">{active.year} · Обвинение №{active.id}</p>
          <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-4">{active.title}</h3>
          <div className="border-l-2 border-primary pl-4">
            <p className="text-muted-foreground leading-relaxed italic">{active.charge}</p>
          </div>
        </div>

        {/* Prosecution / Defense switcher */}
        <div className="flex gap-0 mb-8 border border-border w-fit">
          <button
            onClick={() => setActiveTab("prosecution")}
            className={`px-6 py-3 text-sm tracking-wider uppercase font-medium transition-all duration-200 ${
              activeTab === "prosecution"
                ? "bg-destructive/20 text-destructive border-r border-border"
                : "text-muted-foreground hover:text-foreground border-r border-border"
            }`}
          >
            Обвинение
          </button>
          <button
            onClick={() => setActiveTab("defense")}
            className={`px-6 py-3 text-sm tracking-wider uppercase font-medium transition-all duration-200 ${
              activeTab === "defense"
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Защита
          </button>
        </div>

        {/* Arguments */}
        <div className="space-y-5 mb-10">
          {(activeTab === "prosecution" ? active.prosecution : active.defense).map((arg, i) => (
            <div key={i} className="flex gap-4">
              <div className={`flex-shrink-0 mt-1.5 w-2 h-2 rotate-45 ${activeTab === "prosecution" ? "bg-destructive" : "bg-primary"}`} />
              <div>
                <p className="text-foreground leading-relaxed mb-1">{arg.text}</p>
                <p className={`text-xs tracking-wider ${activeTab === "prosecution" ? "text-destructive/70" : "text-primary/70"}`}>
                  — {arg.source}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-border" />
          <div className="w-2 h-2 rotate-45 border border-primary" />
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Historian verdict */}
        <div className="bg-background/50 border border-border p-5">
          <p className="text-primary text-xs tracking-[0.2em] uppercase mb-2">Оценка историков</p>
          <p className="text-muted-foreground leading-relaxed text-sm">{active.verdict}</p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
          <button
            onClick={() => { setActiveId(Math.max(1, activeId - 1)); setActiveTab("prosecution"); }}
            disabled={activeId === 1}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed tracking-wider uppercase"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Предыдущее
          </button>
          <span className="text-muted-foreground text-xs tracking-widest">{activeId} / {accusations.length}</span>
          <button
            onClick={() => { setActiveId(Math.min(accusations.length, activeId + 1)); setActiveTab("prosecution"); }}
            disabled={activeId === accusations.length}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed tracking-wider uppercase"
          >
            Следующее
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
