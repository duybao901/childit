const styles = (theme) => {
    return {
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            height: '550px',
            width: '500px',
            backgroundColor: theme.palette.background.paper,
            outline: 'none',
            borderRadius: '5px',
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
        addStudent: {
            padding: "10px 20px",
            borderBottom: "1px solid rgb(234, 236, 245)",
            height: "100px",
        },
        input: {
            position: 'relative',
            marginTop: '10px',
            width: '100%',
            zIndex: 3,
        },
        addWrap: {
            position: 'relative',
            top: '-5px',
            zIndex: 2,
            "padding": "12px 10px",
            "cursor": "pointer",
            "backgroundColor": "rgb(242, 250, 255)",
            "border": "1px solid rgb(234, 236, 245)",
            "fontFamily": "'ProximaNova', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            "color": "#2c2a50",
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            userSelect: "none",
            "& i": {
                color: "rgb(0, 178, 247)",
                fontSize: '28px',
                marginRight: '10px',
                userSelect: "none",
            },
            "& span": {
                "fontWeight": "600",
                "color": "rgb(0, 178, 247)",
                "lineHeight": "32px",
                "fontSize": "16px",
                userSelect: "none",
            }
        },
        errorText: {
            fontSize: '16px',
            color: "rgb(255, 88, 84)",
        },
        studentList: {
            padding: '10px 20px',
            maxHeight: '320px',
            height: '320px',
            overflowY: 'auto',
            '& li': {
                display: 'flex',
                alignItems: 'center',
                padding: '10px 0px',
                justifyContent: 'space-between',
                "borderBottom": "1px solid rgb(247, 248, 255)",
                "& img": {
                    width: "100%",
                    height: "100%",
                    objectFit: 'cover',
                },
                "& i": {
                    fontSize: '26px',
                    cursor: 'pointer',
                    color: "rgb(170, 176, 216)",
                }
            }
        },
        wrapImg: {
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            "border": "1px solid rgb(247, 248, 255)",
            backgroundColor: "#f0efef",
            marginRight: '10px',

        },
        studentInfor: {
            display: 'flex',
            alignItems: 'center',
        },
        buttonDisable: {
            cursor: 'not-allowed !important',
            "backgroundColor": "rgb(234, 236, 245) !important",
        },
        bottom: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            "minHeight": "50px",
            "borderTop": "1px solid rgb(234, 236, 245)",
            "padding": "20px",
            "& span": {
                "userSelect": "none",
                "cursor": "pointer",
                "fontFamily": "ProximaNova, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
                "fontSize": "16px",
                "color": "rgb(0, 178, 247)",
                width: "55%"
            },
            "& button": {
                "userSelect": "none",
                "cursor": "pointer",
                "fontWeight": "600",
                "outline": "none",
                border: 'none',
                "fontFamily": "ProximaNova, \"Helvetica Neue\", Helvetica, Arial, sans-serif",
                "fontSize": "14px",
                "padding": "9px 32px",
                "borderRadius": "200px",
                "boxShadow": "none",
                "textAlign": "center",
                "color": "white",
                "backgroundColor": "rgb(0, 178, 247)",
            },
            "& button:hover": {
                "backgroundColor": "rgb(0, 200, 247)",
            }
        },

    }
}

export default styles;