export const getUrlForModel = (model: string, id: any = null) => {
  if (id) {
    return `crud/${id}?model=${model}`;
  }
  return `crud?model=${model}`;
};
const apiBaseUrl = String(import.meta.env.VITE_API_BASE_URL || "").replace(
  /\/+$/,
  "",
);
export const baseUrlWithPrefix = /\/api\/v1$/.test(apiBaseUrl)
  ? apiBaseUrl
  : `${apiBaseUrl}/api/v1`;
export const API_CRUD_FIND_WHERE = "crud/find-where";

export const endpoints = {
  csrfToken: "/auth/csrf-token",
  login: "/auth/login-superadmin",
  getMe: "/auth/admin",
  logout: "/auth/admin-logout",
  refreshToken: "/auth/admin-refresh-token",
  cmsPages: "/crud?model=cmsPage",
  cmsFindWhere: "/crud/find-where?model=cmsPage",
  uploadImage: "/admin/uploads/image",
};
