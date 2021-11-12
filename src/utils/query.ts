import { Paginate } from '@customtypes/product';
import queryString, { ParsedQuery } from 'query-string';

export const parseQuery = (query: string): ParsedQuery<string> => {
  return queryString.parse(query);
};

export const getPagination = (query?: string): Paginate => {
  let take = 25;
  let skip = 0;
  let keyword = '';
  if (query) {
    const parsed = parseQuery(query);
    if (parsed.keyword) keyword = parsed.keyword as string;
    if (parsed.take) take = Number(parsed.take);
    if (parsed.skip) skip = Number(parsed.skip);
  }
  return { take, skip, keyword };
};
