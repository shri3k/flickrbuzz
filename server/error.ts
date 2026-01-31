import type { FastifyReply } from 'fastify';

export class FlickrError extends Error {
  constructor(message: string, response: FastifyReply) {
    const detailedMessage = response
      ? `${message}: ${JSON.stringify(response)}`
      : message;
    console.log(`${detailedMessage}`);
    super(detailedMessage);
    this.name = 'FlickrError';
  }
}

export class FlickPublicFeedError extends FlickrError {
  constructor(message: string, response: FastifyReply) {
    super(message, response);
    this.name = 'FlickPublicFeedError';
  }
}

export class FlickrSearchError extends FlickrError {
  constructor(message: string, response: FastifyReply) {
    super(message, response);
    this.name = 'FlickrSearchError';
  }
}
