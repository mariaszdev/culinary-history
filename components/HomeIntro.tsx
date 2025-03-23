export default function HomeIntro() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen text-center py-20 px-6 space-y-6">
      <h1 className="text-4xl font-bold text-pink-900">
        Historische Koch- und Esswerkzeuge
      </h1>
      <p className="text-lg max-w-3xl text-gray-700">
        Diese Anwendung präsentiert eine Sammlung historischer Küchen- und
        Esswerkzeuge, die aus der{" "}
        <a
          href="https://www.europeana.eu/de"
          className="text-pink-700 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Europeana
        </a>
        -Datenbank stammen. Entdecke, wie Menschen in der Vergangenheit gekocht
        und gegessen haben.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <img
          src="/spoon.png"
          alt="Beispiel Küchenutensil"
          className="h-[50vh] w-auto max-w-xs rounded shadow"
        />
        <img
          src="/fork.png"
          alt="Beispiel Küchenutensil"
          className="h-[50vh] w-auto max-w-xs rounded shadow"
        />
        <img
          src="/knife.png"
          alt="Beispiel Küchenutensil"
          className="h-[50vh] w-auto max-w-xs rounded shadow"
        />
      </div>
    </div>
  );
}
