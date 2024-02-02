/**
 * 現在のタイムスタンプを生成します。
 * @returns {string} フォーマットされたタイムスタンプ
 */

export const generateTimestamp = (): string => {
  return new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);
};
