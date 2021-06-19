const styles = theme => {
    return {
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            overflow: 'hidden',
            borderRadius: '5px',
            outline: 'none',
            width: '500px',
            height: '260px',
            backgroundColor: theme.palette.background.paper,
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
        form: {
            // paddingTop: '20px',
            // padding: '50px 20px 80px',
            textAlign: 'center',
            marginBottom: '20px',
        },
        gr: {
            width: '100%',
            "& input": {
                width: '70%',
                // height: '40px',
            },
            "& button": {
                "userSelect": "none",
                "cursor": "pointer",
                "fontWeight": "600",
                "display": "inline-block",
                "outline": "none",
                "border": "1px solid rgb(0, 178, 247)",
                "fontFamily": "ProximaNova, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
                "fontSize": "15px",
                "padding": "0px 16px",
                "borderRadius": "0px 5px 5px 0px",
                "boxShadow": "none",
                "textAlign": "center",
                "color": "white",
                "backgroundColor": "rgb(0, 178, 247)",
                "position": "relative",
                "left": "-3px",
                "lineHeight": "36px",
                "margin": "0px",
                "&:hover": {
                    "backgroundColor": "rgb(0, 200, 247)",
                }

            },
        },
        err: {
            fontSize: '14px',
            "fontFamily": "ProximaNova, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
            position: 'relative',
            top: "30px"
        },
        errBox: {
            height: '60px',
        }
    }
}

export default styles;