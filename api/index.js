const API_URL = 'https://api.thecatapi.com';
const API_KEY = '16d13a3a-8e3a-4b65-848b-159b86bfe617';

let breed_id = {
    "아비시니안": "abys",
    "에게안": "aege",
    "아메리칸 밥테일": "abob",
    "발리니즈": "bali",
    "페르시안": "pers",
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

export default Api;