import axios from "axios"

export default async function fetch(searchWord, page) {
    const BASE_URL =`https://api.unsplash.com/search/photos`

        const params = {
            client_id: 'PjFdJ4cdVCRgQuCNtuY3vP1RrBR-dP-Lnitmtwm1A5E',
            per_page: 15,
            query: searchWord,
            page,

        }

        const headers = {
            'Accept-Version': 'v1',
            
        }

        const data = await axios.get(BASE_URL, { params, headers })
        return data.data


    }
    
