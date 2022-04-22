const playersSchemaService = require("../config/PlayerSchema.js")


class PlayerManager {

    postPlayer = async (data) => {

        try {
            //save data en BD
            let user = await playersSchemaService.insertMany(data)

            return {status:'success', user:user}        
        } catch (error) {
            return {error:'error'}
        }
    }

    async getAll() {
        let users = await playersSchemaService.find({})
        return {status: 'logrado' + users}
    }

    async deletePlayer(id) {
        let users = await this.getAll()
        await playersSchemaService.deleteById(id)
        return console.log(users)
    }
}

const playerManager = new PlayerManager()

module.exports = playerManager