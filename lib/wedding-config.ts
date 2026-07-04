/**
 * ─────────────────────────────────────────────────────────────────────────
 *  CONTENU DU MARIAGE — source unique de vérité
 * ─────────────────────────────────────────────────────────────────────────
 *  Modifiez ici tout ce qui concerne le couple, la date, les lieux, l'histoire
 *  et la galerie. Toutes les valeurs ci-dessous sont des EXEMPLES — remplacez-les
 *  par les vraies informations.
 *
 *  Typographie française : on utilise les guillemets « … » et une espace
 *  insécable ( ) avant ; : ! ? et à l'intérieur des guillemets. Les photos
 *  pointent vers des fichiers locaux dans /public/photos ; si un fichier manque,
 *  un dégradé doux s'affiche à sa place pour ne jamais casser la mise en page.
 * ─────────────────────────────────────────────────────────────────────────
 */

export interface Photo {
  /** Chemin de l'image depuis /public, ex. "/photos/hero.jpg" */
  src: string;
  /** Texte alternatif (accessibilité) */
  alt: string;
}

export interface Venue {
  /** Petit intitulé au-dessus de la carte, ex. « La cérémonie » */
  kicker: string;
  /** Nom du lieu, ex. « The Glasshouse Pavilion » */
  name: string;
  /** Adresse complète affichée sur la carte */
  address: string;
  /** Heure lisible, ex. « 16 h 00 » (avec espaces insécables) */
  time: string;
  /**
   * Requête servant à construire le lien d'itinéraire Google Maps.
   * Utilisez le nom + l'adresse du lieu, ou un plus-code / lat,lng.
   */
  mapQuery: string;
}

export interface StoryChapter {
  /** Petit intitulé, ex. une année et un lieu */
  eyebrow: string;
  /** Titre du chapitre */
  title: string;
  /** Un court paragraphe */
  body: string;
  /** Photo optionnelle. Omettez-la pour un chapitre sans image. */
  photo?: Photo;
}

export interface GalleryImage extends Photo {
  /** « tall » occupe deux rangées ; « wide » occupe deux colonnes. */
  span?: "tall" | "wide";
}

export interface WeddingConfig {
  couple: {
    /** Prénom du premier partenaire */
    one: string;
    /** Prénom du second partenaire */
    two: string;
    /** Symbole qui relie les deux prénoms, ex. « & » */
    joiner: string;
  };
  /** Date-heure ISO 8601 du début de la cérémonie, avec fuseau horaire. */
  dateISO: string;
  /** Date pré-formatée pour l'affichage (séparée pour la garder sous contrôle). */
  dateDisplay: string;
  /** Ville / région, affichée sous la date */
  location: string;
  /** Phrase d'accroche du hero */
  tagline: string;

  hero: {
    /** Surtitre au-dessus des prénoms */
    surtitle: string;
    /** Bouton d'ouverture (visible sur mobile) */
    openLabel: string;
    /** Indice de défilement sous le hero */
    scrollHint: string;
    /** Libellé accessible du repère de défilement */
    scrollAriaLabel: string;
    /** Photo de fond du hero */
    photo: Photo;
  };

  countdown: {
    eyebrow: string;
    title: string;
    labels: { days: string; hours: string; minutes: string; seconds: string };
    /** Petit texte sous le compte à rebours */
    subtext: string;
    /** Message affiché le jour J */
    todayMessage: string;
  };

  story: {
    eyebrow: string;
    title: string;
    intro: string;
    chapters: StoryChapter[];
  };

  events: {
    eyebrow: string;
    title: string;
    /** Libellé du lien d'itinéraire (une flèche est ajoutée après) */
    directionsLabel: string;
    ceremony: Venue;
    reception: Venue;
  };

  gallery: {
    eyebrow: string;
    title: string;
    images: GalleryImage[];
  };

  rsvp: {
    eyebrow: string;
    title: string;
    /** Texte de l'échéance affiché près du formulaire */
    deadline: string;
    /** Nombre max d'invités par réponse (utilisé par le champ nombre) */
    maxGuests: number;
    fields: {
      name: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      attending: { label: string };
      guests: { label: string };
      dietary: { label: string; placeholder: string };
      message: { label: string; placeholder: string };
    };
    /** Libellés des deux boutons de présence */
    attendChoices: { yes: string; no: string };
    /** Libellés du bouton d'envoi */
    submit: { idle: string; submitting: string };
    /** Messages d'erreur ({max} est remplacé par le nombre max d'invités) */
    errors: {
      name: string;
      emailRequired: string;
      emailInvalid: string;
      attending: string;
      guests: string;
      submit: string;
    };
    /** Écran de confirmation ({name} est remplacé par le prénom) */
    success: {
      heading: string;
      yes: string;
      no: string;
    };
  };

  footer: {
    /** Ligne de clôture chaleureuse */
    message: string;
    /** Petite ligne de crédit */
    credit: string;
  };
}

