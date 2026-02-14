/**
 * RBAC permission constants and role-permission mapping.
 * Roles are additive: a user with ["student", "admin"] gets permissions from both.
 */

// ============================================
// PERMISSION CONSTANTS
// ============================================

export const PERMISSIONS = {
  // Student permissions
  STUDY_CONTENT: "study:content",
  STUDY_COURSES: "study:courses",
  STUDY_SRS: "study:srs",
  VIEW_OWN_PROGRESS: "view:own_progress",
  MANAGE_OWN_PROFILE: "manage:own_profile",

  // Teacher permissions
  VIEW_CLASS_PROGRESS: "view:class_progress",
  MANAGE_CLASSES: "manage:classes",
  CREATE_ASSIGNMENTS: "create:assignments",

  // Creator permissions
  CREATE_CONTENT: "create:content",
  EDIT_OWN_CONTENT: "edit:own_content",
  VIEW_CONTENT_ANALYTICS: "view:content_analytics",

  // Admin permissions
  MANAGE_USERS: "manage:users",
  MANAGE_ALL_CONTENT: "manage:all_content",
  VIEW_ADMIN_DASHBOARD: "view:admin_dashboard",
  MANAGE_SYSTEM: "manage:system",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

// ============================================
// ROLE DEFINITIONS
// ============================================

export const ROLES = {
  STUDENT: "student",
  TEACHER: "teacher",
  CREATOR: "creator",
  ADMIN: "admin",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

// ============================================
// ROLE → PERMISSIONS MAPPING
// ============================================

export const ROLE_PERMISSIONS: Record<Role, readonly Permission[]> = {
  [ROLES.STUDENT]: [
    PERMISSIONS.STUDY_CONTENT,
    PERMISSIONS.STUDY_COURSES,
    PERMISSIONS.STUDY_SRS,
    PERMISSIONS.VIEW_OWN_PROGRESS,
    PERMISSIONS.MANAGE_OWN_PROFILE,
  ],
  [ROLES.TEACHER]: [
    PERMISSIONS.VIEW_CLASS_PROGRESS,
    PERMISSIONS.MANAGE_CLASSES,
    PERMISSIONS.CREATE_ASSIGNMENTS,
  ],
  [ROLES.CREATOR]: [
    PERMISSIONS.CREATE_CONTENT,
    PERMISSIONS.EDIT_OWN_CONTENT,
    PERMISSIONS.VIEW_CONTENT_ANALYTICS,
  ],
  [ROLES.ADMIN]: [
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MANAGE_ALL_CONTENT,
    PERMISSIONS.VIEW_ADMIN_DASHBOARD,
    PERMISSIONS.MANAGE_SYSTEM,
  ],
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/** Resolve all permissions for a set of roles (deduplicated). */
export function getUserPermissions(roles: readonly string[]): Permission[] {
  const permSet = new Set<Permission>();
  for (const role of roles) {
    const perms = ROLE_PERMISSIONS[role as Role];
    if (perms) {
      for (const p of perms) {
        permSet.add(p);
      }
    }
  }
  return [...permSet];
}

/** Check if the given roles include a specific permission. */
export function hasPermission(
  roles: readonly string[],
  permission: Permission,
): boolean {
  return getUserPermissions(roles).includes(permission);
}

/** Check if the given roles include a specific role. */
export function hasRole(roles: readonly string[], role: string): boolean {
  return roles.includes(role);
}

/** Check if the given roles include any of the specified roles. */
export function hasAnyRole(
  roles: readonly string[],
  requiredRoles: readonly string[],
): boolean {
  return requiredRoles.some((r) => roles.includes(r));
}

/**
 * Derive roles array from legacy `role` field for backward compatibility.
 * If the user already has a `roles` array populated, return it as-is.
 */
export function deriveRoles(
  legacyRole: string,
  rolesArray?: string[] | null,
): string[] {
  if (rolesArray && rolesArray.length > 0) return rolesArray;
  if (legacyRole === "admin") return [ROLES.STUDENT, ROLES.ADMIN];
  return [ROLES.STUDENT];
}
