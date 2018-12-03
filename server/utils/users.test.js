const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        },
            {
                id: '2',
                name: 'Jane',
                room: 'React Course'
            },
            {
                id: '3',
                name: 'July',
                room: 'Node Course'
            }];
    });

    it('Should add new user', () => {
        let users = new Users();
        let user = {
            id: '213',
            name: 'Harry',
            room: 'Developer'
        };
        let resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should return names for node course', () => {
        let userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Mike','July']);
    });

    it('should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var userId = '10';
        var user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find a user', () => {
        var userId = '2';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('should not find a user', () => {
        var userId = '23';
        var user = users.getUser(userId);

        expect(user).toNotExist();
    });
});