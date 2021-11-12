import queryString, { ParsedQuery } from 'query-string';
export const parseQuery = (query: string): ParsedQuery<string> => {
  return queryString.parse(query);
};
