
const styles = theme => {
    return {
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            width: '500px',
            backgroundColor: theme.palette.background.paper,
            borderRadius: '10px',
            boxShadow: theme.shadows[2],
            padding: theme.spacing(2, 4, 3),
        },
        image: {
            display: 'flex',
            margin: '0 auto'
        },
        detail: {
            textAlign: 'center',
            margin: '20px 0 24px',
            fontSize: '21px',
            lineHeight: '1.4rem',
            fontWeight: 800,      
        },
        loadingWrap: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
        },
        loadingImg: {
            width:'60px'  
        },
    }
}

export default styles;