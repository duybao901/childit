
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
        group: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            '& a': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                fontSize: '18px',
                lineHeight: '26px',
                fontWeight: '600',
                verticalAlign: 'middle',
                border: '2px solid rgb(234, 236, 245)',
                borderRadius: '20px',
                marginRight: '20px',
                padding: '20px',
                transition: 'all .15s linear'
            },
            '& a:hover': {
                boxShadow: 'rgba(234, 236, 245,1) 0px 8px 0px',
            }
        }
    }
}

export default styles;