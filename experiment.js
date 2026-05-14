//Browser check
 if (navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome")) {
    alert("A Safari ebben a kutatásban nem támogatott böngésző. Kérlek használj Chrome-ot vagy Firefoxot!");
    throw new Error("Safari not supported");
}
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);


//Initialize jsPsych
    const jsPsych = initJsPsych({ 
        on_finish: () => {
            try {jatos.endStudyAndRedirect(
                    "link here", 
            jsPsych.data.get().csv()
                );
	    }catch{
        const csv = jsPsych.data.get().csv();
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `data_${Date.now()}.csv`;
        link.click();
	    }
            }
    });
function main_experiment(debug, lang, experiment_number, experiment_text){
const running_jatos = (typeof jatos !== `undefined`)
var experiment_text = experiment_text
var debug = debug;
var lang = lang;
var experiment_number = experiment_number;
let instruction_key = experiment_number === 2 ? "instruction_exp2" : "instruction_exp1";
let instruction_text = experiment_text[lang][instruction_key];
//Creating timeline
const timeline = [];

//URL parameters

// Get URL parameters for language and debug mode)

//Stimulus time parameters
let durations = {
    prime_duration: debug ? 1 : 133,
    blank_duration: debug ? 1 : 33,
    probe_stim_duration: debug ? 1 : 133,
    probe_trial_duration: debug ? 1 : 1000
}
let money = 2000;
let in_practice = true; //Flagging practice block to later exclude it from money calculation
console.log('Running in JATOS: ', running_jatos);
console.log('Debug mode: ', debug);
console.log('Language: ', lang);
console.log('Experiment number: ', experiment_number);
//Fixation
const fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: "NO_KEYS",
    trial_duration: debug ? 1 : Math.random() * (600 - 400) + 400,
    data: {
        task: 'fixation'
    }
}

//Prime
const prime = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:function(){
    	primestim = jsPsych.evaluateTimelineVariable('prime')
	console.log(primestim)
	myprime = experiment_text[lang][primestim]
	primecolor = jsPsych.evaluateTimelineVariable('color')
	 if(experiment_number == 2){
	    	return `<span style="font-size:40px; color:${stim_colors[primecolor]};">${myprime}</span>`
	    }else{
		return `<span style="font-size:40px;">${myprime}</span>`
	    }
   },
    choices: 'NO_KEYS',
    trial_duration: durations.prime_duration,
    data: {
        task: 'prime'
    }
}

//Blank
const blank = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '',
    choices: 'NO_KEYS',
    trial_duration: durations.blank_duration,
    data: {
        task: 'blank'
    }
}

//Probe
const probe = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function(){
	    probestim = jsPsych.evaluateTimelineVariable('probe')
	    console.log(probestim)
	    probecolor = jsPsych.evaluateTimelineVariable('color')
	    myprobe = experiment_text[lang][probestim]
	    if(experiment_number == 1){
	    	return `<span style="font-size:40px; color:${stim_colors[probecolor]};">${myprobe}</span>`
	    }else{
		return `<span style="font-size:40px;">${myprobe}</span>`
	    }
    },
    choices: ['a', 'e', 'n', 'l'],
    stimulus_duration: durations.probe_stim_duration,
    trial_duration: durations.probe_trial_duration,
    response_ends_trial: false,
    data: {
        task: 'probe',
        correct_response: jsPsych.timelineVariable('correct_response'),
        congruency: jsPsych.timelineVariable('congruency'),
        color: jsPsych.timelineVariable('color'),
        monetary: jsPsych.timelineVariable('monetary'),
        name: jsPsych.timelineVariable('name'),
	    experiment: experiment_number
    },
    on_finish: function (data) {
        //console.log('Response data:', data);
        //console.log('Key pressed:', data.response);
       data.correct = data.response?.toLowerCase() === data.correct_response?.toLowerCase(); //upper case responses are deemed correct as well
        if(!in_practice) {
        if (data.color === "red") {
        money -= 17;
    }
        if (data.color === "green") {
        money += 17;
            }
        }
    }
}

//Practice parameters
const practice = {
    cutoff: 1000,
    feedback_duration: 700,
    accuracy_threshold: 0.8
};

//Creating subject code
let subj_code;
    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
        }
    subj_code = makeid(6);
console.log("Subject code", subj_code);
jsPsych.data.addProperties({subj_code: subj_code}); 

//Preparing stimulus variables
const stim_colors = {
    red: "#FF3B3B",
    green: "#28a745",
    blue: "#2979FF",
    yellow: "#FFD700",
    magenta: "#E040FB"
};


