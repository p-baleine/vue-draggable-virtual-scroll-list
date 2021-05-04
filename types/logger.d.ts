export interface Output {
  log(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
}
export declare enum Level {
  DEBUG = 10,
  INFO = 20,
  WARNING = 30,
  ERROR = 40,
  CRITICAL = 50
}
export interface Options {
  out: Output;
  level: Level;
}
export declare class Logger {
  private out;
  private level;
  constructor({ out, level }: Options);
  debug(...args: any[]): void;
  info(...args: any[]): void;
  warning(...args: any[]): void;
  error(...args: any[]): void;
  critical(...args: any[]): void;
  withPrefix(args: any[]): string[];
}
declare const _default: Logger;
export default _default;
