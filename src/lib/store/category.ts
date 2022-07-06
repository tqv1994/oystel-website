import type { Identifiable, Nameable } from './types';

export type Kind = Identifiable & Nameable;

export function mustFindKind(kinds: Kind[], id: string): Kind {
  const kind = kinds.find((t) => t.id === id);
  return (
    kind || {
      id: '0',
      name: '',
    }
  );
}
