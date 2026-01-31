export class PublicFeedAPIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PublicFeedError";
  }
}

export class SearchFeedAPIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SearchFeedError";
  }
}
