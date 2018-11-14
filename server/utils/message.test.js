const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from  ='Jen';
        var text = 'Some Message';
        var message = generateMessage(from, text);

        expect(message.createAt).toBeA('number'); // assert createAt is number
        expect(message).toInclude({from, text});  // assert 'from' and 'text' match
    })
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Deb';
        var latitude = 15;
        var longitude = 19;
        var url = 'https://www.google.com/maps?q=15,19';

        var message = generateLocationMessage(from, latitude, longitude);

        expect(message.createAt).toBeA('number');
        expect(message).toInclude({from, url});
    })
});