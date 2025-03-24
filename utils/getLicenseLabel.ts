export function getLicenseLabel(url: string): {
  label: string;
  description: string;
} {
  if (!url)
    return {
      label: "Unbekannte Lizenz",
      description: "Keine Lizenzinformationen verfügbar.",
    };

  if (url.includes("InC")) {
    return {
      label: "In Copyright",
      description:
        "Dieses Werk ist urheberrechtlich geschützt. Sie benötigen möglicherweise eine Erlaubnis für die Nutzung.",
    };
  }
  if (url.includes("NoC")) {
    return {
      label: "No Copyright",
      description:
        "Dieses Werk ist nicht urheberrechtlich geschützt und kann frei verwendet werden.",
    };
  }
  if (url.includes("CC0")) {
    return {
      label: "CC0",
      description:
        "Dieses Werk wurde in die Gemeinfreiheit übergeben und kann ohne Einschränkungen genutzt werden.",
    };
  }
  if (url.includes("by/4.0")) {
    return {
      label: "CC BY",
      description:
        "Dieses Werk darf unter Angabe des Urhebers für beliebige Zwecke genutzt werden.",
    };
  }
  if (url.includes("by-sa")) {
    return {
      label: "CC BY-SA",
      description:
        "Dieses Werk darf unter Angabe des Urhebers genutzt und bearbeitet werden, muss aber unter gleichen Bedingungen weitergegeben werden.",
    };
  }
  if (url.includes("by-nd")) {
    return {
      label: "CC BY-ND",
      description:
        "Dieses Werk darf unter Angabe des Urhebers genutzt werden, jedoch sind keine Bearbeitungen erlaubt.",
    };
  }
  if (url.includes("by-nc")) {
    return {
      label: "CC BY-NC",
      description:
        "Dieses Werk darf unter Angabe des Urhebers für nicht-kommerzielle Zwecke genutzt werden.",
    };
  }
  if (url.includes("by-nc-sa")) {
    return {
      label: "CC BY-NC-SA",
      description:
        "Dieses Werk darf unter Angabe des Urhebers für nicht-kommerzielle Zwecke genutzt und bearbeitet werden, muss aber unter gleichen Bedingungen weitergegeben werden.",
    };
  }
  if (url.includes("by-nc-nd")) {
    return {
      label: "CC BY-NC-ND",
      description:
        "Dieses Werk darf unter Angabe des Urhebers für nicht-kommerzielle Zwecke genutzt werden, jedoch sind keine Bearbeitungen erlaubt.",
    };
  }

  return {
    label: "Lizenz anzeigen",
    description: "Informationen zur Lizenz dieses Werks anzeigen.",
  };
}
