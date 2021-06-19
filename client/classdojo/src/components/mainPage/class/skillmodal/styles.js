const styles = theme => {
    return {
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            width: '514px',
            height: '587px',
            backgroundColor: theme.palette.background.paper,
            border: 'none',
            outline: 'none',
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
            width: "100%",
            minHeight: '460px',
            padding: '20px',
        },
        editImage: {
            position: 'relative',
            width: "100%",
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '30px',
        },
        imageBox: {
            position: 'relative',
            "backgroundColor": "rgb(247, 248, 255)",
            "boxShadow": "rgb(234 236 245) 0px 0px 0px 1px inset",
            "borderRadius": "5px",
            "textAlign": "center",
            "padding": "10px",
            "width": "90px",
            "height": "90px",
            "cursor": "pointer",
            "outline": "none",
            "& img": {
                height: '70px',
                width: '70px',
            },
            "& i": {
                position: 'absolute',
                bottom: '5px',
                right: '5px',
                color: "rgb(113, 116, 160)",
            },
        },
        group: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '90%',
            marginBottom: '10px',
            "& label": {
                "width": "30%",
                textAlign: 'right',
            },
            "& input": {
                "width": "65%",
                color: "#2c2a50",
            },
            "& select": {
                "width": "65%",
                "fontFamily": "ProximaNova, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
                "fontWeight": "normal",
                "lineHeight": "22px",
                "padding": "6px 10px",
                "borderRadius": "5px",
                "boxShadow": "rgb(0 0 0 / 15%) 0px 1px 3px 0px inset",
                "border": "1px solid rgb(234, 236, 245)",
                "outline": "none",
                "height": "36px",
                "fontSize": "14px",
                color: "#2c2a50",
            }
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
            width: "45%",
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
        ImageWrapper: {
            position: 'absolute',
            maxHeight: '280px',
            width: '90%',
            overflowY: 'auto',
            top: '110px',
            left: "50%",
            transform: 'translateX(-50%)',
            "backgroundColor": "white",
            "border": "1px solid rgb(234, 236, 245)",
            "boxShadow": "rgb(0 0 0 / 15%) 0px 1px 3px 0px",
            "zIndex": "120"
        },
        imageList: {
            width: "100%",
            display: 'flex',
            flexWrap: 'wrap',
            padding: "10px",
            "& li": {
                cursor: 'pointer',
                padding: "5px",
                margin: '5px',
                "& img": {
                    width: '56px',
                    height: '56px'
                }
            }
        },
        imageBoxFadeOpen: {
            display: 'block',
        },
        imageBoxFadeClose: {
            display: 'none'
        },
        err: {
            "width": "65%",
            color: 'red',
            fontSize: '14px',        
            "fontFamily": "ProximaNova, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
        }
    }
}

export default styles;