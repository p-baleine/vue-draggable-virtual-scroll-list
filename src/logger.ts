export interface Output {
  log(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
}

export enum Level {
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

const NAME = 'vdvsl';

export class Logger {
  private out: Output = window.console;
  private level: Level = Level.DEBUG;

  constructor({ out, level }: Options) {
    this.out = out;
    this.level = level;
  }

  debug(...args: any[]) {
    if (Level.DEBUG < this.level) {
      return;
    }
    this.out.log.apply(this.out, this.withPrefix(args));
  }

  info(...args: any[]) {
    if (Level.INFO < this.level) {
      return;
    }
    this.out.log.apply(this.out, this.withPrefix(args));
  }

  warning(...args: any[]) {
    if (Level.WARNING < this.level) {
      return;
    }
    this.out.warn.apply(this.out, this.withPrefix(args));
  }

  error(...args: any[]) {
    if (Level.ERROR < this.level) {
      return;
    }
    this.out.error.apply(this.out, this.withPrefix(args));
  }

  critical(...args: any[]) {
    if (Level.CRITICAL < this.level) {
      return;
    }
    this.out.error.apply(this.out, this.withPrefix(args));
  }

  withPrefix(args: any[]) {
    return [`[${NAME}] `].concat(args);
  }
}

export default new Logger({
  out: window.console,
  level: (process && process.env
    && process.env.NODE_ENV === 'development')
    ? Level.DEBUG : Level.ERROR
})
