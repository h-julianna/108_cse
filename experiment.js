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
var money = Math.floor(Math.random() * (2200 - 1800 + 1)) + 1800; 
console.log(`Money starting amount: ${money}`);
let instruction_key = experiment_number === 2 ? "instruction_exp2" : "instruction_exp1";
let instruction_text = experiment_text[lang][instruction_key].replace("{{MONEY}}", money);
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

let in_practice = true; //Flagging practice block to later exclude it from money calculation
console.log('Running in JATOS: ', running_jatos);
console.log('Debug mode: ', debug);
console.log('Language: ', lang);
console.log('Experiment number: ', experiment_number);
//Fixation
const fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:9vh;">+</div>',
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
	    	return `<span style="font-size:7vh; line-height: 0.9; color:${stim_colors[primecolor]};">${myprime}</span>`
	    }else{
		return `<span style="font-size:7vh; line-height: 0.9;">${myprime}</span>`
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
	    	return `<span style="font-size:7vh; color:${stim_colors[probecolor]};">${myprobe}</span>`
	    }else{
		return `<span style="font-size:7vh;">${myprobe}</span>`
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
        data.trial_money = money;
       data.correct = data.response?.toLowerCase() === data.correct_response?.toLowerCase(); //upper case responses are deemed correct as well
        if(!in_practice) {
        if (data.color === "red") {
        money -= 47;
    }
        if (data.color === "green") {
        money += 47;
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
//timer (combined)
let manip_time_left = 60;
let manip_interval = null;
let manip_timer_expired = false;

var manipulation_check_instructions = {
        type: jsPsychHtmlButtonResponse,
        stimulus: function ( ) {
          if (lang === "hun") {
        return `<p>Most arra vagyunk kíváncsiak, hogyan érzed magad a következő három inger láttán!
        Kérjük válaszolj a következő három ingerre, ahogy eddig is tetted! A válaszra, illetve az ingerek értékelésére 1 perc áll rendelkezésedre.</p> <!-- szájbarágós de muszáj -->
        <p id="manip-timer" style="font-size: 28px; color: darkred;"></p>`}
            if (lang === "eng") {
        return `<p>Now we would like to find out how you feel when you see the following three stimuli!
        Please respond to the following three stimuli, like you did beforehand! You will have 1 minute to respond to and evaluate the stimuli. </p>
        <p id="manip-timer" style="font-size: 28px; color: darkred;"></p>`;
      }
    },
        choices: [experiment_text[lang]["button_press"]],
        on_start: function() { //so time remaining doesn't carry over to new checks
            if (manip_interval !== null) {
                clearInterval(manip_interval);
                manip_interval = null
            }
            manip_time_left = debug ? 10 : 60; //debug is 1 normally, set to 10 for demo purposes
            manip_timer_expired = false;
        },
        on_load: function() {
            if (manip_interval === null) {
                const tick = () => {
                    const display = document.getElementById('manip-timer');
                    if (display) {
                        display.textContent = lang === "hun"
                        ? `Hátralévő idő: ${manip_time_left}`
                        : `Time remaining: ${manip_time_left}`;
                    }
                    if (manip_time_left <= 0) {
                        clearInterval(manip_interval);
                        manip_interval = null;
                        manip_timer_expired = true;
                        jsPsych.finishTrial();
                        return;
                    }
                    manip_time_left--;
                };
                tick();
                manip_interval = setInterval(tick, 1000);
            }
        },
        data: {
            task: 'manipulation_check_instructions',
            manip: 1
        }
      };

 var valence_check = {
        type: jsPsychHtmlSliderResponse,
        stimulus: function() {
          if (lang === "hun") {
         return `<p>Kérjük, jelöld be az alábbi csúszkán, hogy mennyire volt kellemes vagy kellemetlen az előbb látott három inger.</p>`}
         if (lang === "eng") {
        return `<p>Please indicate on the slider below, how unpleasant or pleasant the previous three stimuli were.</p>`;
        }
      },
        labels: [
          lang === "hun" ? '-50 (nagyon kellemetlen)' : '-50 (extremely unpleasant)',
          lang === "hun" ? '50 (nagyon kellemes)' : '50 (extremely pleasant)'
        ],
        min_label: -50,
        max_label: 50,
        min: -50,
        max: 50,
        slider_start: 0,
        step: 1,
        slider_width: 500,
        require_movement: true,
        button_label: [experiment_text[lang]["button_press"]],
        prompt: `<p id ="manip-timer" style="font-size: 28px; color: darkred;"></p>`,
        data: {
            task: 'valence_check',
        },
        on_finish: function(data) {
            if(data) {
        data.valence_data = data.response;
    }
        }
      };   

var arousal_check = {
        type: jsPsychHtmlSliderResponse,
        stimulus: function() {
          if (lang === "hun") {
         return `<p>Kérjük, jelöld be az alábbi csúszkán, hogy mennyire érezted magad nyugodtnak vagy izgatottnak/idegesnek az előbb látott három inger közben.</p>`} //Mennyire érezted magad felélénkülve az előtt látott három inger közben
         if (lang === "eng") {
        return `<p>Please indicate on the slider below, how calm or excited/anxious you felt during the previous three stimuli.</p>`; //How energized you felt
        }
      },
        labels: [
          lang === "hun" ? '-50 (nagyon nyugodt)' : '-50 (extremely calm)',
          lang === "hun" ? '50 (nagyon izgatott/ideges)' : '50 (extremely excited/anxious)' //nagyon felélénkülve, extremely energized
        ],
        max_label: 50,
        min: -50,
        max: 50,
        slider_start: 0,
        step: 1,
        slider_width: 500,
        require_movement: true,
        button_label: [experiment_text[lang]["button_press"]],
        prompt: `<p id="manip-timer" style="font-size: 28px; color: darkred;"></p>`,
        data: {
            task: 'arousal_check',
        },
        on_finish: function(data) {
            if(data) {
        data.arousal_data = data.response;
                }
            },
        };

//Preparing manipulation check stim variables
var manipulation_trial_list = [
	manipulation_trials.neutral_mani,
	manipulation_trials.neutral_mani,
	manipulation_trials.neutral_mani,
	manipulation_trials.negative_mani,
	manipulation_trials.negative_mani,
	manipulation_trials.negative_mani,
	manipulation_trials.positive_mani,
	manipulation_trials.positive_mani,
	manipulation_trials.positive_mani,
],

shuffled_mani_list = jsPsych.randomization.sampleWithoutReplacement(manipulation_trial_list, 9)
console.log("Manipulation shuffled list:", shuffled_mani_list);

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

//progress bar:)
function render_progress_bar(completed_blocks, total_blocks) {
    const label = lang === "eng"
        ? `Block ${completed_blocks} of ${total_blocks} completed`
        : `${completed_blocks}/${total_blocks} blokk teljesítve`;
    return `
      <div style="max-width:500px; margin: 30px auto 0 auto;">
        <div style="font-size:16px; margin-bottom:6px;">${label}</div>
        <div style="width:100%; height:22px; background:transparent; border:#ffff; box-shadow:0 0 0 2px black; border-radius:11px; overflow:hidden; box-sizing:border-box;">
          <div id="progress-fill" style="width:0%; height:100%; background:#ffff; border-radius:9px; transition: width 1.2s ease;"></div>
        </div>
      </div>`;
}

const total_blocks = experimental_blocks.length;
function make_block_intermission(block_index) {
  const completed = block_index + 1;
  return {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
      const money_color = money < 2000 ? "#FF3B3B" : (money > 2000 ? "#28a745" : "#ffffff");
            const progress_html = render_progress_bar(completed, total_blocks);
      const halfway_html = completed === Math.ceil(total_blocks / 2)
        ? (lang === "eng"
            ? `<p style="margin-top:20px; font-size:16px;">You are halfway through the experiment. Thank you for contributing to our research with your participation!</p>`
            : `<p style="margin-top:20px; font-size:16px;">A kísérlet felénél tartasz. Köszönjük, hogy részvételeddel hozzájárulsz a kutatásunkhoz!</p>`)
        : '';
      if (lang === "eng") {
          return `
        <div style="text-align: center; max-width: 800px; margin: auto; font-size: 24px">
          <p><strong>End of block.</strong></p>
          <p>You currently have <strong style="color: ${money_color};">${money} coins</strong>. When you are ready, press any key to continue.</p>
          <p>Take a short break, then press any key to start the next block. Try to respond as quickly and accurately as possible!</p>
          <p><strong>The next block will automatically start in 2 minutes.</strong></p>
          <p id="timer" style="font-size: 28px; color: darkred;">Starting in: 2:00</p>
          ${progress_html}
          ${halfway_html}
        </div>`;
      }     
      return `
        <div style="text-align: center; max-width: 800px; margin: auto; font-size: 24px">
          <p><strong>Blokk vége.</strong></p>
          <p>Összesen <strong style="color: ${money_color};">${money} garasod</strong> van.</p>
          <p>Pihenj egy kicsit, majd nyomj meg egy billentyűt a következő blokk kezdéséhez. Törekedj a minél gyorsabb és pontosabb válaszadásra!</p>
          <p><strong>A következő blokk automatikusan elindul 2 perc múlva.</strong></p>
          <p id="timer" style="font-size: 28px; color: darkred;">Kezdés: 2:00</p>
          ${progress_html}
          ${halfway_html}
        </div>`;
    },
    choices: debug ? "NO_KEYS" : "ALL_KEYS",
    trial_duration: debug ? 1 : 120000,
    on_load: function() {
      const fill = document.getElementById('progress-fill');
      if (fill) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            fill.style.width = `${(completed / total_blocks) * 100}%`;
          });
        });
      }
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
      block_completed: completed,
      money: function() { return money; }
    }
  };
}

//Full experiment timeline
const full_experiment = [];
experimental_blocks.forEach((block, index) => {
    full_experiment.push(block);
    if (shuffled_mani_list[index]) {
     full_experiment.push({
        timeline: [
            manipulation_check_instructions,
            {
                timeline: [fixation, prime, blank, probe],
                timeline_variables: shuffled_mani_list[index],
                randomize_order: false,
                conditional_function: () => !manip_timer_expired, //if time expires, skips over whole thing
                data: {
                    manip: 1
                }
            },
            {
            timeline: [valence_check],
            conditional_function: () => !manip_timer_expired
        },
        {
            timeline: [arousal_check],
            conditional_function: () => !manip_timer_expired
        }
    ],
    });
}
    if (index < experimental_blocks.length - 1) {
        full_experiment.push(make_block_intermission(index));
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
    };
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

