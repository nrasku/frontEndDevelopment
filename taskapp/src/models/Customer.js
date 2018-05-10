import Model from './Model'
import Class from './Class'

export default class User extends Model {  
  resource()
  {
    return 'customers'
  }

  classes () {
    return this.hasMany(Class)
  }

  get fullname()
  {
    return `${this.firstname} ${this.lastname}`
  }

}