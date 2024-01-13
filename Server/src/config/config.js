const SECRET_KEY = 'MY_SECRET_KEY987654321'
const PORT_CONFOG = 3000 
const respData = {status:undefined, results: undefined, err:undefined}
const SERVER_ERROR = 'INTERNAL_SERVER_ERROR'

const DATABASE = {
    NAME:'socketdb',
    USER: 'root',
    HOST:'127.0.0.1',
    PASSWORD:'A143@smq',
    PORT:'3306',
    DIALECT: 'mysql'
}

const group_status_map = {
    1: 'Active',
    2: 'Inactive'
}

const role_map = {
    1: 'Admin',
    2: 'User'
}

module.exports = {
    SECRET_KEY,
    PORT_CONFOG,
    DATABASE,
    respData,
    SERVER_ERROR,
    group_status_map,
    role_map
}