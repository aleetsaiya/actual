import React, { createContext, useContext } from 'react';

import q from 'loot-core/src/client/query-helpers';
import { useLiveQuery } from 'loot-core/src/client/query-hooks';
import { getPayeesById } from 'loot-core/src/client/reducers/queries';

export function usePayees() {
  return useLiveQuery(q('payees').select('*'));
}

let PayeesContext = createContext(null);

export function PayeesProvider({ children }) {
  let data = usePayees();
  return <PayeesContext.Provider value={data} children={children} />;
}

export function CachedPayees({ children, idKey }) {
  let data = useCachedPayees({ idKey });
  return children(data);
}

export function useCachedPayees({ idKey }: { idKey? } = {}) {
  let data = useContext(PayeesContext);
  return idKey && data ? getPayeesById(data) : data;
}