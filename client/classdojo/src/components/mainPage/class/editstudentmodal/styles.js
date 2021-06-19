const styles = (theme) => {
    return {
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            width: "742px",
            height: '510px',
            backgroundColor: theme.palette.background.paper,
            border: 'none',
            outline: 'none',
            borderRadius: '5px',
            overflow: 'hidden',
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
        content: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px',
            height: '324px',
            marginBottom: '60px',

        },
        contentLeft: {
            width: '25%',
            textAlign: 'center',

        },
        contentRight: {
            width: "70%",
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        },
        editImage: {
            height: '150px',
            width: '85%',
            margin: '0px auto 40px',
            "padding": "24px 32px",
            "border": "1px solid rgb(234, 236, 245)",
            "borderRadius": "8px",
            cursor: 'pointer',
            userSelect: 'none',
        },
        buttonViewReport: {
            "userSelect": "none",
            "cursor": "pointer",
            "fontWeight": "600",
            "outline": "none",
            "border": "1px solid rgb(0, 178, 247)",
            "fontFamily": "ProximaNova, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
            "fontSize": "14px",
            "padding": "9px 16px",
            "borderRadius": "5px",
            "boxShadow": "none",
            "textAlign": "center",
            "backgroundColor": "transparent",
            width: '85%',
            a: {
                "color": "rgb(0, 178, 247)",
            }
        },
        box: {
            marginBottom: '35px',
        },
        group: {
            display: 'flex',
            flexDirection: 'column',
            width: "100%",
            "& label": {
                "fontSize": "14px",
                "fontWeight": "normal",
                "marginBottom": "10px",
                "color": "rgb(170, 176, 216)"
            },
            "& input": {
                width: "100%",
            },
        },
        warp: {
            "boxShadow": "none",
            "padding": "0.9rem 1rem",
            "borderRadius": "0.5rem",
            "border": "1px solid rgb(234, 236, 245)",
            "outline": "none",
        },
        inClass: {
            "display": "inline-block",
            "color": "rgb(170, 176, 216)",
            "backgroundColor": "rgb(247, 248, 255)",
            "border": "1px solid",
            "borderRadius": "4px",
            "padding": "0px 6px",
            "cursor": "default",
            "position": "relative"
        },
        addParent: {
            display: "flex",
            alignItems: 'center',
            cursor: 'pointer',
            "& i": {
                fontSize: '28px',
                color: "rgb(0, 178, 247)",
                marginRight: "8px",
            },
            "& span": {
                "userSelect": "none",
                "cursor": "pointer",
                "fontWeight": "600",
                "fontFamily": "ProximaNova, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
                "fontSize": "14px",
                "color": "rgb(0, 178, 247)"
            },
        },
        bottom: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px 20px',
            "borderTop": "1px solid rgb(234, 236, 245)",
            alignItems: 'center',
        },
        bottomControl: {
            display: 'flex',
            width: "30%",
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        remove: {
            cursor: 'pointer',
            fontWeight: 600,
            color: "rgb(255, 88, 84)",
            "userSelect": "none",
        },
        cancel: {
            cursor: 'pointer',
            fontWeight: 600,
            color: "rgb(0, 178, 247)",

        },
        save: {
            "userSelect": "none",
            "cursor": "pointer",
            "fontWeight": "600",
            "display": "inline-block",
            "outline": "none",
            "border": "1px solid rgb(0, 178, 247)",
            "fontFamily": "ProximaNova, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
            "fontSize": "16px",
            "padding": "9px 32px",
            "borderRadius": "200px",
            "boxShadow": "none",
            "textAlign": "center",
            "color": "white",
            "backgroundColor": "rgb(0, 178, 247)",
            "&:hover": {
                "backgroundColor": "rgb(0, 188, 247)",
            }
        },
        buttonDisable: {
            "userSelect": "none",
            "fontWeight": "600",
            "display": "inline-block",
            "outline": "none",
            "fontFamily": "ProximaNova, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
            "fontSize": "16px",
            "padding": "9px 32px",
            "borderRadius": "200px",
            "boxShadow": "none",
            "textAlign": "center",
            "color": "white",
            cursor: 'default !important',
            "backgroundColor": "rgb(234, 236, 245) !important",
            border: "1px solid rgb(234, 236, 245) !important",
        },
        parentactive: {
            display: 'flex',
            alignItems: 'center',
            height: '30px',
            margin: '5px 0px',
            color: 'rgb(170, 176, 216)',
            fontSize: '15px',
            "fontFamily": "ProximaNova, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
            '& i': {
                fontSize: '25px',
                marginRight: '10px',
                marginLeft: '5px',
            }
        },
        parentactived: {
            display: 'flex',
            alignItems: 'center',
            height: '30px',
            margin: '5px 0px',
            "color": "rgb(0, 178, 247)",
            fontSize: '15px',
            "fontFamily": "ProximaNova, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
            '& i': {
                fontSize: '25px',
                marginRight: '10px',
                marginLeft: '5px',
            }
        }
    }
}

export default styles;