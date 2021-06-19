const styles = (theme) => {
    return {
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            width: '800px',
            outline: 'none',
            borderRadius: '5px',
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            overflow: 'hidden',
        },
        heading: {
            padding: '20px 20px 10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            '& h2': {
                fontSize: '20px',
                fontFamily: "'ProximaNova', 'Helvetica Neue', Helvetica, Arial, sans- serif",
                color: '#2c2a50',
            },
            '& i': {
                fontSize: '30px',
                color: 'rgb(170, 176, 216)',
                cursor: 'pointer',
                opacity: '0.7',
                '&:hover': {
                    opacity: '1',
                }
            }
        },
    }
}
export default styles;