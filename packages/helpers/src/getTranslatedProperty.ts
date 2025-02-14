/**
 * Get translated property from the given object.
 *
 * @public
 */
export function getTranslatedProperty<T>(
  element: T | undefined | null | never,
  property: keyof T
): string {
  return (element as any)?.translated?.[property] || element?.[property] || "";
}
