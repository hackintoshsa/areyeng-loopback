import {getLogger, Logger} from 'log4js';

export const log: Logger = getLogger('areyeng-loopback');
log.level = 'all';