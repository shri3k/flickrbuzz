export class APIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "APIError";
  }
}

export class PublicFeedAPIError extends APIError {
  constructor(message: string) {
    super(message);
    this.name = "PublicFeedError";
  }
}

export class SearchFeedAPIError extends APIError {
  constructor(message: string) {
    super(message);
    this.name = "SearchFeedError";
  }
}