function format_prime_probe_trials(trial, block_index) {
    return {
        prime:trial.prime,
        probe:trial.probe,
        congruency: trial.congruency,
        correct_response: trial.correct_response,
        color: trial.color,
        monetary: trial.condition === "monetary" ? 1 : 0,
        name: trial.name,
        block: block_index + 1
    }
}

const shuffled_blocks = jsPsych.randomization.shuffle(prime_probe_trials.trial_sets);
const selected_blocks = shuffled_blocks[0]; // Changed from slice(0, 10) to [0][0]
//console.log(selected_blocks);
const randomized_stimuli_per_participant = selected_blocks.map(
    (block, block_index) => 
        block.map(trial => format_prime_probe_trials(trial, block_index)) 
)



//Welcome
const welcome_trial = {
    type: jsPsychHtmlButtonResponse,
    stimulus: experiment_text[lang]["welcome"],
    choices: [experiment_text[lang]["button_press"]]
}

timeline.push(welcome_trial);

const fullscreen_trial = {
    type: jsPsychFullscreen,
    fullscreen_mode: true,
    message: experiment_text[lang]["fullscreen"],
        button_label: experiment_text[lang]["button_press"]
}

timeline.push(fullscreen_trial);

//Informed consent
const informed_consent_trial = {
    type:jsPsychHtmlButtonResponse,
    stimulus: experiment_text[lang]["informed_consent"],
    choices: experiment_text[lang]["yes/no"],
    response_ends_trial: true,
        on_finish: function(data) {
            if (data.response == 1) {
                jsPsych.abortExperiment(`<p style="text-align: justify; max-width: 800px; margin: auto; font-size: 24px; font-weight: bold"> 
                    ${lang === "eng" ? "The experiment is over. Thank you for participating in the study!" : "A kísérlet véget ért. Köszönjük, hogy részt vettél a vizsgálatban!"}</p>`);
            }
        }
}

timeline.push(informed_consent_trial);

//Data handling and informed consent
const data_handling_trial = {   
    type: jsPsychHtmlButtonResponse,
    stimulus: experiment_text[lang]["data_handling"],
    choices: experiment_text[lang]["yes/no"],
    response_ends_trial: true,
        on_finish: function(data) {
            if (data.response == 1) {
                jsPsych.abortExperiment(`<p style="text-align: justify; max-width: 800px; margin: auto; font-size: 24px; font-weight: bold"> 
                    ${lang === "eng" ? "The experiment is over. Thank you for participating in the study!" : "A kísérlet véget ért. Köszönjük, hogy részt vettél a vizsgálatban!"}</p>`);
            }
        }
}

timeline.push(data_handling_trial);

//Demographic information
const age_neptun = {
  type: jsPsychSurveyText,
  questions: [
    {
        prompt: experiment_text[lang]["age"],
        name: "age",
        input_type: "number",
        required: true
    },
    {
        prompt: experiment_text[lang]["neptun"],
        name: "neptun",
        required: true
    }
  ],
  button_label: experiment_text[lang]["button_press"],
};
 
const gender = {
    type: jsPsychSurveyMultiChoice,
    questions: [
        {
            prompt: experiment_text[lang]["gender"],
            name: "gender", 
            options: experiment_text[lang]["gender_options"],
            required: true
        }
    ],
    button_label: experiment_text[lang]["button_press"],
}

const demographic_timeline = [age_neptun, gender];

timeline.push(demographic_timeline);

//Instructions
const instruction_trial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instruction_text,
            choices: [" "],
}

timeline.push(instruction_trial);

//Practice blocks
const practice_instructions = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: experiment_text[lang]["practice_instruction"]
}

const practice_intermission = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    return experiment_text[lang]["practice_intermission"];
  },
  choices: 'ALL_KEYS',
  trial_duration: debug ? 1: 120000, 
  on_load: function() {
    if (debug) return;
    let time_left = debug ? 1: 120;
    const timer_display = document.getElementById('timer');
    const countdown = setInterval(() => {
      time_left--;
      const minutes = Math.floor(time_left / 60);
      const seconds = time_left % 60;
      timer_display.textContent = `Kezdés: ${minutes}:${seconds.toString().padStart(2, '0')}`;
      if (time_left <= 0) clearInterval(countdown);
    }, 1000);
  }
}

const practice_end = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
        if (debug) {
            return "<div></div>";
        }
        return experiment_text[lang]["practice_end"];
    },
  choices: debug ? ["NO_KEYS"] : [" "],
  trial_duration: debug ? 1 : null,
  on_finish: function() {
        in_practice = false;
        jsPsych.data.addDataToLastTrial({task: `end_practice`});
    }
};

