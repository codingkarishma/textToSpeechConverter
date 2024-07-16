let textbox=document.querySelector("#textbox");
console.log(textbox);

let speak=document.querySelector("#speak");
console.log(speak);

let select=document.querySelector("select");
console.log(select);

let pitch=document.querySelector(".pitch-value");

let pitchSlider=document.querySelector("#pitch-slider");

let rate=document.querySelector(".rate-value");

let rateSlider=document.querySelector("#rate-slider");
console.log(pitch,pitchSlider,rate,rateSlider);

let synth=speechSynthesis;
console.log(synth);
let voices=[];
select.innerHTML="";
synth.addEventListener("voiceschanged",()=>{
    voices=synth.getVoices();
    console.log(voices);//getVoices asynchroniously kaam krta hai aor tb hi humme milta hai jb voiceschanged event fire hota hai
    voices.forEach(voice=>{
        let option=document.createElement("option");

        option.innerText=`${voice.name} ${voice.lang}`;
        option.setAttribute("data-lang",voice.lang);
        option.setAttribute("data-name",voice.name);
        select.appendChild(option);
    })
    console.log(select.selectedIndex);
    console.log(select.selectedOptions[0]);
})

select.addEventListener("change",()=>{
    speech();
    console.log(select.selectedIndex);
    console.log(select.selectedOptions[0]);
})

function speech(){

    if(textbox.value !== ""){
        utter=new SpeechSynthesisUtterance(textbox.value);
        console.log(utter);
    }
    console.log(voices);
    let whichVoice=select.selectedOptions[0].getAttribute("data-name");
    console.log(whichVoice);
    let whichVoiceObject=voices.find(voice=>voice.name==whichVoice);
    console.log(whichVoice);
    console.log(whichVoiceObject);
    
    console.log(voices[0])
    utter.voice=whichVoiceObject;
    utter.pitch=pitchSlider.value;
    utter.rate=rateSlider.value;
    synth.speak(utter);
}

speak.addEventListener("click",()=>{
    speech();
    textbox.blur();
})

pitchSlider.addEventListener("change",()=>{
    pitch.innerText=pitchSlider.value;
})
rateSlider.addEventListener("change",()=>{
    rate.innerText=rateSlider.value;
})