const styles = (theme) => {
    return {
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            outline: 'none',
            borderRadius: '5px',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            width: '500px',
            height: '450px',

            position: 'relative',
        },
    }
}

export default styles;