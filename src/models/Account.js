export class Account {
  constructor(data) {
    this.email = data.email || ''
    this.name = data.name || ''
    this.picture = data.picture || ''
    this.bio = data.bio || ''
    this.coverImg = data.coverImg || ''
    this.github = data.github || ''
    this.linkedin = data.linkedin || ''
    this.resume = data.resume || ''
    this.class = data.class || ''
    this.graduated = data.graduated || 'Not an alumni yet'
  }
}