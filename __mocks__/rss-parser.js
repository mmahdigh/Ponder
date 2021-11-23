export const parseURL = jest.fn();

const RssParser = jest.fn().mockImplementation(() => ({ parseURL }));

export default RssParser;
