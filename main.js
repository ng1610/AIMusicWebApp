song="";
song2="";

leftWristX="";
rightWristX="";
leftWristy="";
rightWristy="";

scoreLeftWrist="";
scoreRightWrist="";

songStatus1="";
songStatus2="";

function preload(){
    song= loadSound("music.mp3");
    song2= loadSound("music2.mp3");
}
function setup(){
    canvas=createCanvas(420, 420);
    canvas.position(430, 190);
    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}
function draw(){
    image(video, 0, 0, 420, 420);

    songStatus1=song.isPlaying();
    console.log(songStatus1)
    
    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist>0.001){
        circle(leftWristX+15,leftWristY+15,20);
        song2.stop();

        if(songStatus1=false){
            song.play();
            document.getElementById("song_name").innerHTML="Peter Pan song";
        }
    }

    songStatus2=song2.isPlaying();
    console.log(songStatus2);

    if(scoreRightWrist>0.001){
        circle(rightWristX,rightWristY,20);
        song.stop();

        if(songStatus2=false){
            song2.play();
            document.getElementById("song_name").innerHTML="Harry Potter song";
        }
    }
}
function modelLoaded(){
    console.log("PoseNet is Initialized");
}
function gotPoses(results){
    if(results.length> 0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        rightWristX=results[0].pose.rightWrist.x;

        leftWristY=results[0].pose.leftWrist.y;
        rightWristY=results[0].pose.rightWrist.y;

        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log(scoreLeftWrist);
        console.log(scoreRightWrist);
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function stop(){
    song.stop();
}