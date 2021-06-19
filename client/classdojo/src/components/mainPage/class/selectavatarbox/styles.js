const styles = theme => {
    return {
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            width: "512px",
            height: '450px',
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
            "& p": {
                "userSelect": "none",
                "cursor": "pointer",
                "fontWeight": "600",
                "display": "inline-block",
                "outline": "none",
                "border": "none rgb(0, 178, 247)",
                "fontFamily": "ProximaNova, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
                "fontSize": "14px",
                "color": "rgb(0, 178, 247)"
            },
        },
        monsterList: {
            marginTop: '20px',
            maxHeight: "250px",
            overflow:'auto',
            "& li": {
                float:'left',
                height: '61px',
                width: '61px',
                cursor: 'pointer',
                padding: "10px 10px",
                margin: '5px 0px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                "&:hover": {
                    border: "1px solid #eee",
                },
                "& img": {
                    width: '41px',
                }
            }            
        },
        bottom: {
            display: 'flex',
            "borderTop": "1px solid rgb(234, 236, 245)",
            alignItems: 'center',
            padding: '10px 20px',
            justifyContent:'flex-end',
            "& button": {
                "userSelect": "none",
                "cursor": "pointer",
                "fontWeight": "600",
                "display": "inline-block",
                "outline": "none",
                "border": "1px solid rgb(0, 178, 247)",
                "fontFamily": "ProximaNova, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
                "fontSize": "16px",
                "padding": "8px 26px",
                "borderRadius": "200px",
                "boxShadow": "none",
                "textAlign": "center",
                "color": "white",
                "backgroundColor": "rgb(0, 178, 247)",
                "&:hover": {
                    "backgroundColor": "rgb(0, 188, 247)",
                }
            },
        },
        buttonDisable: {
            cursor: 'wait !important',
            "backgroundColor": "rgb(234, 236, 245) !important",
            borderColor: "rgb(234, 236, 245) !important",
        },
    }
}
export default styles;