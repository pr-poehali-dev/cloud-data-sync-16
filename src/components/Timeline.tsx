interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  type: "positive" | "negative" | "neutral";
}

const events: TimelineEvent[] = [
  {
    year: "1530",
    title: "Рождение",
    description: "Иван IV родился в Коломенском. Его отец Василий III умер, когда мальчику было 3 года.",
    type: "neutral",
  },
  {
    year: "1547",
    title: "Венчание на царство",
    description: "В 17 лет первым из русских правителей принял титул «Царь всея Руси» в Успенском соборе.",
    type: "positive",
  },
  {
    year: "1549",
    title: "Избранная рада",
    description: "Создан совет реформаторов. Начало эпохи масштабных преобразований государства.",
    type: "positive",
  },
  {
    year: "1550",
    title: "Судебник",
    description: "Принят новый свод законов, упорядочивший судопроизводство по всей стране.",
    type: "positive",
  },
  {
    year: "1552",
    title: "Взятие Казани",
    description: "После многолетних войн Казанское ханство покорено. Присоединение Поволжья к России.",
    type: "positive",
  },
  {
    year: "1560",
    title: "Смерть Анастасии",
    description: "Смерть любимой жены стала переломным моментом. Царь обвинил бояр в отравлении.",
    type: "negative",
  },
  {
    year: "1565",
    title: "Опричнина",
    description: "Введена система государственного террора. Страна разделена на «опричнину» и «земщину».",
    type: "negative",
  },
  {
    year: "1570",
    title: "Погром Новгорода",
    description: "По приказу царя разгромлен Великий Новгород. Погибли тысячи мирных жителей.",
    type: "negative",
  },
  {
    year: "1572",
    title: "Отмена опричнины",
    description: "После нашествия Девлет-Гирея опричнина упразднена. Само слово запрещено под страхом смерти.",
    type: "neutral",
  },
  {
    year: "1581",
    title: "Убийство сына",
    description: "В припадке гнева Иван убил своего наследника Ивана Ивановича. Династия оказалась под угрозой.",
    type: "negative",
  },
  {
    year: "1584",
    title: "Смерть царя",
    description: "Иван IV умер за шахматной доской. Оставил страну в состоянии глубокого кризиса.",
    type: "neutral",
  },
];

const typeStyles = {
  positive: {
    dot: "bg-primary border-primary",
    badge: "text-primary border-primary/40 bg-primary/10",
    label: "Реформа",
  },
  negative: {
    dot: "bg-destructive border-destructive",
    badge: "text-destructive border-destructive/40 bg-destructive/10",
    label: "Преступление",
  },
  neutral: {
    dot: "bg-muted-foreground border-muted-foreground",
    badge: "text-muted-foreground border-border bg-card",
    label: "Событие",
  },
};

export function Timeline() {
  return (
    <div className="relative">
      {/* Central line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden md:block" />

      <div className="space-y-0">
        {events.map((event, index) => {
          const styles = typeStyles[event.type];
          const isLeft = index % 2 === 0;

          return (
            <div key={event.year} className="relative flex items-start md:items-center gap-4 md:gap-0">
              {/* Mobile layout */}
              <div className="flex md:hidden items-start gap-4 w-full">
                <div className="flex flex-col items-center flex-shrink-0 mt-1">
                  <div className={`w-3 h-3 rounded-full border-2 ${styles.dot}`} />
                  {index < events.length - 1 && (
                    <div className="w-px flex-1 bg-border mt-1" style={{ minHeight: "40px" }} />
                  )}
                </div>
                <div className="pb-8 flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-serif text-primary text-xl">{event.year}</span>
                    <span className={`text-xs border px-2 py-0.5 rounded-sm tracking-wider uppercase ${styles.badge}`}>
                      {styles.label}
                    </span>
                  </div>
                  <h3 className="font-serif text-foreground text-lg mb-1">{event.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>
                </div>
              </div>

              {/* Desktop layout */}
              <div className="hidden md:grid md:grid-cols-2 w-full">
                {/* Left side */}
                <div className={`pr-12 pb-12 ${isLeft ? "text-right" : ""}`}>
                  {isLeft && (
                    <div className="inline-block">
                      <div className="flex items-center justify-end gap-3 mb-2">
                        <span className={`text-xs border px-2 py-0.5 rounded-sm tracking-wider uppercase ${styles.badge}`}>
                          {styles.label}
                        </span>
                        <span className="font-serif text-primary text-2xl">{event.year}</span>
                      </div>
                      <h3 className="font-serif text-foreground text-xl mb-2">{event.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed max-w-xs ml-auto">{event.description}</p>
                    </div>
                  )}
                </div>

                {/* Center dot */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center" style={{ top: "6px" }}>
                  <div className={`w-4 h-4 rounded-full border-2 bg-background ${styles.dot} z-10`} />
                </div>

                {/* Right side */}
                <div className={`pl-12 pb-12 ${!isLeft ? "" : ""}`}>
                  {!isLeft && (
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-serif text-primary text-2xl">{event.year}</span>
                        <span className={`text-xs border px-2 py-0.5 rounded-sm tracking-wider uppercase ${styles.badge}`}>
                          {styles.label}
                        </span>
                      </div>
                      <h3 className="font-serif text-foreground text-xl mb-2">{event.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{event.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-border">
        {(["positive", "negative", "neutral"] as const).map((type) => (
          <div key={type} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full border-2 ${typeStyles[type].dot}`} />
            <span className="text-muted-foreground text-sm">{typeStyles[type].label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
