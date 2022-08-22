export class Profile {
    constructor(data) {
        this.id = data.id
        this.email = data.email
        this.name = data.name
        this.picture = data.picture
        this.bio = data.bio || 'Hey there, thanks for checking out my page! I still have a few things to upload, hopefully the next time you visit I will have my bio!'
        this.coverImg = data.coverImg
        this.github = data.github
        this.linkedin = data.linkedin
        this.resume = data.resume
        this.class = data.class || '2022'
        this.graduated = data.graduated || 'Graduated'
        this.creatorId = data.creatorId
    }
}