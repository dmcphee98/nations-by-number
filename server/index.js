//exports.handler = async (event, context) => {

    const MongoClient = require("mongodb").MongoClient;
    const uri = "mongodb+srv://deanjames:BxM5QWej4rgKUjOU@country-stats.hmydost.mongodb.net/?retryWrites=true&w=majority";

    // Once we connect to the database once, we'll store that connection and reuse it so that we don't have to connect to the database on every request.
    let cachedDb = null;

    async function connectToDatabase() {
        if (cachedDb) {
          return cachedDb;
        }
      
        // Connect to our MongoDB database hosted on MongoDB Atlas
        const client = await MongoClient.connect(uri);
      
        // Specify which database we want to use
        const db = await client.db("countryStatsDB");
        cachedDb = db;
        return db;
    }
      
    
    /* By default, the callback waits until the runtime event loop is empty before freezing the process and returning the results to the caller. 
        Setting this property to false requests that AWS Lambda freeze the process soon after the callback is invoked, even if there are events in the event loop. 
        AWS Lambda will freeze the process, any state data, and the events in the event loop. 
        Any remaining events in the event loop are processed when the Lambda function is next invoked, if AWS Lambda chooses to use the frozen process. */
//    context.callbackWaitsForEmptyEventLoop = false;
    
    // Get an instance of our database
    connectToDatabase().then(async (db) => {
        console.log("Connected to DB!");

        const dataSetId = Math.floor(Math.random() * 5);
        const dataSetSizeResult = await db.collection("countrystats").aggregate([
            {
                $match: {
                "sid": dataSetId
                }
            },
            {
                $project: {
                    _id: 0,  
                    count: 1,
                }
            }
            ]).toArray();
                
        const dataSetSize = (dataSetSizeResult[0]).count;
        console.log(dataSetSize);
    
        const rankRadius = Math.floor(0.3 * dataSetSize);
        const rankOffsetMax = dataSetSize - 2*rankRadius
        const rankOffset = Math.floor(Math.random() * rankOffsetMax);
        
        const rank1 = rankOffset;
        const rank2 = rankOffset + rankRadius;
        const rank3 = rankOffset + 2*rankRadius;
    
        const results = await db.collection("countrystats").aggregate([
            {
                $match: {
                "sid": dataSetId
                }
            },
            {
                $project: {
                    _id: 0,  
                    name: 1,
                    units: 1,  
                    rankings: {
                        $filter: {
                        input: "$rankings",
                        as: "ranking",
                        cond: {
                            $in: ["$$ranking.rank", [rank1, rank2, rank3]]
                        }
                        }
                    }
                }
            }
            ]).toArray();
            console.log(results);
            process.exit();        
    
    });
