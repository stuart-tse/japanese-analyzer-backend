import type { ActivityType } from './streakService.js';

// --- Title / Meta mappers for ActivityLog entries ---

interface ActivityLogOpts {
  readonly wordsLearned?: number;
  readonly lessonTitle?: string;
}

const TITLE_MAP: Readonly<Record<ActivityType, string>> = {
  analysis: '完成文章解析',
  srs_review: '完成SRS复习',
  pack_study: '学习词汇包',
  pack_quiz: '完成词汇测验',
  cloze_practice: '完成完形填空练习',
};

export function getTitleForActivity(activityType: ActivityType, opts?: ActivityLogOpts): string {
  if (opts?.lessonTitle) {
    return '完成课程章节';
  }
  return TITLE_MAP[activityType] ?? activityType;
}

export function getMetaForActivity(activityType: ActivityType, opts?: ActivityLogOpts): string | null {
  if (opts?.lessonTitle) {
    return opts.lessonTitle;
  }
  if (activityType === 'analysis' && typeof opts?.wordsLearned === 'number' && opts.wordsLearned > 0) {
    return `学习了${opts.wordsLearned}个词汇`;
  }
  return null;
}

// --- Dot color mapping for frontend ---

const DOT_COLOR_MAP: Readonly<Record<string, string>> = {
  analysis: 'info',
  srs_review: 'success',
  pack_study: 'info',
  pack_quiz: 'warning',
  cloze_practice: 'info',
  lesson_complete: 'success',
};

export function getDotColorForActivity(activityType: string): string {
  return DOT_COLOR_MAP[activityType] ?? 'default';
}

// --- Relative time formatter (Chinese) ---

export function formatRelativeTime(date: Date): string {
  const now = Date.now();
  const diffMs = now - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMinutes < 60) return '刚刚';
  if (diffHours < 24) return `${diffHours}小时前`;
  if (diffDays < 7) return `${diffDays}天前`;
  const diffWeeks = Math.floor(diffDays / 7);
  return `${diffWeeks}周前`;
}
