## Quick Start Guide

- Clone the project.
- run `npm install` to install dependencies and modules.
- install nodemon server via `npm install -g nodemon`, read more at https://nodemon.io/, 
- after successful installation, run `node start` to start the server.
- navigate to `http://localhost:4000/graphql`.
- try `{subject(id:1){id, name, points}}` to get a specific subject's ID, Name, Points with the provided ID.
- `{subject(id:1){name, points, teacher {firstName, lastName}}}` to get a subject with its corresponding teacher.
- enjoy querying.