const prac_feedback = {
    type:jsPsychHtmlKeyboardResponse,
    choices: "NO_KEYS",
    stimulus: () => {
        if (debug) return "<div></div>";
        const last = jsPsych.data.getLastTrialData().values()[0];
        if(last.rt === null || last.rt > practice.cutoff) {
            return experiment_text[lang]["practice_feedback_slow"];
        }
        if (!last.correct) {
            return experiment_text[lang]["practice_feedback_incorrect"];
        }
        return "<div></div>";
    },
    trial_duration: () => {
        if (debug) return 1;
        const last = jsPsych.data.getLastTrialData().values()[0];
        if (last.rt === null || last.rt > practice.cutoff || !last.correct) {
            return practice.feedback_duration;
        }
        return durations.blank_duration;
    }
};


//Preparing practice stimulus variables
const practice_blocks_raw = [
    prime_probe_prac_trials.trials_block1,
    prime_probe_prac_trials.trials_block2
];

const formatted_practice_blocks = practice_blocks_raw.map(
    (block, block_index) =>
        block.map(trial => format_prime_probe_trials(trial, block_index))
)

const practice_blocks = formatted_practice_blocks.map(block_stimuli => {
    console.log('Practice block stimuli:', block_stimuli);
    return {
        timeline: [
            {
                timeline: [fixation, prime, blank, probe, prac_feedback],
                timeline_variables: block_stimuli,
                randomize_order: false,
                loop_function: function(data) {
                    if (debug === 1) return false;
                    const probe_trials = data.filter({task:'probe'});
                    const correct_trials = probe_trials.filter({correct: true});
                    console.log('Correct trials:', correct_trials);
                    const accuracy = correct_trials.count() / probe_trials.count();
                    console.log('Prac acc:',accuracy);
                    return accuracy < practice.accuracy_threshold;
                    }
            }]
    };
});

timeline.push(practice_instructions, practice_blocks[0], practice_intermission, practice_blocks[1], practice_end);

//Main experiment blocks
const block_intro = (block_index) => ({
    type:jsPsychHtmlKeyboardResponse,
    stimulus: () => {
        if (lang === "eng") {
            return `<div style="text-align:center; font-size:24px;">
                <h2>Block ${block_index + 1} is starting</h2></div>`;
        } else {
            return `<div style="text-align:center; font-size:24px;">
                <h2>Blokk ${block_index + 1} kezdődik</h2></div>`;
        }
    },    
    choices: 'NO_KEYS',
    trial_duration: debug ? 500 : 2000
    }
);

const trial_sequence = {
    timeline: [fixation, prime, blank, probe],
    randomize_order: false
};

const experimental_blocks = randomized_stimuli_per_participant.map(
    (block_stimuli, i) => ({
        timeline: [block_intro(i), {...trial_sequence, timeline_variables: block_stimuli}],
        on_timeline_start: () => {
            console.log(`Starting block ${i + 1} with stimuli:`, block_stimuli);    
        },
        on_timeline_finish: () => {
            console.log(`End of block ${i + 1}. Money currently:`, money);
        }
    })
);
//// MANIPULATION CHECKS

var manipulation_check_instructions = {
        type: jsPsychHtmlButtonResponse,
        stimulus: function ( ) {
          if (lang === "hun") {
        return `<p>Most arra vagyunk kíváncsiak, hogy milyen mértékben hatottak rád (?) az alábbi ingerek!
        A következő ingerekre kerjük is válaszolj!</p>`}  
          if (lang === "eng") {
        return `<p>Now we are interested in how much the following stimuli affected you!
        Please do not answer to the following stimuli!</p>`;
      }
    },
        choices: ['Tovább']
      };

//trying to change the instruction based on the color of the stimuli
 var valence_check = {
        type: jsPsychHtmlSliderResponse,
        stimulus: function() {
          if (lang === "hun") {
         return `<p>Kérlek, jelöld be -50 (negatívan) és 50 (pozitívan) között, hogy milyen mértékben hatottak rád az alábbi ${stim_colors[0]}ingerek!</p>`}
         if (lang === "eng") {
        return `<p>Please indicate on a scale from -50 (negatively) to 50 (positively) how much the following ${stim_colors[0]} stimuli affected you!</p>`;
        }

      },
        //labels: ['egyáltalán nem (-50)', 'teljes mértékben (50)'],
        min_label: 'egyáltalán nem',
        max_label: 'teljes mértékben',
        min: -50,
        max: 50,
        start: 0,
        step: 1,
        //slider_width: 500,
        require_movement: true,
        button_label: 'Tovább'
      };

