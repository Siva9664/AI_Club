/* eslint-disable @typescript-eslint/no-explicit-any */

/** A user record without the password hash, for safe API output. */
export function serializeUser<T extends { role?: string; passwordHash?: string }>(user: T) {
  const { passwordHash: _passwordHash, role, ...rest } = user as any;
  return {
    ...rest,
    role: role ? String(role).toLowerCase() : role,
  };
}

/**
 * Normalises a content row for API output:
 * - status is emitted in lower case (draft | pending | approved | rejected)
 * - `updatedBy` is flattened from the relation into the editor's name
 */
export function serializeResource<T extends Record<string, any>>(row: T) {
  const { updatedBy, ...rest } = row;
  return {
    ...rest,
    status: rest.status !== undefined ? String(rest.status).toLowerCase() : undefined,
    updatedBy: updatedBy?.name ?? null,
  };
}

export function serializeResourceList<T extends Record<string, any>>(rows: T[]) {
  return rows.map(serializeResource);
}
