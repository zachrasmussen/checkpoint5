export class Post {
    constructor(data) {
        this.id = data.id || ''
        this.body = data.body || ''
        this.imgUrl = data.imgUrl || 'https://thiscatdoesnotexist.com/'
        this.creatorId = data.creatorId || ''
        this.likeIds = data.likeIds || ''
        this.name = data.creator.name
        this.picture = data.creator.picture
        this.date = data.createdAt
        this.creator = data.creator
    }
}
