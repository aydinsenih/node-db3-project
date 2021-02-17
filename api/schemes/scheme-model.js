// scheme-model
const db = require("../../data/db-config");

function find() {
    return db("schemes");
}

function findById(id) {
    return db("schemes")
        .where({ id })
        .first()
        .then((schemaObject) => {
            if (!schemaObject) {
                return Promise.resolve(null);
            } else {
                return schemaObject;
            }
        });
}
//select steps.id, s.scheme_name, steps.instructions, steps.step_number
//from schemes as s join steps on scheme_id = s.id
//where s.id = 5 order by step_number asc
function findSteps(id) {
    return db("schemes as s")
        .join("steps", "scheme_id", "s.id")
        .select(
            "steps.id",
            "s.scheme_name",
            "steps.instructions",
            "steps.step_number"
        )
        .where("s.id", id)
        .orderBy("step_number", "asc");
}

function add(scheme) {
    return db("schemes")
        .insert(scheme)
        .then((ids) => {
            return findById(ids[0]);
        });
}

function update(changes, id) {
    return db("schemes")
        .where({ id })
        .update(changes)
        .then(() => {
            return db("schemes").where({ id }).first();
        });
}

function remove(id) {
    return db("schemes").where({ id }).del();
}

module.exports = { find, findById, findSteps, add, update, remove };
