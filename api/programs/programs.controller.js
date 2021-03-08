const programsService = require("./programs.service");

async function getById(req, res) {
  const room = await programsService.getById(req.query);
  res.json(room);
}

async function query(req, res) {
  console.log("inside controoler");
  const filterBy = req.query;
  const programs = await programsService.query(filterBy);
  res.json(programs);
}

async function remove(req, res) {
  const program = req.body;
  console.log("inside remove controller", program);
  await programsService.remove(program._id);
  res.end();
}

async function update(req, res) {
  const programs = req.body;
  let updatedPrograms = await programsService.update(programs);
  res.json(updatedPrograms);
}

async function add(req, res) {
  const programData = req.body;
  const savedProgram = await programsService.add(programData);
  res.json(savedProgram);
}

module.exports = {
  getById,
  query,
  remove,
  update,
  add,
};
