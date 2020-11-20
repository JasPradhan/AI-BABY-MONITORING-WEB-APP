status="";

objects=[];

let alarm;
function preload(){
    alarm = loadSound('alarm.mp3');
}


function setup(){
canvas=createCanvas(380, 380);
canvas.position(575,200);
video=createCapture(VIDEO);
video.hide()
objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="Status: Detecting objects";
}

function draw(){
image(video , 0 , 0 , 380 , 380);
    if(status!=""){
        objectDetector.detect(video,gotResult);

        r=random(255);

        g=random(255);

        b=random(255);

        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML="Number of objects detected are: "+objects.length+".";
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+" %" , objects[i].x+15 , objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
            if(objects[i].label=="person"){
                document.getElementById("status").innerHTML="Status: Baby Detected";
                alarm.stop();
            }
            else{
                document.getElementById("status").innerHTML="Status: Baby Not Detected";
                alarm.play();
            }
        }
        if(objects.length<0){
            document.getElementById("status").innerHTML="Status: Baby Not Detected";
            alarm.play();
        }
    }
}

function modelLoaded(){
    console.log("Model Loaded");
    status=true;
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}