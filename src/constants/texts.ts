/**
 * All user-facing strings for the backend API.
 * Mirrors the frontend TEXTS pattern for consistency.
 */
export const TEXTS = {
  AUTH: {
    NOT_LOGGED_IN: '未登录，请先登录',
    TOKEN_EXPIRED: '登录已过期，请重新登录',
    NO_PERMISSION: '无权限访问',
    PERMISSION_CHECK_FAILED: '权限验证失败',
  },
  PROFILE: {
    USER_NOT_FOUND: '用户不存在',
    UPDATE_FAILED: '更新个人资料失败',
    FETCH_FAILED: '获取用户信息失败',
    INVALID_PHONE: '电话号码格式无效（请使用 E.164 格式，如 +86...）',
    NO_FIELDS_TO_UPDATE: '没有需要更新的字段',
  },
  UPLOAD: {
    INVALID_FILE_TYPE: '无效的文件类型（仅支持 JPG、PNG、WebP）',
    MISSING_EXTENSION: '缺少文件扩展名',
    URL_GENERATION_FAILED: '生成上传链接失败',
    MISSING_OBJECT_URL: '缺少文件地址',
    AVATAR_CONFIRM_FAILED: '确认头像更新失败',
  },
  PAYMENT: {
    NO_CUSTOMER: '未找到支付客户信息，请先创建订阅',
    SETUP_INTENT_FAILED: '创建支付设置失败',
    LIST_FAILED: '获取支付方式列表失败',
    SET_DEFAULT_FAILED: '设置默认支付方式失败',
    DELETE_FAILED: '删除支付方式失败',
    NOT_FOUND: '支付方式不存在',
    DELETE_CONFIRM: '支付方式已删除',
    DEFAULT_SET: '已设为默认支付方式',
  },
} as const;
