import colors from "colors";

/**
 * a very basic logger that has pretty formatting
 */
export namespace Logging {
    export function log(level: Level, message: any) {
        // control the logging state
        //
        // the second condition makes sure the logger doesnt log a level that is 'silenced'
        if (level >= loggerLevel) {
            let preparedMessage = LevelStyles[level].styler(`${new Date().toISOString()} | [${Logging.Level[level].padEnd(6)}]: ${message}`);
            switch (level) {
                case Level.WARN:
                    console.warn(preparedMessage);
                    break;
                case Level.SEVERE:
                    console.error(preparedMessage);
                    break;
                default:
                    console.log(preparedMessage);
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
    export const LevelStyles: Record<Level, { styler: colors.Color; }> = {
        [Logging.Level.OFF]: { styler: colors.white },
        [Logging.Level.SEVERE]: { styler: colors.white.bgRed.bold },
        [Logging.Level.WARN]: { styler: colors.black.bgYellow.bold },
        [Logging.Level.INFO]: { styler: colors.blue },
        [Logging.Level.CONFIG]: { styler: colors.white.bgGreen },
        [Logging.Level.FINE]: { styler: colors.gray },
        [Logging.Level.FINER]: { styler: colors.gray },
        [Logging.Level.FINEST]: { styler: colors.gray },
        [Logging.Level.ALL]: { styler: colors.white },
    };


    export function setLevel(level: Level) {
        loggerLevel = level;
    }

}
