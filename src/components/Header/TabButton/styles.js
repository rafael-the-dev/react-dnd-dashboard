import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles(theme => ({
   defaultButton: {
       backgroundColor: '#1565c0 !important',
       width: '33.333333333%',
       [theme.breakpoints.up('sm')]: {
           backgroundColor: '#FFF !important',
           color: '#1565c0'
       }
   }
}))