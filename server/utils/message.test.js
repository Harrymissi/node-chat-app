const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from  ='Jen';
        var text = 'Some Message';
        var message = generateMessage(from, text);

        expect(message.createAt).toBeA('number'); // assert createAt is number
        expect(message).toInclude({from, text});  // assert 'from' and 'text' match
    })
})