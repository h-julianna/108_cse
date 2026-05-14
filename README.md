## About this repository

This repository contains the full experimental code used in a study conducted by the [Metascience Lab](https://metasciencelab.elte.hu/) at ELTE, led by Peter Czingraber, Natalija Dokic, Julianna Harangozo and Miklos Bognar.

## Running the experiment

This experiment is a web-based task built using HTML, Python, JavaScript and the jsPsych library. It is compatible with JATOS for online deployment and data collection. To use it, the latest version of jsPsych is required.

### Hosting locally

1.  Download this [repository](https://github.com/h-julianna/109_cse) as a `.zip` file.
2.  Unzip it to your desired location.
3.  Open `109_cse.html` in a web browser.
4.  After the experiment ends, it will save data locally in a `.csv` file (only if debug mode is disabled).

### Hosting on a remote server

1.  [Download and setup JATOS](https://www.jatos.org/Installation.html%3E) to remote server or personal computer.
2.  Download the [experimental code](https://github.com/h-julianna/109_cse).
3.  Run JATOS and import experiment by choosing `109_cse.jzip` in the upload window.
4.  Run the experiment by pressing `play`.

### Language

The experiment is available in English and Hungarian (default). Language can be changed using URL parameters (lang=eng/lang=hun).

### Debugging

If debug is enabled in URL parameters, debug=1 is used.

## About the task

In this experiment, the confound-minimized prime-probe task (Weissman et al., 2014) is employed, using three experimental conditions:

1.  punishment (stimuli are red, indicating monetary loss)
2.  reward (stimuli are green, indicating monetary gain)
3.  neutral/non-monetary (stimuli are magenta, blue or yellow).

Conditions are not separated by different experimental blocks, allowing the effect of the emotion elicited to be examined on specific trials, rather than blocks. Evaluative feedback is not given between blocks, however, participants are informed of the monetary units they've collected after each block. Between blocks, participants will complete manipulation checks. They will be presented with three exemplary prime-probe trials, all of the same type (loss, reward, or neutral), which they are required to solve. Following these trials, participants will rate how they felt and how aroused they were on two separate Visual Analogue Scales (VAS).

Before the actual task consisting of 10 blocks, 2 blocks of practice trials must be completed. Evalutative feedback is given here for incorrect/too slow responses. If the proportion of correct responses is under 80%, the practice session restarts.

In the task, each participant starts out with 2000 monetary units (called "garas" in the Hungarian version). Red stimuli indicate the loss of 17 units, while green stimuli indicates the gain of 17 units.
On a QWERTZ keyboard, the "A" key indicates "LEFT", "L" indicates "RIGHT", "N" indicates "DOWN" and "E" indicates "UP".

## About the experimental code

### Trial randomization

The Python script `randomization.py` generates trials for the experiment. Each set consists of 10 blocks, each block consists of 101 trials.

The generation process has three stages. A trial set is saved only if all stages pass their constraints. There are four stimulus categories: vertical congruent, vertical incongruent, horizontal congruent and horizontal incongruent. For each block, horizontal and vertical stimuli alternate. Each trial is randomly chosen to be congruent or incongruent. A block is accepted only if 50% of trials is congruent and 50% incongruent. Cc, Ci, Ic and Ii trials must occur in 25% proportion.

If a block fails these constraints, it is discarded and regenerated, until 10 valid blocks are created.

40% of trials must have the monetary condition. The first trial of each block cannot be monetary, and no two monetary trials can appear consecutively. All trials in eligible positions are shuffled, and monetary trials are placed one by one. The process stops when 400 trials are placed.

Monetary trials get assigned to be either red (50%) or green (50%). These are shuffled and assigned randomly to monetary trials. Non-monetary trials get assigned to be magenta, blue or yellow. Each colour receives approximately 1/3 of trials. If colour constraints fail, the process restarts.

When all three stages pass, the trial set is appended to `trials.json`.

### If new randomized trials are deemed necessary

1.  Run `randomization.py`. The script generates sets indefinitely, stop it after desired amount of randomized sets.
2.  The randomization creates a `trials.json` file. If the file already exists, delete its contents beforehand.
3.  Parse `trials.json` to a JavaScript file using the `json_to_js.py` parser, which creates `mytrials.js`. If the file already exists, delete its contents beforehand.
4.  Run the experiment with the new randomized trials.

## More information

For a full description of the project and its methodology, please visit the project's OSF repository.