export const wedding: WeddingConfig = {
  couple: {
    one: "Aria",
    two: "Kai",
    joiner: "&",
  },

  // Cérémonie le 2026-09-19 à 16 h 00, UTC+01:00. Adaptez à votre date / fuseau.
  dateISO: "2026-09-19T16:00:00+01:00",
  dateDisplay: "19 septembre 2026",
  location: "Lisbonne, Portugal",
  tagline: "Deux cœurs, une même histoire — venez l'écrire avec nous.",

  hero: {
    surtitle: "Nous nous marions",
    openLabel: "Ouvrir l'invitation",
    scrollHint: "Faites défiler",
    scrollAriaLabel: "Défiler vers le compte à rebours",
    photo: {
      src: "/photos/hero.jpg",
      alt: "Aria et Kai, main dans la main au coucher du soleil",
    },
  },

  countdown: {
    eyebrow: "Compte à rebours",
    title: "Le grand jour approche",
    labels: {
      days: "Jours",
      hours: "Heures",
      minutes: "Minutes",
      seconds: "Secondes",
    },
    subtext: "avant notre « oui » à Lisbonne",
    todayMessage: "C'est aujourd'hui !",
  },

  story: {
    eyebrow: "Notre histoire",
    title: "Comment tout a commencé",
    intro:
      "Chaque histoire d'amour commence par une première étincelle. Voici, en quelques mots, comment la nôtre a pris feu.",
    chapters: [
      {
        eyebrow: "2019 · La rencontre",
        title: "Un heureux hasard",
        body: "Placés côte à côte lors d'un dîner entre amis où aucun de nous ne voulait aller. Nous sommes restés jusqu'à ce que le restaurant éteigne ses lumières.",
        photo: {
          src: "/photos/story-1.jpg",
          alt: "Aria et Kai, la rencontre",
        },
      },
      {
        eyebrow: "2022 · Le chemin",
        title: "Construire à deux",
        body: "Trois villes, une plante verte très patiente et mille petits matins plus tard, nous avons compris que nous étions déjà chez nous, l'un auprès de l'autre.",
        photo: {
          src: "/photos/story-2.jpg",
          alt: "Aria et Kai, le chemin parcouru ensemble",
        },
      },
      {
        eyebrow: "2026 · La promesse",
        title: "Pour toujours",
        body: "Sur un toit paisible, sous un ciel tout simple, l'un de nous a posé la seule question qui comptait vraiment. La réponse n'a jamais fait de doute.",
        photo: {
          src: "/photos/story-3.jpg",
          alt: "Aria et Kai, la promesse",
        },
      },
    ],
  },

  events: {
    eyebrow: "Les détails",
    title: "Où & Quand",
    directionsLabel: "Voir l'itinéraire",
    ceremony: {
      kicker: "La cérémonie",
      name: "The Glasshouse Pavilion",
      address: "Rua das Estrelas 12, 1200-001 Lisbonne",
      time: "16 h 00",
      mapQuery: "The Glasshouse Pavilion, Rua das Estrelas 12, Lisbon",
    },
    reception: {
      kicker: "La réception",
      name: "Aurora Rooftop",
      address: "Avenida do Horizonte 88, 1250-002 Lisbonne",
      time: "19 h 00",
      mapQuery: "Aurora Rooftop, Avenida do Horizonte 88, Lisbon",
    },
  },

  gallery: {
    eyebrow: "Moments",
    title: "Quelques souvenirs",
    images: [
      { src: "/photos/gallery-1.jpg", alt: "Souvenir du mariage 1", span: "tall" },
      { src: "/photos/gallery-2.jpg", alt: "Souvenir du mariage 2" },
      { src: "/photos/gallery-3.jpg", alt: "Souvenir du mariage 3" },
      { src: "/photos/gallery-4.jpg", alt: "Souvenir du mariage 4", span: "wide" },
      { src: "/photos/gallery-5.jpg", alt: "Souvenir du mariage 5" },
      { src: "/photos/gallery-6.jpg", alt: "Souvenir du mariage 6", span: "tall" },
      { src: "/photos/gallery-7.jpg", alt: "Souvenir du mariage 7" },
      { src: "/photos/gallery-8.jpg", alt: "Souvenir du mariage 8", span: "wide" },
    ],
  },

  rsvp: {
    eyebrow: "RSVP",
    title: "Serez-vous des nôtres ?",
    deadline: "Merci de répondre avant le 15 août 2026",
    maxGuests: 4,
    fields: {
      name: { label: "Nom complet", placeholder: "Votre nom" },
      email: { label: "E-mail", placeholder: "vous@exemple.com" },
      attending: { label: "Serez-vous présent(e) ?" },
      guests: { label: "Nombre d'invités" },
      dietary: {
        label: "Régime alimentaire (facultatif)",
        placeholder: "Allergies, préférences…",
      },
      message: {
        label: "Un mot pour nous (facultatif)",
        placeholder: "Partagez un vœu, une chanson, un mot…",
      },
    },
    attendChoices: {
      yes: "Avec joie, j'y serai",
      no: "À regret, je ne pourrai pas",
    },
    submit: {
      idle: "Envoyer ma réponse",
      submitting: "Envoi…",
    },
    errors: {
      name: "Merci d'indiquer votre nom.",
      emailRequired: "Nous avons besoin d'un e-mail pour vous joindre.",
      emailInvalid: "Cet e-mail ne semble pas valide.",
      attending: "Dites-nous si vous pourrez venir.",
      guests: "Choisissez entre 1 et {max} invités.",
      submit: "Une erreur s'est produite. Merci de réessayer.",
    },
    success: {
      heading: "Merci, {name}.",
      yes: "C'est noté — nous avons hâte de célébrer ce jour avec vous.",
      no: "Vous allez nous manquer, mais merci de nous avoir prévenus.",
    },
  },

  footer: {
    message: "Avec tout notre amour, nous avons hâte de vous y retrouver.",
    credit: "Créé avec soin pour les personnes qui nous sont chères.",
  },
};

/** Construit une URL d'itinéraire Google Maps à partir de la requête d'un lieu. */
export function directionsUrl(venue: Venue): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    venue.mapQuery,
  )}`;
}
