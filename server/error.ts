import Response from 'node:http';

export class BadResponseError extends Error {
  constructor(message: string, error: Error) {
    const detailedMessage = error
      ? `${message}: ${JSON.stringify(error)}`
      : error;
    super(detailedMessage);
    this.name = 'BadResponseError';
  }
}

export class FlickrError extends Error {
  constructor(message: string, response: Response) {
    const detailedMessage = response
      ? `${message}: ${JSON.stringify(response)}`
      : message;
    console.log(`${detailedMessage}`);
    super(detailedMessage);
    this.name = 'FlickrError';
  }
}

export class FlickPublicFeedError extends FlickrError {
  constructor(message: string, response: Response) {
    super(message, response);
    this.name = 'FlickPublicFeedError';
  }
}

export class FlickrSearchError extends FlickrError {
  constructor(message: string, response: Response) {
    super(message, response);
    this.name = 'FlickrSearchError';
  }
}
