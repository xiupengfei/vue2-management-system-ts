
// export * from './users'
// export * from './auth'
import users from './routes/users'
import auth from './routes/auth'

export interface IRoutes {
    [key: string]: any
}

const routes: IRoutes = {
    users,
    auth
}

export default routes