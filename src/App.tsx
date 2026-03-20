import { ArtDecoSunburst } from "@/components/ArtDecoSunburst";
import { ArtDecoDivider } from "@/components/ArtDecoDivider";
import { ServiceCard } from "@/components/ServiceCard";
import { CTAForm } from "@/components/CTAForm";

const IMG_PORTRAIT = "https://cdn.poehali.dev/projects/ff7608fd-3505-400d-8927-3a4a9685a33a/files/4e0ef3d9-f996-41b3-b67f-5688a7fe49d9.jpg";
const IMG_OPRICHNINA = "https://cdn.poehali.dev/projects/ff7608fd-3505-400d-8927-3a4a9685a33a/files/0395c7c8-8344-4fc0-ba17-94f536374aa2.jpg";
const IMG_COURT = "https://cdn.poehali.dev/projects/ff7608fd-3505-400d-8927-3a4a9685a33a/files/57bdc5f7-9e78-462d-bdd3-594dece47d16.jpg";

function App() {
  return (
    <main className="min-h-screen bg-background dark">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <ArtDecoSunburst />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-px bg-primary" />
              <div className="w-3 h-3 rotate-45 border border-primary" />
              <div className="w-16 h-px bg-primary" />
            </div>
          </div>

          <p className="text-primary tracking-[0.3em] uppercase text-sm mb-6">Историческое расследование · XVI век</p>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 leading-tight">
            <span className="text-gold-gradient">Суд над</span>
            <br />
            Иваном Грозным
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
            Образовательная интерактивная презентация. Обвинения, доказательства и защита — вынесите свой вердикт первому царю всея Руси.
          </p>

          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary to-primary" />
              <div className="w-2 h-2 rotate-45 bg-primary" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ArtDecoDivider variant="stepped" />

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary tracking-[0.2em] uppercase text-sm mb-4">О процессе</p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6 leading-tight text-balance">
                Где история встречает справедливость
              </h2>
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Иван IV Васильевич — один из самых противоречивых правителей в истории России. Реформатор и тиран, победитель Казанского ханства и создатель опричнины — его наследие до сих пор вызывает споры среди историков.
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Этот учебный процесс предлагает взглянуть на его деяния через призму исторических источников: летописей, свидетельств современников и документов эпохи. Ваша задача — изучить доказательства и вынести обоснованный вердикт.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-primary z-10" />
              <div className="absolute -top-3 -right-3 w-10 h-10 border-t-2 border-r-2 border-primary z-10" />
              <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-primary z-10" />
              <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-primary z-10" />
              <img
                src={IMG_PORTRAIT}
                alt="Портрет Ивана Грозного"
                className="w-full aspect-square object-cover"
                style={{ filter: "sepia(20%) brightness(0.85)" }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent py-4 px-6">
                <p className="text-primary text-xs tracking-[0.2em] uppercase text-center">Иван IV Васильевич · 1530–1584</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary tracking-[0.2em] uppercase text-sm mb-4">Ключевые эпизоды</p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground text-balance">Дело рассматривается</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              title="Обвинение"
              description="Опричнина, новгородский погром 1570 года, убийство митрополита Филиппа и сына Ивана — преступления, которые ставятся в вину первому царю."
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              }
            />
            <ServiceCard
              title="Защита"
              description="Объединение русских земель, реформы Избранной рады, победа над Казанским и Астраханским ханствами, создание Судебника 1550 года."
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              }
            />
            <ServiceCard
              title="Свидетели эпохи"
              description="Показания Андрея Курбского, хроники Генриха Штадена, летописи и дипломатические донесения — голоса XVI века в зале суда."
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ArtDecoDivider variant="fan" />

          <div className="text-center mb-16">
            <p className="text-primary tracking-[0.2em] uppercase text-sm mb-4">Иллюстрации эпохи</p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground text-balance">Образы XVI века</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative group">
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary z-10" />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-primary z-10" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-primary z-10" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary z-10" />
              <img
                src={IMG_OPRICHNINA}
                alt="Опричнина"
                className="w-full aspect-video object-cover group-hover:brightness-90 transition-all duration-500"
                style={{ filter: "sepia(15%) brightness(0.85)" }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6">
                <p className="font-serif text-lg text-foreground mb-1">Опричнина</p>
                <p className="text-muted-foreground text-sm">Тайная полиция Ивана IV · 1565–1572</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary z-10" />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-primary z-10" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-primary z-10" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary z-10" />
              <img
                src={IMG_COURT}
                alt="Судебный свиток"
                className="w-full aspect-video object-cover group-hover:brightness-90 transition-all duration-500"
                style={{ filter: "sepia(15%) brightness(0.85)" }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6">
                <p className="font-serif text-lg text-foreground mb-1">Судебный процесс</p>
                <p className="text-muted-foreground text-sm">Документы и летописи эпохи</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 px-6 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <div className="relative text-center py-12">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 text-primary/20 font-serif text-9xl leading-none">
              &ldquo;
            </div>

            <blockquote className="relative z-10">
              <p className="font-serif text-2xl md:text-3xl text-foreground leading-relaxed italic mb-8">
                Хочу, чтобы страх перед мной был сильнее страха смерти — ибо лишь так можно удержать державу в единстве и порядке.
              </p>
              <footer className="text-muted-foreground">
                <span className="text-primary">—</span> Иван IV Васильевич,{" "}
                <span className="text-primary">Царь всея Руси</span>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <ArtDecoSunburst />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <ArtDecoDivider variant="chevron" />
            <p className="text-primary tracking-[0.2em] uppercase text-sm mb-4">Вынесите вердикт</p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6 text-balance">Виновен или оправдан?</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Изучили все материалы дела? Оставьте свой вердикт — станьте частью исторической дискуссии.
            </p>
          </div>

          <div className="relative p-8 md:p-12 border border-border">
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-primary" />
            <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-primary" />
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-primary" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-primary" />

            <CTAForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-primary" />
              <span className="font-serif text-xl text-foreground">Суд над Иваном Грозным</span>
              <div className="w-12 h-px bg-primary" />
            </div>
            <p className="text-muted-foreground text-sm tracking-wider uppercase">
              Образовательный проект · История России · XVI век
            </p>
            <div className="flex items-center gap-6 text-muted-foreground text-sm">
              <span>Обвинение</span>
              <span className="text-primary">·</span>
              <span>Защита</span>
              <span className="text-primary">·</span>
              <span>Вердикт</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
