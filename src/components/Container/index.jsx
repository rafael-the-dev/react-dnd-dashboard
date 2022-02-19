import { Paper } from '@mui/material';
import classNames from 'classnames'
import { useRef } from 'react'
import { useGlobalStyles } from '../../styles'

const Container = ({ children }) => {
    const globalStyles = useGlobalStyles();

    let startX, startY, startWidth, startHeight;
    const paperRef = useRef(null);

    const initDrag = (e) => {
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(document.defaultView.getComputedStyle(paperRef.current).width, 10);
        startHeight = parseInt(document.defaultView.getComputedStyle(paperRef.current).height, 10);
        document.documentElement.addEventListener('mousemove', doDrag, false);
        document.documentElement.addEventListener('mouseup', stopDrag, false);
    };

    const doDrag = (e) => {
        paperRef.current.style.width = (startWidth + e.clientX - startX) + 'px';
        paperRef.current.style.height = (startHeight + e.clientY - startY) + 'px';
    }
     
    const stopDrag = (e) => {
        document.documentElement.removeEventListener('mousemove', doDrag, false);    
        document.documentElement.removeEventListener('mouseup', stopDrag, false);
    }

    return (
        <Paper 
            className={classNames(`w-fit max-w-full mb-6 mr-6 relative`)}
            elevation={0}
            ref={paperRef}>
            { children }
            <div 
                className={classNames(globalStyles.resizer)}
                onMouseDown={initDrag}></div>
        </Paper>
    );
};

export default Container;