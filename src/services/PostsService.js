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
        const res = await moviesApi.get('/search/movie', {
            params: {
                query: searchTerm
            }
        })
        AppState.movies = res.data.results.map(m => new Movie(m))
    }
}

export const postsService = new PostsService()