var arousal_check = {
        type: jsPsychHtmlSliderResponse,
        stimulus: function() {
          if (lang === "hun") {
         return `<p>Kérlek, jelöld be -50 (negatívan) és 50 (pozitívan) között, hogy milyen mértékben hatottak rád az alábbi ${stim_colors[0]}ingerek!</p>`}
         if (lang === "eng") {
        return `<p>Please indicate on a scale from -50 (negatively) to 50 (positively) how much the following ${stim_colors[0]} stimuli affected you!</p>`;
        }

      },
        labels: ['egyáltalán nem (-50)', 'teljes mértékben (50)'],
        min_label: 'egyáltalán nem',
        max_label: 'teljes mértékben',
        min: -50,
        max: 50,
        start: 0,
        step: 1,
        //slider_width: 500,
        require_movement: true,
        button_label: 'Tovább'

        }

/*var prime_manipulation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: jsPsych.timelineVariable('prime'),
    choices: "NO_KEYS",
	trial_duration: function(){return prime_duration},
    data:{
        task:"prime"
    }
}*/

//Probe//
/*var probe_trial = {
    type: jsPsychHtmlKeyboardResponse,            
    stimulus: jsPsych.timelineVariable('probe'),
    choices: ["a", "e", "l", "n"],
	stimulus_duration: function(){
		console.log("stimdur: " + probe_stim_duration)
		return probe_stim_duration},
	trial_duration: function(){return probe_duration},
   data: {
        correct_response: jsPsych.timelineVariable('correct_response'),
        task: "probe",
        congruency: jsPsych.timelineVariable('congruency'),
        name: jsPsych.timelineVariable('name')
    },
    on_finish: function(data) {
        console.log(blockindex);
        data.correct = data.response === data.correct_response;
        }
    }
*/
/// hardcoded manipulation check trials
/*var manipulation_check_trials = [
     {
         prime: function() {
         if (lang === "hun") {
         return "<span style='font-size: 40px;'>le<br>le<br>le</span>"
         }
          if (lang === "eng") {
          return "<span style='font-size: 40px;'>down<br>down<br>down</span>"
          } 
        },
         probe: function() {
         if (lang === "hun") {
         return "<span style='font-size: 40px;'>le</span>"
         }
         if (lang === "eng") {
        return "<span style='font-size: 40px;'>down</span>"
          } 
        },
         congruency: "congruent",
         correct_response: "n",
         name: "manipulation_check",
         color: "stimuli_color"
     },
     {
         prime: function() {
         if (lang === "hun") {
         return "<span style='font-size: 40px;'>fel<br>fel<br>fel</span>"
         }
          if (lang === "eng") {
          return "<span style='font-size: 40px;'>up<br>up<br>up</span>"
          } 
        },
         probe: function() {
         if (lang === "hun") {
         return "<span style='font-size: 40px;'>fel</span>"
         }
         if (lang === "eng") {
        return "<span style='font-size: 40px;'>up</span>"
          } 
        },
    
         congruency: "congruent",
         correct_response: "e",
         name: "manipulation_check",
         color: "stimuli_color"

     },
     { 
         prime: function() {
         if (lang === "hun") {
         return "<span style='font-size: 40px;'>bal<br>bal<br>bal</span>"
         }
         if (lang === "eng") {
         return "<span style='font-size: 40px;'>left<br>left<br>left</span>"
          } 
        },
         probe: function() {
         if (lang === "hun") {
         return "<span style='font-size: 40px;'>bal</span>"
         }
         if (lang === "eng") {
        return "<span style='font-size: 40px;'>left</span>"
          } 
        },
         congruency: "congruent",
         correct_response: "a",
         name: "manipulation_check",
         color: "stimuli_color"
      },
      {
         prime: function() {
         if (lang === "hun") {
         return "<span style='font-size: 40px;'>jobb<br>jobb<br>jobb</span>"
         }
          if (lang === "eng") {
          return "<span style='font-size: 40px;'>right<br>right<br>right</span>"
          } 
        },
         probe: function() {        
         if (lang === "hun") {
         return "<span style='font-size: 40px;'>jobb</span>"
         }
         if (lang === "eng") {
        return "<span style='font-size: 40px;'>right</span>"
          } 
        },
         congruency: "congruent",
         correct_response: "l",
         name: "manipulation_check",
         color: "stimuli_color"
      }
      */
 //   ]
//const select_manipulation_trials = jsPsych.randomization.sampleWithoutReplacement(manipulation_check_trials, 3);

