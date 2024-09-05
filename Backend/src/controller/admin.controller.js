import Museum from '../model/museum.model.js';
import Show from '../model/show.model.js';
import Ticket from '../model/ticket.model.js';

const addMuseumDetail = async (req, res) => {
    const { m_name, m_address } = req.body;

    if(!m_name || !m_address){
        return res.status(400).json({
            // success: false,
            message: 'all file required'
        });
    }

    // Create a new user
    const newMuseum = await Museum.create({
        m_namename,
        m_address,
    });

    // Save the new user in the database
    await newMuseum.save();

    res.status(200).json(newMuseum);
}

const addshowDetails = async (req, res) => {
    const { showId, title, description } = req.body;

    if(!showId || !title || !description){
        return res.status(400).json({
            // success: false,
            message: 'all file required'
        });
    }

    const newShow = await Show.create({
        showId,
        title,
        description
    });

    await newShow.save();

    res.status(200).json(newShow);
}

const addTicketDetails = async (req, res) => {
    const {showId, price, availableTickets} = req.body;

    if(!showId || !price || !availableTickets){
        return res.status(400).json({
            // success: false,
            message: 'all file required'
        });
    }

    const newTicket = await Ticket.create({
        showId,
        price,
        availableTickets
    });

    await newTicket.save();

    res.status(200).send(newTicket);
}

export {
    addMuseumDetail,
    addshowDetails,
    addTicketDetails
}