import {
  googleReviewProfileSchema,
  reviewSchema,
  type GoogleReviewProfile,
  type Review,
} from "@/lib/content/schema";

const l = (es: string, en: string) => ({ es, en });

/**
 * Fichas públicas de Google Business Profile confirmadas por la cliente
 * (reunión 30/06/2026, mejora 04). Los Place IDs se obtuvieron de las
 * fichas públicas compartidas por Jeffrey el 03/07/2026.
 */
export const googleReviewProfiles = googleReviewProfileSchema.array().parse([
  {
    id: "google-cali",
    locationId: "cali",
    label: l("Cali, Colombia", "Cali, Colombia"),
    placeId: "ChIJg98SfXOnMI4RAyDR2tKq6Ng",
    writeReviewUrl:
      "https://search.google.com/local/writereview?placeid=ChIJg98SfXOnMI4RAyDR2tKq6Ng",
    listingUrl:
      "https://www.google.com/maps/place/?q=place_id:ChIJg98SfXOnMI4RAyDR2tKq6Ng",
    rating: 5,
    reviewCount: 61,
    capturedAt: "2026-07-03",
  },
  {
    id: "google-puerto-sagunto",
    locationId: "puerto-sagunto",
    label: l("Puerto de Sagunto, España", "Puerto de Sagunto, Spain"),
    placeId: "ChIJ97PZB9gXYA0R3HuqKedSjM0",
    writeReviewUrl:
      "https://search.google.com/local/writereview?placeid=ChIJ97PZB9gXYA0R3HuqKedSjM0",
    listingUrl:
      "https://www.google.com/maps/place/?q=place_id:ChIJ97PZB9gXYA0R3HuqKedSjM0",
    capturedAt: "2026-07-03",
  },
] satisfies GoogleReviewProfile[]);

/**
 * Reseñas reales copiadas de la ficha pública de Google de Cali el
 * 03/07/2026 (texto original en español; inglés localizado). No inventar
 * reseñas: cualquier reseña nueva debe existir en la ficha de Google.
 */
export const reviews = reviewSchema.array().parse([
  {
    id: "review-zule-suarez",
    profileId: "google-cali",
    author: "Zule Suárez",
    rating: 5,
    text: l(
      "He ido a tantas partes que me prometen unas hermosas cejas, y sólo me las han arruinado. Y me arriesgué con una henna en este lugar y han superado mis expectativas, muy buen trabajo.",
      "I've been to so many places that promise beautiful brows and only ruined them. I took a chance on a henna treatment here and they exceeded my expectations — excellent work.",
    ),
    dateLabel: l("Hace un año", "A year ago"),
    source: "google",
  },
  {
    id: "review-maria-camila-alzate",
    profileId: "google-cali",
    author: "María Camila Alzate Rodríguez",
    rating: 5,
    text: l(
      "¡Siempre quedo encantada con el servicio de Xiomara y su equipo! Mis cejas en henna quedan preciosas cada vez que la visito. Xiomara es una verdadera experta en su trabajo y siempre recomiendo sus servicios.",
      "I'm always delighted with the service from Xiomara and her team! My henna brows look beautiful every time I visit. Xiomara is a true expert at what she does and I always recommend her services.",
    ),
    dateLabel: l("Hace 2 años", "2 years ago"),
    source: "google",
  },
  {
    id: "review-nathalia-mora",
    profileId: "google-cali",
    author: "Nathalia Mora Betancur",
    rating: 5,
    text: l(
      "Le regalé a mi mamá una micropigmentación de cejas y quedó encantada con el resultado, le quedaron divinas. El proceso no fue doloroso, cicatrizó súper bien y la atención de Xiomi es excelente, su dedicación y trabajo 10 de 10.",
      "I gave my mom a brow micropigmentation as a gift and she was thrilled with the result — they turned out gorgeous. The process wasn't painful, it healed beautifully, and Xiomi's care is excellent. Her dedication and work: 10 out of 10.",
    ),
    dateLabel: l("Hace 2 años", "2 years ago"),
    source: "google",
  },
  {
    id: "review-julia-garcia",
    profileId: "google-cali",
    author: "Julia García Martín",
    rating: 5,
    text: l(
      "Me hice las cejas con ella y me encantaron, todo el mundo me preguntaba dónde me había hecho el tratamiento. Recomendado con los ojos cerrados. Más adelante me haré la micropigmentación de labios.",
      "I had my brows done with her and I loved them — everyone kept asking me where I'd had the treatment done. I'd recommend her with my eyes closed. I'll be back for lip micropigmentation next.",
    ),
    dateLabel: l("Hace 2 semanas", "2 weeks ago"),
    source: "google",
  },
  {
    id: "review-michelle-pulido",
    profileId: "google-cali",
    author: "Michelle Pulido",
    rating: 5,
    text: l(
      "Muy limpio y hermoso su trabajo, te explica con detalle cada cosita que te hace, cómo funciona y cómo puedes seguir cuidando cada cosa. Una atención súper amable y cariñosa. Desde Madrid, España.",
      "Her work is very clean and beautiful. She explains every detail of what she does, how it works and how to keep caring for it afterwards. Incredibly kind and warm service. From Madrid, Spain.",
    ),
    dateLabel: l("Hace 2 semanas", "2 weeks ago"),
    source: "google",
  },
  {
    id: "review-laura-arbelaez",
    profileId: "google-cali",
    author: "Laura Arbeláez",
    rating: 5,
    text: l(
      "Tengo mis cejas y labios con micropigmentación ya cicatrizados y fue lo mejor que me pude hacer. La atención de Xiomy es muy buena, siempre te ayuda y te hace todo con mucho amor. Me lo hizo en Madrid, España. La recomiendo 100 %.",
      "My micropigmented brows and lips are fully healed now and it was the best thing I could have done. Xiomy's care is wonderful — she always helps you and does everything with so much love. She did mine in Madrid, Spain. I recommend her 100%.",
    ),
    dateLabel: l("Hace 2 semanas", "2 weeks ago"),
    source: "google",
  },
] satisfies Review[]);
