import React, { Component } from 'react';
import "./stylemouse.css";
class Mouse extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          mouseX: 0,
          mouseY: 0,
          trailingX: 0,
          trailingY: 0
        };
        this.cursorTrailing = React.createRef();
        this.animationFrame = null;
      }
    
      componentDidMount() {
        document.addEventListener("mousemove", this.onMouseMove);
        this.moveCursor();
      }
    
      componentWillUnmount() {
        document.removeEventListener("mousemove", this.onMouseMove);
        cancelAnimationFrame(this.animationFrame);
      }
    
      onMouseMove = (evt) => {
        const { clientX, clientY } = evt;
        this.setState({
          mouseX: clientX,
          mouseY: clientY
        });
      };
    
      moveCursor = () => {
        const { mouseX, mouseY, trailingX, trailingY } = this.state;
        const diffX = mouseX - trailingX;
        const diffY = mouseY - trailingY;
        //  Number in expression is coeficient of the delay. 10 for example. You can play with it.
        this.setState(
          {
            trailingX: trailingX + diffX,
            trailingY: trailingY + diffY
          },
          () => {
            // Using refs and transform for better performance.
            let diffs = Math.max(Math.abs(diffX), Math.abs(diffY));
            let blurBrightness = 2 / (1 + Math.exp(-1 * 0.006 * diffs)) - 1;
            let rotate = 2 / (1 + Math.exp(-1 * 0.003 * diffX)) - 1;
            this.cursorTrailing.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) rotate(${
              14 * rotate
            }deg)`;
            this.cursorTrailing.current.style.blur = `${4 * blurBrightness}px`;
            this.cursorTrailing.current.style.filter = `brightness(${
              blurBrightness + 1
            })`;
            this.animationFrame = requestAnimationFrame(this.moveCursor);
          }
        );
      };

    render() {
        return (
            
        
          <div className="cursor1" ref={this.cursorTrailing} />
      
      
        );
    }
}

export default Mouse;