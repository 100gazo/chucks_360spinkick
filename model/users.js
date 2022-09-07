import { DataTypes } from 'sequelize'

const Users = (sequelize) => {
    const Schema = {
        email: {
            type: DataTypes.STRING, //= TEXT
            allowNull: false
        },
        password: {
            type: DataTypes.STRING, //= TEXT
            allowNull: false
        }
    }

    return sequelize.define('users', Schema)
}

export default Users