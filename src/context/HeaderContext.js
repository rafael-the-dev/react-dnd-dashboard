import { createContext, useCallback, useMemo, useState } from 'react';

export const HeaderContext = createContext();
HeaderContext.displayName = 'HeaderContext';

export const HeaderContextProvider = ({ children }) => {
    const tabsID = useMemo(() => ({
        columns: 'columns-tab',
        graphs: 'graphs-tab',
        tables: 'tables-tab'
    }), []);

    const [ open, setOpen ] = useState();
    const tabClickHanlder = useCallback(prop => () => setOpen(currentValue => {
        if(currentValue === prop)
            return '';
        return prop;
    }), []);
    const openedTab = useMemo(() => open, [ open ])

    return (
        <HeaderContext.Provider value={{ openedTab, tabClickHanlder, tabsID }}>{ children }</HeaderContext.Provider>
    );
};