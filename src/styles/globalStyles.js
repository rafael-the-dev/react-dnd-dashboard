import { makeStyles } from "@mui/styles";

export const useGlobalStyles = makeStyles(theme => ({
    px: {
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    chartsContainer: {
        minHeight: 260
    },
    chipsContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.08)'
    },
    chartSize: {
        height: 250,
        width: 300
    },
    resizer : { 
        bottom: 0,
        background: 'blue',
        cursor: 'se-resize', 
        height: 10,
        position: 'absolute',
        right: 0,
        width: 10, 
    },
    tableHeader: {
        '&:hover .table__header-button': {
            opacity: '1 !important',
            fontSize: '1.3rem'
        }
    },
    tableRow: {
        '&:nth-child(even)': {
            backgroundColor: 'rgb(30 64 175 / 5%)'
        }
    },
    collapse: {
        minHeight: 'fit-content !important'
    }
}));