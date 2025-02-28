export class Event {
    constructor(name,dateTime, venueName,venueAddress,venueCapacity,organizer,description,ticketsAvailable,category,price,ageRestriction,posterURL,duration,soldTickets) {
        this.id = new Date()
        this.name = name
        this.dateTime = dateTime
        this.venueName = venueName
        this.venueAddress = venueAddress
        this.venueCapacity = venueCapacity
        this.organizer = organizer
        this.description = description
        this.ticketsAvailable = ticketsAvailable
        this.category = category
        this.price = price
        this.ageRestriction = ageRestriction
        this.posterURL = posterURL
        this.duration = duration
        this.soldTickets = soldTickets
    }
}