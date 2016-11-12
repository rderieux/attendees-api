import DB from './infrastructure/db';
import Boom from 'boom';

const attendees = DB.get('attendees');

/**
 * Restaurants Service
 *
 * @public
 */
export default {

    /**
     * All the attendees
     *
     * @public
     *
     * @returns {*|Promise|T}
     */
    async all(index = 0, pageSize = 100){
        index = parseInt(index);
        pageSize = parseInt(pageSize);
        const cursor = await attendees.find({}, { rawCursor: true });
        return await cursor.skip(index * pageSize).limit(pageSize).toArray();
    },

    /**
     * Only the favorites
     *
     * @public
     *
     * @returns {*|Promise|T}
     */
    async findById(id) {
        const result = await attendees.findOne(id);

        if (!result) {
            throw Boom.notFound(`Attendee ${id} not found.`, { id, message: `Attendee ${id} not found.` })
        }
        return result;
    },

    /**
     * Creates a new attendee
     *
     * @public
     *
     * @param {Object} attendee
     *
     * @returns {Promise|*}
     */
    async create(attendee = {}) {
        return await attendees.insert(attendee);
    },

    /**
     * Updates a restaurant
     *
     * @public
     *
     * @param {String} id
     * @param {Object} fields
     *
     * @returns {*}
     */
    async update(id, fields = {}) {
        const old = await this.findById(id);
        const attendee = Object.assign({}, old, fields);

        if (attendee._id) {
            delete attendee._id;
        }

        await attendees.findOneAndUpdate(id, attendee);
        return await this.findById(id);
    },

    /**
     * Deletes an attendee
     *
     * @public
     *
     * @param {String} id
     *
     * @returns {*|Promise|void|Object}
     */
    async remove(id) {
        return await attendees.remove(id);
    }
}

