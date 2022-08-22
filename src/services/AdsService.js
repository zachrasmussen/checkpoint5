import { AppState } from "../AppState"
import { api } from "./AxiosService"
import { Ad } from "../models/Ad"


class Ads {
    async getAds() {
        const res = await api.get('api/ads')
        AppState.ads = res.data.ads.map(a => new Ads(a))
        console.log('[Getting Ads]', res.data.ads)
    }
}


export const adsService = new AdsService()