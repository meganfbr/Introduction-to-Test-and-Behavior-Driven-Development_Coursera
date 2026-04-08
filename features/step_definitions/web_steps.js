const { When, Then } = require("@cucumber/cucumber");
const request = require("supertest");
const app = require("../../src/app");

const state = {
  form: {},
  response: null,
  clipboard: null,
  results: []
};

When("I visit the {string}", function (page) {
    state.form = {};
    state.response = null;
    state.clipboard = null;
    state.results = [];
});

When("I set the {string} to {string}", function (field, value) {
    state.form[field.toLowerCase()] = value;
});

When("I select {string} in the {string} dropdown", function (value, field) {
    state.form[field.toLowerCase()] = value;
});

When("I change {string} to {string}", function (field, value) {
    state.form[field.toLowerCase()] = value;
});

When("I press the {string} button", async function (button) {
    const btn = button.toLowerCase();
    if (btn === "search") {
        let queryParams = new URLSearchParams();
        for (let k in state.form) {
            let v = state.form[k];
            // Normalize true/false string
            if (v.toLowerCase() === 'true') v = 'true';
            if (v.toLowerCase() === 'false') v = 'false';
            queryParams.append(k, v);
        }
        let q = queryParams.toString();
        state.response = await request(app).get("/products" + (q ? "?" + q : ""));
        state.results = state.response.body; 
    } else if (btn === "update") {
        const id = state.results[0].id;
        state.response = await request(app).put("/products/" + id).send(state.form);
    } else if (btn === "retrieve") {
        state.response = await request(app).get("/products/" + state.clipboard);
        state.results = [state.response.body];
    } else if (btn === "delete") {
        state.response = await request(app).delete("/products/" + state.clipboard);
        state.results = [];
    } else if (btn === "clear") {
        state.form = {};
    }
});

Then("I should see the message {string}", function (msg) {
    if (msg === "Product has been Deleted!") {
        if (state.response.status !== 204 && state.response.status !== 200) throw new Error("Delete failed");
        return;
    }
    if (msg === "Success") {
        if (state.response.status >= 300) throw new Error("Expected Success but got " + state.response.status);
    }
});

Then("I should see {string} in the {string} field", function (val, field) {
    const obj = state.results.length > 0 ? state.results[0] : (state.response && state.response.body);
    if (!obj || String(obj[field.toLowerCase()]) !== val) {
        throw new Error(`Expected ${val} in ${field}`);
    }
});

Then("I should see {string} in the {string} dropdown", function (val, field) {
    const obj = state.results.length > 0 ? state.results[0] : (state.response && state.response.body);
    const expected = val === "true" ? true : (val === "false" ? false : val);
    if (!obj || obj[field.toLowerCase()] !== expected) {
        throw new Error(`Expected ${expected} in ${field}, got ${obj ? obj[field.toLowerCase()] : 'null'}`);
    }
});

Then("I should see {string} in the results", function (text) {
    const found = state.results.some(p => Object.values(p).some(val => String(val) === text));
    if (!found) throw new Error(`Product containing ${text} not found in results`);
});

Then("I should not see {string} in the results", function (text) {
    const found = state.results.some(p => Object.values(p).some(val => String(val) === text));
    if (found) throw new Error(`Product containing ${text} incorrectly found in results`);
});

When("I copy the {string} field", function (field) {
    if (field === "Id") {
        const obj = state.results.length > 0 ? state.results[0] : state.response.body;
        state.clipboard = obj.id;
    }
});

When("I paste the {string} field", function (field) {
    if (field === "Id") {
        state.form.id = state.clipboard;
    }
});