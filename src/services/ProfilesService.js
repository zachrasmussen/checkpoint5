import { Profile } from "../models/Profile";
import { logger } from "../utils/Logger";
import { AppState } from "../AppState";
import { api } from "./AxiosService";

class ProfilesService {
    async getProfileById(id) {
        const res = await api.get(`api/profiles/${id}`)
        // logger.log('what is a profile', res.data)
        AppState.activeProfile = new Profile(res.data)
    }

    async getPosts() {
        const res = await api.get('api/posts?page=0')
        // logger.log('test!!!', res.data.posts)
        AppState.posts = res.data.posts.map(p => new Post(p))

    }

    async getPostsByCreatorId() {
        const res = await api.get(`/api/posts?creatorId=`)
        AppState.profilePosts = res.data.posts.map(p => new Post(p))
        AppState.nextPage = res.data.older
        logger.log('next page', AppState.nextPage)
        AppState.previousPage = res.data.newer
        logger.log('previous page', AppState.previousPage)
    }

    async changePage(url) {
        const res = await api.get(url)
        AppState.profilePosts = res.data.posts.map(p => new Post(p))
        AppState.nextPage = res.data.older
        logger.log('next page', AppState.nextPage)
        AppState.previousPage = res.data.newer
        logger.log('previous page', AppState.previousPage)
    }


}

export const profilesService = new ProfilesService()