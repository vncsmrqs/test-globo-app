import BaseError from './base-error';

export class NetworkError extends BaseError {
  constructor(message) {
    const internalMessage = 'Não conseguimos nos comunicar os servidores';
    super(`${internalMessage}${message ? ': ' + message : ''}`);
  }
}

export default NetworkError;
