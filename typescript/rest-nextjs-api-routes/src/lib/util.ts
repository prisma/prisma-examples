
// Make an object serializable to JSON.
//
// Useful to convert an object which may contain non-serializeable data such as
// Dates to an object that doesn't
export function makeSerializable<T extends any> (o: T): T {
    return JSON.parse(JSON.stringify(o))
}
