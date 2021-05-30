//create mongoose object
const mongoose = require("mongoose");
const validator = require("validator");
//connect node to mongodb
//its return promise. for then()=resolve and catch()=reject
//Rijvi database niye kaj korbe ar jodi available na thake thahole create kore dibe
mongoose.connect("mongodb://localhost:27017/Rijvi", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log("connection successful"))
    .catch((error) => console.log(error));

//create schema
//mongoose schema defines the structure of the documents
//schema by default mongoose er modhe thake
//playlistSchema = camelcase ee likha ache  & its an object or instance

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,//mandetory
        lowercase: true,
        trim: true, //remove blank space(r   ij  vi = rijvi)
        minlength: 2,
        maxlength: [30, "maximum 30 length"]

    },
    ctype: {
        type: String,
        required: true,
        lowecase: true,
        enum: ["frontend", "backend", "database"]//just default value save hobe
    },
    videos: {
        type: Number,
        //custom validator
        validate(value) {
            if (value < 0) {
                throw new Error("video count should not be negative");
            }
        }


        //another way of custom validator
        // validate:{
        //     validator:function(value){
        //         return value.length < 0;
        //     },
        //     message : "value count should not be negative"
        // }

    },
    author: String,
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("email is invalid");
            }
        }

    },
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }

})

//collection creation
//collection er name always singular hobe(Playlist)& capital hobe bcoz work as a class
//after create collection ata automatic plural hoye jabe
//const Playlist is just work as a class
const Playlist = new mongoose.model("Playlist", playlistSchema);



//create or insert document
//Playlist class er mardhome new instance create ja reactPlaylist like an object

const createDocument = async () => {
    try {
        const nodePlaylist = new Playlist({
            name: "Nodejs",
            ctype: "frontend",
            videos: 30,
            author: "Riya",
            email: "rijvi625@gmail.com",
            active: true,
        })
        const jsPlaylist = new Playlist({
            name: "Javascript",
            ctype: "backend",
            videos: 27,
            author: "Rafi",
            email: "rijvi65@gmail.com",
            active: true,
        })
        const mongoPlaylist = new Playlist({
            name: "MongoDB",
            ctype: "backend",
            videos: 37,
            email: "rijvi62@gmail.com",
            active: true,
        })
        const mongoosePlaylist = new Playlist({
            name: "Mongoose",
            ctype: "frontend",
            videos: 35,
            author: "Akash ",
            email: "rijvi25@gmail.com",
            active: true,
        })
        const expressPlaylist = new Playlist({
            name: "Expressjs",
            ctype: "backend",
            videos: 40,
            author: "Rijvi",
            email: "riji625@gmail.com",
            active: true,
        })

        //save multiple document
        const result = await Playlist.insertMany(nodePlaylist);
        //for one data save in save method

        //const result = await nodePlaylist.save()

        console.log(result);

    } catch (error) {
        console.log(error);

    }
}
createDocument();

const getDocument = async () => {
    try {
        //select() method use for showing specific field 
        //limit(1) use for just first vlue show

        //$In & $nin operator
        //const result = await Playlist.find({ctype : {$in : ["backend","Database"] }}).select({name:1}).limit(2);
        // const result = await Playlist.find({ctype : {$nin : ["backend","Database"] }}).select({name:1}).limit(2);

        //logical operator or & and
        //const result = await Playlist.find({$or : [{ctype: "backend"},{author : "Riya"}]}).select({name:1});
        //const result = await Playlist.find({$and : [{ctype: "backend"},{author : "Riya"}]}).select({name:1});

        //count function
        // const result = await Playlist.find({$and : [{ctype: "backend"},{author : "Rijvi"}]}).select({name:1}).countDocuments();

        //sort
        //(1) = accending to decending  &  (-1) = decending to acending
        const result = await Playlist.find().select({ name: 1 }).sort({ name: -1 });
        console.log(result);
    }
    catch (err) {
        console.log(err);

    }

}

//read document
//getDocument();

const updateDocument = async (_id) => {
    try {
        // const result = await Playlist.updateOne({_id},{
        //     $set: {
        //         name : "javascript"
        //     }
        // });

        //use of findByIdAndUpdate = jeta update and show korbe final value 
        const result = await Playlist.findByIdAndUpdate({ _id }, {
            $set: {
                name: "JavaScript"
            }
        }, {
            //new er jonno instant update value dhow korbe
            new: true


        }
        );
        console.log(result);


        //aivabe mainly id object kaj kore. where id hocche jeta pathabo function theka & _id hocche jeta change hobe.both ar equal for true condition 
        //const updateDocument = async(id)=>{
        //const result = await Playlist.updateOne({_id : id});
        //}
    } catch (err) {
        console.log(err);

    }
}

//update documents
//updateDocument("60b355e36330704c34c797cf");



//delete data 
const deleteDocument = async (_id) => {
    try {
        //const result = await Playlist.deleteOne({_id});

        //delete and show delete id by using findByIdAndDelete
        const result = await Playlist.findByIdAndDelete({ _id });
        console.log(result);

    } catch (error) {
        console.log(error);

    }

}
//deleteDocument("60b3564380f14e0ee46a9f8f");
