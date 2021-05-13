import "./App.css";
import Api from "./api";
import SearchInput from "./components/searchInput";
import SearchResult from "./components/searchResult";
import Popup from "./components/popup";

let Instance;
class App {
    constructor($target) {
        if (Instance) return Instance;

        this._app = $target;
        this._component = {};
        this._component._searchInput = null;
        this._component._searchResult = null;
        this._component._popup = new Popup($target);
        this._input = null;
        this._page = 1;

        Instance = this;
        return Instance;
    }

    render() {
        //모든 컴포넌트 렌더링
        for (let component in this._component) {
            this._component[component].render();
        }

        this._app.addEventListener('click', this.clickHandler);
        this._app.addEventListener('keypress', this.keyPressHandler);
        this.addInfinityScroll();
    }

    /* Event Delegation - click */
    clickHandler = (e) => {
        //가까운 조상중 cat 클래스가 있다면 ?
        if (e.target.closest('.cat')) {
            //고양이 사진 팝업띄우기
            let id = e.target.dataset.id;
            let cat = this._component._searchResult.state[id];
            this._component._popup.setState({
                visible: true, data: {
                    width: cat.width,
                    url: cat.url,
                    height: cat.height
                }
            });
            return;
        }

        if (e.target.id == 'close') {
            this._component._popup.setState({ visible: false });
        }
    }

    /* Event Delegation - keyPress */
    keyPressHandler = async (e) => {
        if (e.key == 'Enter' && e.target.tagName == 'INPUT') {
            //고양이 검색
            this._input = e.target.value;
            this._page = 1;
            e.target.value = '';

            try {
                let cats = await Api.getCatsByBreed(this._input, this._page);
                this._component._searchResult.setState(cats);
                this._page += 1;
            } catch (e) {
                alert(e.message);
            }

            return;
        }
    }

    addInfinityScroll = () => {
        let footer = document.getElementById('footer');
        const io = new IntersectionObserver((entries, observer) => {
            Array.from(entries).forEach(async (entry) => {
                if (!entry.isIntersecting) return;

                if (!this._input) return;

                console.log(this._page);

                try {
                    let cats = await Api.getCatsByBreed(this._input, this._page);
                    if (!cats.length) {
                        return;
                    }

                    this._component._searchResult.setState([...this._component._searchResult.state, ...cats]);
                    this._page += 1;
                } catch (e) {
                    alert(e.message);
                }

            });
        });

        io.observe(footer);
    }
}

/* Builder Pattern */
class AppBuilder {
    constructor($target) {
        this._app = new App($target);
    }

    setSearchInput($target) {
        this._app._component._searchInput = new SearchInput($target);
        return this;
    }

    setSearchResult($target) {
        this._app._component._searchResult = new SearchResult($target);
        return this;
    }

    build() {
        this._app.render();
        return this._app;
    }
}


new AppBuilder(document.getElementById('main'))
    .setSearchInput(document.getElementById('search-input'))
    .setSearchResult(document.getElementById('search-result'))
    .build();