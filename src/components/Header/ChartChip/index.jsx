import { Chip } from '@mui/material';
import classNames from 'classnames'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../../../config'

const ChartChip = ({ label }) => {
    const [ , drag ] = useDrag(() => ({
        type: ItemTypes.CHART,
        item: { type: label },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
    }));

    return (
        <Chip   
            className={classNames('capitalize mr-2.5 text-base border-blue-700 text-blue-700 mb-3.5')}
            label={label.replaceAll('-', ' ')} 
            ref={drag}
            variant="outlined"
        />
    );
};

export default ChartChip;