const express = require ('express');
const graphqlHTTP  = require('express-graphql');
const schema = require('./schema/schema');
const app = express ();
 
/* set up graphql middleware */
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))
const PORT = 4000 ;
app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`)
});