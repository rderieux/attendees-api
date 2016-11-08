import Attendees from './attendees';

export default (app) => {
    app.use('/attendees', Attendees);
}