//Intermission between experimental blocks
const block_intermission = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function() {
    const money_color = money < 2000 ? "#FF3B3B" : (money > 2000 ? "#28a745" : "#ffffff");
    if (lang === "eng") {
        return `
      <div style="text-align: center; max-width: 800px; margin: auto; font-size: 24px">
        <p><strong>End of block.</strong></p>
        <p>You currently have <strong style="color: ${money_color};">${money} coins</strong>. When you are ready, press any key to continue.</p>
        <p>Take a short break, then press any key to start the next block. Try to respond as quickly and accurately as possible!</p>
        <p><strong>The next block will automatically start in 2 minutes.</strong></p>
        <p id="timer" style="font-size: 28px; color: darkred;">Starting in: 2:00</p>
      </div>`;
    }     
    return `
      <div style="text-align: center; max-width: 800px; margin: auto; font-size: 24px">
        <p><strong>Blokk vége.</strong></p>
        <p>Összesen <strong style="color: ${money_color};">${money} garasod</strong> van.</p>
        <p>Pihenj egy kicsit, majd nyomj meg egy billentyűt a következő blokk kezdéséhez. Törekedj a minél gyorsabb és pontosabb válaszadásra!</p>
        <p><strong>A következő blokk automatikusan elindul 2 perc múlva.</strong></p>
        <p id="timer" style="font-size: 28px; color: darkred;">Kezdés: 2:00</p>
      </div>`;
  },
  choices: debug ? "NO_KEYS" : "ALL_KEYS",
  trial_duration: debug ? 1 : 120000,
  on_load: function() {
    if (debug) return;
    let timeLeft = debug ? 1 : 120;
    const timerDisplay = document.getElementById('timer');
    const countdown = setInterval(() => {
      timeLeft--;
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerDisplay.textContent = `Kezdés: ${minutes}:${seconds.toString().padStart(2, '0')}`;
      if (timeLeft <= 0) clearInterval(countdown);
    }, 1000);
  },
  data: {
    task: 'intermission',
    money: function() { return money; }
  }
};


//const shuffled_neutrals = jsPsych.randomization.shuffle(manipulation_stimuli_color_neutral);
//const selected_neutrals = shuffled_neutrals.slice(0, 3);

//Full experiment timeline
const full_experiment = [];
experimental_blocks.forEach((block, index) => {
    full_experiment.push(block);
    if (index < experimental_blocks.length - 1) {  
        full_experiment.push(manipulation_check_instructions, valence_check, arousal_check);
    }
    if (index < experimental_blocks.length - 1) {
        full_experiment.push(block_intermission);
    }
});

//End of experiment
const experiment_end = {
  type: jsPsychHtmlButtonResponse,
  stimulus: () => {
    if (lang === "eng") {
        return `<h2>End of experiment</h2>
      		<h3>You have <strong>${money} coins</strong>. </h3>
            <h3>Thank you for participating in the study!</h3>
            <p>To receive your points, please press the "Finish" button.</p>`;
    }
    return `<h2>Kísérlet vége</h2>
      		<h3>Összesen <strong>${money} garasod</strong> van.</h3>
            <h>Köszönjük, hogy részt vettél a vizsgálatban!</h3>
            <p>Hogy megkaphasd a pontjaidat, nyomd meg a "Vége" gombot</p>`
  },
  choices: [experiment_text[lang]["finish"]],
};

//debrief
const debrief_trial = {
    type: jsPsychHtmlButtonResponse,
    stimulus: experiment_text[lang]["debrief"],
    choices: [experiment_text[lang]["finish"]],
}

//Adding full experiment and end trial to timeline
timeline.push(...full_experiment, experiment_end, debrief_trial);
return timeline
}

function startExperiment(timeline) {
    jsPsych.run(timeline);
}
try {
	jatos.onLoad(function() {
	console.log(experiment_text)
	    var lang = jatos.urlQueryParameters.lang || "hun";
	    var debug = jatos.urlQueryParameters.debug === "1" ? 1 : 0;
	    var experiment_number = jatos.urlQueryParameters.exp === "1" ? 1 : 2;
	    
	    console.log("Jatos loaded, starting experiment...")
	my_timeline = main_experiment(debug,lang, experiment_number, experiment_text) 
	startExperiment(my_timeline)
	    console.log("started experiment")
    });
}catch (error){ 
	var lang = urlParams.get("lang") || "hun";
	var debug = urlParams.get("debug") === "1" ? 1 : 0;
	var experiment_number = urlParams.get("exp") === "2" ? 2 : 1;
	    console.log("Jatos was NOT loaded, starting experiment in vanilla mode...")
	my_timeline = main_experiment(debug,lang, experiment_number, experiment_text) 
	startExperiment(my_timeline)
	    console.log("started experiment")

}

