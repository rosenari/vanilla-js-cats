import "./index.css";

export default class SearchResult {
    constructor($target) {
        this._searchResult = $target;
        this.state = [];
    }

    render() {
        this._searchResult.innerHTML = '';

        for (let item of this.state) {
            let box = document.createElement('div');
            box.classList.add('cat');
            box.innerHTML = `<img src='${item.url}' width=250 height=250 />`;
            this._searchResult.append(box);
        }
    }

    setState(data) {
        this.state = data;

        this.render();
    }
}