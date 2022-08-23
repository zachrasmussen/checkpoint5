export class Account {
  constructor(data) {
    this.email = data.email || ''
    this.name = data.name || ''
    this.picture = data.picture || ''
    this.bio = data.bio || ''
    this.coverImg = data.coverImg || ''
    this.github = data.github || 'https://github.com/'
    this.linkedin = data.linkedin || 'https://www.linkedin.com/'
    this.resume = data.resume || 'https://thiscatdoesnotexist.com/'
    this.class = data.class || '2022'
    this.graduated = data.graduated || 'Not an alumni yet'
  }
}