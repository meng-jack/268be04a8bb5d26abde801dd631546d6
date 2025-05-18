/**
 * a very basic logger that has pretty formatting
 */
export namespace Logging {
    export function log(level: Level, message: any) {
        // control the logging state
        //
        // the second condition makes sure the logger doesnt log a level that is 'silenced'
        if (level >= loggerLevel) {
            const style = LevelStyles[level];
            const preparedMessage = `%c ${new Date().toISOString()} | [${Logging.Level[level].padEnd(6)}]: ${message}`;
            const preparedFormatting =
                `background-color: ${style.background}; color: ${style.foreground}; font-weight: ${style.bolded === undefined ? "normal" : "bold"}; font-size: 1.2em;`;
            switch (level) {
                case Level.WARN:
                    console.warn(preparedMessage, preparedFormatting);
                    break;
                 case Level.SEVERE:
                    console.error(preparedMessage, preparedFormatting);
                    break;
                default:
                    console.log(preparedMessage, preparedFormatting);
                    break;
            }
        }
    }

    export function severe(message: any) {
        log(Level.SEVERE, message);
    }

    export function warn(message: any) {
        log(Level.WARN, message);
    }

    export function info(message: any) {
        log(Level.INFO, message);
    }

    export function config(message: any) {
        log(Level.CONFIG, message);
    }

    export function fine(message: any) {
        log(Level.FINE, message);
    }

    export function finer(message: any) {
        log(Level.FINER, message);
    }

    export function finest(message: any) {
        log(Level.FINEST, message);
    }

    /**
     * logging levels that are copied over from java's own logging level in the jdk
     *
     * could be a const but then {@link log} wont work.
     */
    export enum Level {
        // show nothing
        OFF = 10000,
        // problem level 2
        SEVERE = 1000,
        // problem level 1
        WARN = 900,
        // general
        INFO = 800,
        // static config info
        CONFIG = 700,
        // trace level 1
        FINE = 500,
        // trace level 2
        FINER = 400,
        // trace level 3
        FINEST = 300,
        // show everything
        ALL = 0
    }

    // ephemeral value
    let loggerLevel: Level = Level.INFO;

    /**
     * canonical styling builtin for the individual levels and used by {@link log}
     *
     * opinionated :)
     */
    export const LevelStyles: Record<Level, { foreground: string, background: string, bolded?: boolean; }> = {
        [Logging.Level.OFF]: { foreground: '#000000', background: '' }, // Black fg, no bg
        [Logging.Level.SEVERE]: { foreground: '#FFFFFF', background: '#FF0000', bolded: true }, // White fg, Red bg
        [Logging.Level.WARN]: { foreground: '#000000', background: '#FFA500', bolded: true }, // Black fg, Orange bg
        [Logging.Level.INFO]: { foreground: '#FFFFFF', background: '#008000' }, // White fg, Green bg
        [Logging.Level.CONFIG]: { foreground: '#FFFFFF', background: '#0000FF' }, // White fg, Blue bg
        [Logging.Level.FINE]: { foreground: '#000000', background: '#D3D3D3' }, // Black fg, Light Gray bg
        [Logging.Level.FINER]: { foreground: '#000000', background: '#A9A9A9' }, // Black fg, Dark Gray bg
        [Logging.Level.FINEST]: { foreground: '#000000', background: '#808080' }, // Black fg, Gray bg
        [Logging.Level.ALL]: { foreground: '#000000', background: '#FFFFFF' }, // Black fg, White bg
    };


    export function setLevel(level: Level) {
        loggerLevel = level;
    }

}
