const fs = require("fs");
const path = require("path");

const Handlebars = require("handlebars");
const client = require("./SanityClient");
const blocksToHtml = require("@sanity/block-content-to-html");

function buildHTML(filename, data) {
  const source = fs.readFileSync(filename, "utf8").toString();
  const template = Handlebars.compile(source);
  const output = template(data);

  return output;
}

async function getSanityData(query) {
  let data = await client.fetch(query);
  return await data;
}

async function createPages(template) {
  const query = `{
        "projects": *[_type == 'projects']{ _id, title, body, slug }
    }`;

  const data = await getSanityData(query);
  const projects = data.projects;

  projects.forEach((project) => {
    const html = buildHTML(template, { project: project, nextProject: projects[1] });

    const destination = `./public/${project.slug.current}.html`;

    fs.writeFile(destination, html, function (err) {
      if (err) return console.log(err);
      console.log("page created");
    });
  });
}

createPages("project.html");
