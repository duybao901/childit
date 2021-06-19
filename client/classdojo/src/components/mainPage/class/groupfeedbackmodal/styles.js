const styles = theme => {
    return {
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            position: 'relative',
            width: '600px',
            height: '500px',
            backgroundColor: theme.palette.background.paper,
            border: 'none',
            outline: 'none',
            borderRadius: '5px',
            overflow:'hidden',
            boxShadow: theme.shadows[5],
        },
        heading: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: "10px 20px",
            borderBottom: "1px solid rgb(234, 236, 245)",
            "& h2": {
                "maxWidth": "100%",
                "margin": "0px",
                "padding": "0px",
                "fontSize": "18px",
                "fontWeight": "600",
                "float": "left",
                "lineHeight": "40px",
                "whiteSpace": "nowrap",
                "overflow": "hidden",
                "textOverflow": "ellipsis"
            },
            "& i": {
                fontSize: '28px',
                cursor: 'pointer',
                color: "rgb(170, 176, 216)",
            },
        },
        modalEditClass: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paperEditClass: {
            width: '800px',
            outline: 'none',
            borderRadius: '5px',
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            overflow: 'hidden',
        },
    }
}

export default styles;