import "./index.css";

export default class Popup {
    constructor($target) {
        this._app = $target;
        this._popup = null;
        this.state = { visible: false };
    }

    render() {
        if (!this._popup) {
            this._popup = document.createElement('div');
            this._popup.classList.add('cat__popup');
            this._popup.style.display = 'none';

            this._app.append(this._popup);
        }

        if (this.state.data) {
            console.log("data");
            console.log(this.state.data);
            this._popup.innerHTML = `<img src="${this.state.data.url}" width="${this.state.data.width > 600 && 600}" />`;

            let close = document.createElement('div');
            close.style = "position:absolute;top:10px;right:20px;color:orange;font-size:1.2em;font-weight:600;cursor:pointer";
            close.innerText = 'X';
            close.id = 'close';

            this._popup.append(close);
        }

        if (this.state.visible) this._popup.style.display = 'block';
        else this._popup.style.display = 'none';

    }

    clickHandler = () => {
        console.log(this);
        this.setState({ visible: false });
    }

    setState($data) {
        this.state = $data;
        this.render();
    }
}