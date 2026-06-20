const removableSuffixes = [
  " | Cejas Internacionales training",
  " | Formación Cejas Internacionales",
  " | Cejas Internacionales",
];

export function fitMetadataTitle(title: string, maxLength = 65) {
  if (title.length <= maxLength) {
    return title;
  }

  for (const suffix of removableSuffixes) {
    if (title.endsWith(suffix)) {
      return title.slice(0, -suffix.length);
    }
  }

  return title;
}
