let { sequelize } = require("./lib/index");
let { ticket } = require("./models/ticket.model");
let { agent } = require("./models/agent.model");
let { customer } = require("./models/customer.model");
let { ticketAgent } = require("./models/ticketAgent.model");
let { ticketCustomer } = require("./models/ticketCustomer.model");
let express = require("express");
let app = express();

app.use(express.json());
app.get("/seed_db", async (req, res) => {
  await sequelize.sync({ force: true });

  let tickets = await ticket.bulkCreate([
    {
      ticketId: 1,
      title: "Login Issue",
      description: "Cannot login to account",
      status: "open",
      priority: 1,
      customerId: 1,
      agentId: 1,
    },
    {
      ticketId: 2,
      title: "Payment Failure",
      description: "Payment not processed",
      status: "closed",
      priority: 2,
      customerId: 2,
      agentId: 2,
    },
    {
      ticketId: 3,
      title: "Bug Report",
      description: "Found a bug in the system",
      status: "open",
      priority: 3,
      customerId: 1,
      agentId: 1,
    },
  ]);

  let customers = await customer.bulkCreate([
    { customerId: 1, name: "Alice", email: "alice@example.com" },
    { customerId: 2, name: "Bob", email: "bob@example.com" },
  ]);

  let agents = await agent.bulkCreate([
    { agentId: 1, name: "Charlie", email: "charlie@example.com" },
    { agentId: 2, name: "Dave", email: "dave@example.com" },
  ]);

  await ticketCustomer.bulkCreate([
    { ticketId: tickets[0].id, customerId: customers[0].id },
    { ticketId: tickets[2].id, customerId: customers[0].id },
    { ticketId: tickets[1].id, customerId: customers[1].id },
  ]);

  await ticketAgent.bulkCreate([
    { ticketId: tickets[0].id, agentId: agents[0].id },
    { ticketId: tickets[2].id, agentId: agents[0].id },
    { ticketId: tickets[1].id, agentId: agents[1].id },
  ]);

  return res.json({ message: "Database seeded successfully" });
});

// Helper function to get ticket's associated customers
async function getTicketCustomers(ticketId) {
  const ticketCustomers = await ticketCustomer.findAll({
    where: { ticketId },
  });

  let customerData;
  for (let cus of ticketCustomers) {
    customerData = await customer.findOne({
      where: { customerId: cus.customerId },
    });
  }

  return customerData;
}
// Helper function to get ticket's associated Agents
async function getTicketAgents(ticketId) {
  const ticketAgents = await ticketAgent.findAll({
    where: { ticketId },
  });

  let agentData;
  for (let aus of ticketAgents) {
    agentData = await agent.findOne({ where: { agentId: aus.agentId } });
  }

  return agentData;
}

// Helper function to get ticket details with associated customers and agents
async function getTicketDetails(ticketData) {
  const customer = await getTicketCustomers(ticketData.id);
  const agent = await getTicketAgents(ticketData.id);

  return {
    ticketId: ticketData.ticketId,
    title: ticketData.title,
    description: ticketData.description,
    status: ticketData.status,
    priority: ticketData.priority,
    customer,
    agent,
  };
}

//function 1
async function getAllTickets() {
  let tickets = await ticket.findAll();

  const ticketDetailsArray = [];

  for (const ticketData of tickets) {
    const detailedTicket = await getTicketDetails(ticketData);
    ticketDetailsArray.push(detailedTicket);
  }

  return { tickets: ticketDetailsArray };
}

//Exercise 1: Get All Tickets
app.get("/tickets", async (req, res) => {
  try {
    let result = await getAllTickets();
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tracks", error: error.message });
  }
});

//function 2
async function fetchTicketById(id) {
  let tickets = await ticket.findOne({ where: { id } });
  const ticketDetails = await getTicketDetails(tickets);

  return { tickets: ticketDetails };
}
//Exercise 2:  Get Ticket by ID
app.get("/tickets/details/:id", async (req, res) => {
  let tickedId = req.params.id;
  try {
    let result = await fetchTicketById(tickedId);
    if (result.tickets.length === 0) {
      res.status(404).json({ message: "No tickets found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching ticket details", error: error.message });
  }
});

//function 3
async function fetchTicketByStatus(status) {
  let ticketStatus = await ticket.findAll({ where: { status } });
  const ticketDetailsArray = [];

  for (const ticketData of ticketStatus) {
    const detailedTicket = await getTicketDetails(ticketData);
    ticketDetailsArray.push(detailedTicket);
  }

  return { tickets: ticketDetailsArray };
}
//Exercise 3: Get Tickets by Status
app.get("/tickets/status/:status", async (req, res) => {
  let status = req.params.status;
  try {
    let result = await fetchTicketByStatus(status);
    if (result.tickets.length === 0) {
      res.status(404).json({ message: "No tickets found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching tickets details",
      error: error.message,
    });
  }
});

//function 4
async function sortTicketsByPriority(order) {
  let sortedtickets = await ticket.findAll({ order: [["priority", order]] });
  const ticketDetailsArray = [];

  for (const ticketData of sortedtickets) {
    const detailedTicket = await getTicketDetails(ticketData);
    ticketDetailsArray.push(detailedTicket);
  }

  return { tickets: ticketDetailsArray };
}

//Exercise 4: Get Tickets Sorted by Priority
app.get("/tickets/sort-by-priority", async (req, res) => {
  let order = "asc";
  try {
    let result = await sortTicketsByPriority(order);
    if (result.tickets.length === 0) {
      res.status(404).json({ message: "No tickets found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching ticket details", error: error.message });
  }
});

//function 5
async function addNewTicket(ticketData) {
  let newticket = await ticket.create(ticketData);

  const ticketDetails = await getTicketDetails(newticket);

  return { tickets: ticketDetails };
}

//Exercise 5:Add a New Ticket
app.post("/tickets/new", async (req, res) => {
  try {
    let newTicket = req.body;
    let result = await addNewTicket(newTicket);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//function 6
async function updateTicketById(updatedData, id) {
  let ticketDetails = await ticket.findOne({ where: { id } });
  if (!ticketDetails) {
    return {};
  }
  ticketDetails.set(updatedData);
  let updatedTicket = await ticketDetails.save();

  // let tickets = await ticket.findOne({ where: { id } });
  const updatedTicketDetails = await getTicketDetails(updatedTicket);

  return { tickets: updatedTicketDetails };
}

//Exercise 6: Update Ticket Details
app.post("/tickets/update/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let updatedData = req.body;
    let response = await updateTicketById(updatedData, id);
    if (response.tickets.length === 0) {
      res.status(404).json("No ticket found");
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//function 7
async function deleteTicketById(id) {
  let deleteTicket = await ticket.destroy({ where: { id } });
  if (deleteTicket === 0) {
    return {};
  }
  return { message: `ticket with id ${id} deleted successfully` };
}

//Exercise 7: Delete a ticket from the database
app.post("/ticket/delete", async (req, res) => {
  try {
    let id = parseInt(req.body.id);
    let response = await deleteTicketById(id);
    if (!response.message) {
      return res.status(404).json({ message: "No ticket found" });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
