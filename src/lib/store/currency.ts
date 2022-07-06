import type { Base } from './types';

export type Currency = Base & {
  name: string;
  prefix: string;
  suffix: string;
  locale: string;
};

export const currencyFieldsFragment = `
fragment currencyFields on Currencies {
  id
  name
  prefix
  locale
}
`;
