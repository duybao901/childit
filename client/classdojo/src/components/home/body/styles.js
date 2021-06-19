const styles = theme => {
    return {
        group: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
        },
        headerButton: {
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
            transition: 'all .15s linear',
            '&:hover': {
                boxShadow: 'rgba(234, 236, 245,.5) 0px 8px 0px',
            }
        }
    }
}

export default styles;
