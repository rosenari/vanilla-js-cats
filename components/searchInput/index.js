import "./index.css"

export default class SearchInput {
    constructor($target) {
        this._searchInput = $target;
    }

    render() {
        let input = document.createElement('input');

        input.placeholder = '고양이 종류를 입력해주세요..🐈';
        input.classList.add('search__input');

        this._searchInput.append(input);
    }
}