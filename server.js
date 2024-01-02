
// npm modules
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const exphbs = require('express-handlebars');
// mc3 modules
const connect = require('./src/models/db.js');
const router = require('./src/routes/router.js');




async function main() {
    const app = express();

    app.use('/static', express.static('public'));
    

    app.engine("hbs", exphbs.engine({
        extname: "hbs", 
        helpers: {
            formatDate: function(date) {
                return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
            },
            dotdotdot:  function(str) {
                if (str.length > 100)
                  return str.substring(0,100) + '...';
                return str;
            }
            
        },
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
        },
    }));
    app.set("view engine", "hbs");
    app.set("views", "./src/views");

    // Parse request body as json
    app.use(express.json());
    // Apply routes to express app
    app.use(router);

    app.listen(process.env.SERVER_PORT, async function() {
        console.log(`express app is now listening on port ${process.env.SERVER_PORT}`);
        try {
            await connect();
            console.log(`Now connected to MongoDB`);

        } catch (err) {
            console.log('Connection to MongoDB failed: ');
            console.error(err);
        }
    });
}


main();