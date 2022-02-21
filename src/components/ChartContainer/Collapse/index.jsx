import { Collapse } from '@mui/material';
import classNames from 'classnames'
import { useMemo } from 'react';
import { useGlobalStyles } from '../../../styles';

const CollapseContainer = ({ open }) => {
    const globalStyles = useGlobalStyles();
    const columnsList = useMemo(() => (<></>), []);

    return (
        <Collapse in={ 'agreggations' === open }>
            <div className={classNames(globalStyles.chipsContainer, `flex flex-wrap items-center pt-4 pb-2 px-2.5
                sm:justify-end`)}>
                { columnsList }
            </div>
        </Collapse>
    );
};

export default CollapseContainer;