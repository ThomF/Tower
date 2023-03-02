export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    // TODO add additional properties if needed
  }
}

export class Profile extends Account {
  constructor(data) {
    super(data)
    this.email = data.email
  }
}
