import { randomCode } from "./random"

export function generateSlug(str: string) {
  // Remove white space and convert to lower case
  str = str.trim().toLowerCase()

  // Replace non-alphanumeric characters with hyphens
  str = str.replace(/[^a-z0-9]+/g, '-')

  // Remove any leading or trailing hyphens
  str = str.replace(/^-+|-+$/g, '')

  return str
}

export function slugify(text: string) {
  return generateSlug(text) + '-' + randomCode(15)
}
