// INIT doctors table
const initDoctors = async (db) => {
  try {
    await db.schema.dropTableIfExists('doctors')
    await db.schema.withSchema('public').createTable('doctors', (table) => {
      table.string('id').primary()
      table.string('name')
    })
    console.log('Created doctors table!')
  } catch (err) {
    console.log(err)
  }
  try {
    await db("doctors").insert({ id: "D1", name: "D1NAME" })
    await db("doctors").insert({ id: "D2", name: "D2NAME" })
    console.log("Added dummy doctors!")
  } catch (err) {
    console.log(err)
  }
}

// INIT patients table
const initPatients = async (db) => {
  try {
    await db.schema.dropTableIfExists("patients")
    await db.schema.withSchema("public").createTable("patients", (table) => {
      table.string("id").primary()
      table.string("name")
      table.integer("age")
      table.string("gender", 1)
    })
    console.log("Created patients table!")
  } catch (err) {
    console.log(err)
  }
  try {
    await db("patients").insert({ id: "P1", name: "P1NAME", age: 12, gender: "M" })
    await db("patients").insert({ id: "P2", name: "P2NAME", age: 22, gender: "F" })
    await db("patients").insert({ id: "P3", name: "P3NAME", age: 32, gender: "M" })
    console.log("Added dummy patients!")
  } catch (err) {
    console.log(err)
  }
}

// INIT appointments table
const initAppointments = async (db) => {
  try {
    await db.schema.dropTableIfExists("appointments")
    await db.schema.withSchema("public").createTable("appointments", (table) => {
      table.increments("id")
      table.string("doctor_id").references("id").inTable("doctors")
      table.string("patient_id").references("id").inTable("patients")
      table.date("date")
      table.time("time")
      table.unique(["doctor_id", "date", "time"])
      table.unique(["patient_id", "date", "time"])
    })
    console.log("Created appointments table!")
  } catch (err) {
    console.log(err)
  }
  try {
    await db("appointments").insert({ doctor_id: "D1", patient_id: "P1", date: "2018-03-08", time: "09:00:00" })
    await db("appointments").insert({ doctor_id: "D1", patient_id: "P1", date: "2018-04-08", time: "10:00:00" })
    await db("appointments").insert({ doctor_id: "D1", patient_id: "P2", date: "2018-03-08", time: "10:00:00" })
    await db("appointments").insert({ doctor_id: "D1", patient_id: "P1", date: "2018-04-08", time: "11:00:00" })
    await db("appointments").insert({ doctor_id: "D2", patient_id: "P1", date: "2018-03-18", time: "08:00:00" })
    await db("appointments").insert({ doctor_id: "D2", patient_id: "P1", date: "2018-04-18", time: "09:00:00" })
    await db("appointments").insert({ doctor_id: "D2", patient_id: "P3", date: "2018-03-18", time: "09:00:00" })
    await db("appointments").insert({ doctor_id: "D2", patient_id: "P3", date: "2018-04-18", time: "10:00:00" })
    console.log("Added dummy appointments!")
  } catch (err) {
    console.log(err)
  }
}

module.exports = async (db) => {
  await initDoctors(db);
  await initPatients(db);
  await initAppointments(db);
};