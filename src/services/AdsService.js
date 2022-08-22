import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"
import { Ad } from "../models/Ad.js"


class AdsService {
    async getAds() {
        const res = await api.get('api/ads')
        AppState.ads = res.data.map(a => new Ad(a))
        console.log('[Getting Ads]', res.data.ads)
    }
}


export const adsService = new AdsService()