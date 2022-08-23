export class Profile {
    constructor(data) {
        this.id = data.id
        this.email = data.email
        this.name = data.name
        this.picture = data.picture
        this.bio = data.bio || 'Hey there, thanks for checking out my page! I still have a few things to upload, hopefully the next time you visit I will have my bio!'
        this.coverImg = data.coverImg
        this.github = data.github || 'https://github.com/'
        this.linkedin = data.linkedin || 'https://www.linkedin.com/'
        this.resume = data.resume || 'https://thiscatdoesnotexist.com/'
        this.classYear = data.class || ''
        // FIXME turn or statement into turnary statement to represent graduated
        this.graduated = data.graduated || ''
        this.creatorId = data.creatorId
    }
}

    // let graduated = graduated ? 'true' : 'false';