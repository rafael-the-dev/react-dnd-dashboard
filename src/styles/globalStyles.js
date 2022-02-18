import { makeStyles } from "@mui/styles";

export const useGlobalStyles = makeStyles(theme => ({
    px: {
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    chartSize: {
        minHeight: 250,
        resize: 'both',
        minWidth: 300
    },
    resizer : { 
        bottom: 0,
        background: 'blue',
        cursor: 'se-resize', 
        height: 10,
        position: 'absolute',
        right: 0,
        width: 10, 
    }
}));