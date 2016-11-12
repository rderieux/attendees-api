import { Router } from 'express';
import Joi from 'joi';
import Validator from 'express-joi-validator';


const AttendeeModel = Joi.object().keys({
    // role: Joi.string().trim().label('Role'),
    // salary: Joi.number().trim().label('Salary'),
    role: Joi.string(),
    salary: Joi.number()
});

const router = new Router();


router.route('/')
    .get((req, res) => {
        const { pageSize = 100, index = 0 } = req.query;
        const services = req.app.get('services');

        return services.attendees.all(index, pageSize)
            .then(attendees => {
                console.log(attendees)
                return res.json(attendees);
            })
            .catch(err => {
                return res.status(500).json(err);
            });
    })
    .post(Validator({ body: AttendeeModel.requiredKeys('', 'role', 'salary') }), (req, res) => {
        const attendee = req.body;
        const services = req.app.get('services');

        return services.attendees.create(attendee)
            .then(result => res.status(201).json(result))
            .catch(err => {
                throw err
            });
    });

router.route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        const services = req.app.get('services');

        return services.attendees.findById(id)
            .then(attendee => res.json(attendee))
            .catch(err => {
                throw err
            });
    })
    .put(Validator({ body: AttendeeModel.requiredKeys('', 'role', 'salary') }), (req, res) => {
        const { id } = req.params;
        const attendee = req.body;
        const services = req.app.get('services');

        return services.attendees.update(id, attendee)
            .then(attendee => res.json(attendee))
            .catch(err => {
                throw err
            });
    })
    .patch(Validator({ body: AttendeeModel.requiredKeys('', 'role', 'salary') }), (req, res) => {
        const { id } = req.params;
        const attendee = req.body;
        const services = req.app.get('services');

        return services.attendees.update(id, attendee)
            .then(attendee => res.json(attendee))
            .catch(err => {
                throw err
            });
    })
    .delete((req, res) => {
        const { id } = req.params;
        const services = req.app.get('services');

        return services.attendees.remove(id)
            .then(result => res.json(result))
            .catch(err => {
                throw err
            });
    });


export default router;

