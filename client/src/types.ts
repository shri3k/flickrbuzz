export type Maybe<T> = T | null | undefined;
export type Mode = 'all' | 'any';
export type FeedData = {
  title: string;
  link: string;
  media: {
    m: string;
  };
  date_taken: string;
  description: string;
  published: string;
  author: string;
  author_id: string;
  tags: string;
};
