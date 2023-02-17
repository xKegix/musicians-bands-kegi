const {sequelize} = require('./db');
const {Band, Musician} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })


    // Band create
    test('can create a Band', async () => {
        // TODO - test creating a band
        const testBand = await Band.create({name: 'TestBand', genre: 'Rap', showCount: 13});

        const createdBand = await Band.findByPk(testBand.id);

        expect(createdBand.name).toBe('TestBand');
        expect(createdBand.genre).toBe('Rap');
        expect(createdBand.showCount).toBe(13);
    })

    // Band update

    test('can update a Band', async () => {
        const testBand = await Band.create({name: 'Band1', genre: 'Rock', showCount: 178});

        await testBand.update({ name: 'Band1-Updated', showCount: 199});

        const updatedBand = await Band.findByPk(testBand.id);

        expect(updatedBand.name).toBe('Band1-Updated');
        expect(updatedBand.genre).toBe('Rock');
        expect(updatedBand.showCount).toBe(199);
    })


    // Band delete
    test('can delete a Band', async () => {
        const testBand = await Band.create({name: 'Band2', genre: 'RnB', showCount: 42});

        let deleteBand = await Band.findByPk(testBand.id);
        expect(deleteBand).not.toBeNull();

        await Band.destroy({ where: { id: testBand.id }});

        deleteBand = await Band.findByPk(testBand.id);
        expect(deleteBand).toBeNull();
    })


    test('can create a Musician', async () => {
        // TODO - test creating a musician
        const testMusician = await Musician.create({
            name: "Drake",
            instrument: "drums"
        })

        expect(testMusician.name).toBe('Drake');
        expect(testMusician.instrument).toBe('drums');
    })

    test('can update a Musician', async () => {
        const testMusician = await Musician.create({name: 'Druggy', instrument: 'drugs'});

        await testMusician.update({instrument: 'more dRUGS'});
        const updatedMusician = await Musician.findByPk(testMusician.id);

        expect(updatedMusician.name).toBe('Druggy');
        expect(updatedMusician.instrument).toBe('more dRUGS');
    })

    test('can delete a Musician', async () => {
        const testMusician = await Musician.create({name: 'Six Six', instrument: 'guns'});

        let deletedMusician = await Musician.findByPk(testMusician.id);
        expect(deletedMusician).not.toBeNull();

        await Musician.destroy({where: {id: testMusician.id}});
        deletedMusician  = await Musician.findByPk(testMusician.id);
        expect(deletedMusician).toBeNull();
    })

})