import "./App.css";
import Api from "./api";
import SearchInput from "./components/searchInput";
import SearchResult from "./components/searchResult";

let Instance;
class App {
    constructor($target) {
        if (Instance) return Instance;

        this._app = $target;
        this._component = {};
        this._component._searchInput = null;
        this._component._searchResult = null;

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
    }

    /* Event Delegation - click */
    clickHandler = (e) => {
        //가까운 조상중 cat 클래스가 있다면 ?
        if (e.target.closest('.cat')) {
            //고양이 사진 팝업띄우기
            console.log("click !!")
            return;
        }
    }

    /* Event Delegation - keyPress */
    keyPressHandler = async (e) => {
        if (e.key == 'Enter' && e.target.tagName == 'INPUT') {
            //고양이 검색
            let input = e.target.value;
            e.target.value = '';

            try {
                let cats = await Api.getCatsByBreed(input, 1);
                this._component._searchResult.setState(cats);
            } catch (e) {
                alert(e.message);
            }

            return;
        }
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