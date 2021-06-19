const styles = (theme) => {
    return {
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            borderRadius: '10px',
            outline: 'none',
            overflow: 'hidden',
            boxShadow: theme.shadows[5],
            width: '722px',
        },
    }
}
export default styles;