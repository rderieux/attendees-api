import Monk from 'monk';

const MONGO_URI = process.env.MONGO_URI || 'localhost/attendees';

export default Monk(MONGO_URI);
