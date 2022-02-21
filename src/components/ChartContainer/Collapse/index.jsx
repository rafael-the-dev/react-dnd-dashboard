import { Collapse } from '@mui/material';
import classNames from 'classnames'
import { useMemo } from 'react';
import { useGlobalStyles } from '../../../styles';
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../../../config'
import AxeChip from '../AxeChip'

const CollapseContainer = ({ axeList, chipDeleteHandler, dropHandler, open, tabID, setAxeList  }) => {
    const globalStyles = useGlobalStyles();
    const columnsList = useMemo(() => (
        axeList.map((item, index) => (
            <AxeChip 
                deleteHandler={chipDeleteHandler(item, setAxeList)}
                id={index}
                label={item} 
            />
        ))
    ), [ axeList, chipDeleteHandler, setAxeList ]);

    const [, drop] = useDrop(
        () => ({
            accept: [ ItemTypes.SALE_COLUMN, ],
            drop: (item) => {
                console.log(item);
                setAxeList(list => [ ...list, item.column ])
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        }),
        []
    );

    return (
        <Collapse in={ tabID === open }>
            <div 
                className={classNames(globalStyles.chipsContainer, `flex flex-wrap items-center pt-4 pb-2 px-3`)}
                ref={drop}>
                { columnsList }
            </div>
        </Collapse>
    );
};

export default CollapseContainer;