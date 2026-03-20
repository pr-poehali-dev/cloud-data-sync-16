import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CTAForm() {
  const [verdict, setVerdict] = useState<"guilty" | "innocent" | null>(null);

  if (verdict) {
    return (
      <div className="text-center py-8">
        <p className="font-serif text-2xl text-primary mb-2">
          {verdict === "guilty" ? "Вердикт: Виновен" : "Вердикт: Оправдан"}
        </p>
        <p className="text-muted-foreground">
          {verdict === "guilty"
            ? "История помнит его тёмные деяния. Но помнит и великие свершения."
            : "История сложнее, чем кажется. Эпоха формирует правителей."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <p className="text-muted-foreground text-center text-sm tracking-wider uppercase">
        Изучив все материалы дела, суд постановляет:
      </p>
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
        <Button
          onClick={() => setVerdict("guilty")}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-medium tracking-wider uppercase text-sm px-8 py-6 transition-all duration-300 text-base"
        >
          Виновен
        </Button>
        <Button
          onClick={() => setVerdict("innocent")}
          variant="outline"
          className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium tracking-wider uppercase text-sm px-8 py-6 transition-all duration-300 text-base"
        >
          Оправдан
        </Button>
      </div>
    </div>
  );
}
