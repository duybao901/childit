const styles = theme => {
    return {
      
        studentListItem: {
            "backgroundColor": "white",
            "borderRadius": "5px",
            "display": "flex",
            alignItems: 'center',
            "boxShadow": "rgb(0 0 0 / 5%) 0px 1px 3px 0px",
            "userSelect": "none",
            "cursor": "pointer",
            "outline": "none",
            "fontSize": "12px",
            "position": "relative",
            "height": "80px",
            "width": "160px",
            "margin": "15px",
            "& p": {
                marginLeft: "15px",
                "fontSize": "18px",
                "fontWeight": "normal",
                "fontFamily": "'ProximaNova', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                "color": "#2c2a50",
                width: '85px',
                height: '60px',
                overflow: 'hidden'
            }
        },
        skillNumber: {
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            "display": "inline-block",
            "border": "3px solid white",
            "borderRadius": "50%",
            "color": "white",
            "textAlign": "center",
            "padding": "5px",
            "boxShadow": "rgb(0 0 0 / 15%) 0px 1px 3px 0px",
            "fontWeight": "600",
            "minWidth": "40px",
            "fontSize": "20px",
            "backgroundColor": "#1bb240"
        },
        skillNumberNeg: {
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            "display": "inline-block",
            "border": "3px solid white",
            "borderRadius": "50%",
            "color": "white",
            "textAlign": "center",
            "padding": "5px",
            "boxShadow": "rgb(0 0 0 / 15%) 0px 1px 3px 0px",
            "fontWeight": "600",
            "minWidth": "40px",
            "fontSize": "20px",
            "backgroundColor": "rgb(215, 42, 43)"
        },
  
    
    }
}

export default styles;