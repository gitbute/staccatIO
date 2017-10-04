var mongoose = require("mongoose")
var Teacher = require("./models/teacher")
var Comment = require("./models/comment")

var data = [
    {
        name: "Wolfgang Mozart",
        image: "https://www.biography.com/.image/t_share/MTE1ODA0OTcxNzMyNjY1ODY5/wolfgang-mozart-9417115-2-402.jpg",
        description: "A prolific artist, Austrian composer Wolfgang Mozart created a string of operas, concertos, symphonies and sonatas that profoundly shaped classical music."
    },
    {
        name: "Johann Sebastian Bach",
        image: "https://www.biography.com/.image/t_share/MTIwNjA4NjMzNzMxNjQ2OTg4/johann-sebastian-bach-9194289-1-402.jpg",
        description: "A magnificent baroque-era composer, Johann Sebastian Bach is revered through the ages for his work's musical complexities and stylistic innovations."
    },
    {
        name: "Frederic Chopin",
        image: "https://www.biography.com/.image/c_fill%2Ccs_srgb%2Cg_face%2Ch_300%2Cq_80%2Cw_300/MTE1ODA0OTcxNTg2OTc5MzQx/frederic-chopin-9247162-1-402.jpg",
        description: "Considered Poland's greatest composer, Frédéric Chopin focused his efforts on piano composition and was a strong influence on composers who followed him."
    }
];

function seedDB(){
    //Remove all teachers

    Teacher.remove({}, function(err){
        console.log("removed Teachers!");

          //  add some Teachers
        data.forEach(function(seed){
            Teacher.create(seed, function(err, teacher){
                if (err){
                    console.log(err);
                } else{
                    console.log("added a Teacher");
                    Comment.create(
                        {
                            text: "Great teacher, just as expected!",
                            author: "Homer"
                        }, function(err, comment){
                            if (err){
                                console.log(err);
                            } else{
                                teacher.comments.push(comment);
                                teacher.save();
                                console.log("created new Comment!")
                            };
                        });
                };
            });
        });
    });



};

module.exports = seedDB;