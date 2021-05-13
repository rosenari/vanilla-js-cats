import "./index.css";

export default class SearchResult {
    constructor($target) {
        this._searchResult = $target;
        this._io = null;
        this.state = [];
    }

    render() {
        this._searchResult.innerHTML = '';

        let id = 0;

        if (!this._io) this._io = this.createLazyLoadObserver();

        for (let item of this.state) {
            let box = document.createElement('div');
            box.classList.add('cat');
            box.innerHTML = `<img data-img='${item.url}' width=250 height=250 data-id=${id++} />`;
            this._searchResult.append(box);
        }

        const images = document.getElementsByTagName('img');
        Array.from(images).forEach((img) => {
            this._io.observe(img);
        });
    }

    createLazyLoadObserver = () => {
        const io = new IntersectionObserver((entries, observer) => {
            Array.from(entries).forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.setAttribute('src', entry.target.dataset.img);
                    observer.unobserve(entry.target);
                }
            });
        });
        return io;
    }

    setState(data) {
        this.state = data;

        this.render();
    }
}