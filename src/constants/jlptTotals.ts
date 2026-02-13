/**
 * Reference totals for JLPT vocabulary and grammar items per level.
 * Sourced from /data/jlpt_vocabulary_all.json and /data/jlpt_grammar_all.json.
 */

export const JLPT_VOCAB_TOTALS: Readonly<Record<string, number>> = {
  N5: 866,
  N4: 878,
  N3: 2113,
  N2: 2464,
  N1: 5442,
};

export const JLPT_GRAMMAR_TOTALS: Readonly<Record<string, number>> = {
  N5: 115,
  N4: 98,
  N3: 170,
  N2: 172,
  N1: 164,
};

export const JLPT_LEVELS = ["N5", "N4", "N3", "N2", "N1"] as const;
export type JlptLevel = (typeof JLPT_LEVELS)[number];
