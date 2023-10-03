export default class InputHandler {
    constructor(inputMap) {
        this.inputMap = inputMap;
        this.keysPressed = [];

        window.addEventListener("keydown", e => {
            e.preventDefault();
            
            if(inputMap.includes(e.key) && !this.keysPressed.includes(e.key))
                this.keysPressed.push(e.key);
        });

        window.addEventListener("keyup", e => {
            const keyup = this.keysPressed.indexOf(e.key);
            
            if(keyup >= 0)
                this.keysPressed = this.keysPressed.filter(key => {
                    return key != e.key;
                });
        });
    }

    get_axis(negInput, posInput) {
        let axis = 0;

        if(!this.keysPressed.includes(posInput) && this.keysPressed.includes(negInput))
            axis = -1;
        else if(!this.keysPressed.includes(negInput) && this.keysPressed.includes(posInput))
            axis = 1;

        return axis;
    }

    isActionPressed(action) {
        return this.keysPressed.includes(action);
    }
}