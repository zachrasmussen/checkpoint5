import { AppState } from "../AppState";
import { Post } from "../models/Post";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class PostsService {
    async getPosts() {
        const res = await api.get('api/posts?page=0')
        // logger.log('test!!!', res.data.posts)
        AppState.posts = res.data.posts.map(p => new Post(p))
        AppState.nextPage = res.data.older
        logger.log('next page', AppState.nextPage)
        AppState.previousPage = res.data.newer
        logger.log('previous page', AppState.previousPage)
    }

    async getPostsByCreatorId(id) {
        const res = await api.get(`api/profiles/${id}/posts`)
        AppState.profilePosts = res.data.posts.map(p => new Post(p))
        AppState.nextPage = res.data.older
        logger.log('next page', AppState.nextPage)
        AppState.previousPage = res.data.newer
        logger.log('previous page', AppState.previousPage)
        //FIXME you don't save the buttons for newer and older here
    }

    async createPost(postFormData) {
        const res = await api.post('/api/posts', postFormData)
        AppState.posts.unshift(new Post(res.data))
    }

    async editPost(postData) {
        const res = await api.put(`api/posts/${postData.id}`, postData)
        const index = AppState.posts.findIndex(p => p.id == postData.id)
        AppState.posts.splice(index, 1, new Post(res.data))
    }

    async deletePost(id) {
        const res = await api.delete(`api/posts/${id}`)
        if (res.data) {
            AppState.posts = AppState.posts.filter(p => p.id !== id)
        }
    }

    setActivePost(post) {
        AppState.activePost = post
    }

    async getPostById(postId) {
        const res = await server.get(`api/posts/${postId}`)
        AppState.activePost = new Post(res.data)
    }

    async changePage(url) {
        const res = await api.get(url)
        AppState.posts = res.data.posts.map(p => new Post(p))
        AppState.nextPage = res.data.older
        logger.log('next page', AppState.nextPage)
        AppState.previousPage = res.data.newer
        logger.log('previous page', AppState.previousPage)
    }

    async getPostsBySearch(searchTerm) {
        const res = await api.get(`/api/posts?query=${searchTerm}`, {

        })
        AppState.posts = res.data.posts.map(p => new Post(p))
    }

    async like(id) {
        // FIXME check readme and make appropriate post request
        let res = await api.post(`/api/posts/${id}/like`)
        let post = new Post(res.data)
        let postIndex = AppState.posts.findIndex(p => p.id == id)
        AppState.posts.splice(postIndex, 1, post)
        AppState.post = AppState.post
    }
}

export const postsService = new PostsService()