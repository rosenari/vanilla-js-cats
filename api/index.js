const API_URL = 'https://api.thecatapi.com';
const API_KEY = '<Please Input your API_KEY>';

let breed_id = {
    "아비시니안": "abys",
    "벵갈": "beng",
    "히말라얀": "hima",
    "네벨룽": "nebe",
    "페르시안": "pers",
}

let cacheDecorator = (func) => {
    let cache = new Map();

    return function (...args) {
        let key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log("cache hit !!");
            return cache.get(key);
        }

        let result;

        try {
            result = func(...args);
            cache.set(key, result);
        } catch (e) {
            throw new Error(e.message);
        }

        return result;
    }
}

const Api = {
    getCatsByBreed: async (breed, page) => {
        let id = breed_id[breed];
        if (!id) throw new Error("존재하지않는 품종입니다.");

        let response = await fetch(`${API_URL}/v1/images/search?breed_ids=${id}&limit=9&page=${page}&order=desc`, {
            method: 'GET',
            headers: {
                "x-api-key": API_KEY
            }
        });

        if (!response.ok) {
            throw new Error("검색결과 없음");
        }

        return await response.json();
    }
}

let setCache = (obj) => {
    for (let key in obj) {
        Api[key] = cacheDecorator(Api[key]);
    }

    return obj;
}

export default setCache(Api);