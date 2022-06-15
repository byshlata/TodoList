import {defineClassNode} from "../defineClassNode";


describe('Trim string', () => {


    const stringOne = 'ssdfds__main_sdkhfks'
    const stringTwo = 'sds_primary_sdkhfks'
    const stringThree = 'mai_secondary'
    const stringFour = 'additional'
    const stringFive = 'additbestional'


    test('should be create', () => {

        expect(defineClassNode(stringOne)).toBe('main')
        expect(defineClassNode(stringTwo)).toBe('primary')
        expect(defineClassNode(stringThree)).toBe('secondary')
        expect(defineClassNode(stringFour)).toBe('additional')
        expect(defineClassNode(stringFive)).toBe('best')


    })


})