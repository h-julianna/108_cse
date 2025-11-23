import random
import json
import pandas as pd

# global
TRIALS_PER_SET = 100
TOTAL_SETS = 10
colors = ["black", "red", "green", "yellow", "blue"]

#defining stimulus set
#black stimuli
black_vertical_con = [
    {"prime": "le\nle\nle", "probe": "le", "congruency": "congruent", "correct_response": "n", "name": "black_vertical_con_1"},
    {"prime": "fel\nfel\nfel", "probe": "fel", "congruency": "congruent", "correct_response": "j", "name": "vertical_con_2"}
]
black_vertical_inc = [
    {"prime": "fel\nfel\nfel", "probe": "le", "congruency": "incongruent", "correct_response": "n", "name": "black_vertical_incon_1"},
    {"prime": "le\nle\nle", "probe": "fel", "congruency": "incongruent", "correct_response": "j", "name": "black_vertical_incon_2"}
]

black_horizontal_con = [
    {"prime": "bal\nbal\nbal", "probe": "bal", "congruency": "congruent", "correct_response": "f", "name": "black_horizontal_con_1"},
    {"prime": "jobb\njobb\njobb", "probe": "jobb", "congruency": "congruent", "correct_response": "g", "name": "black_horizontal_con_2"}
]
black_horizontal_incon = [
    {"prime": "bal\nbal\nbal", "probe": "jobb", "congruency": "incongruent", "correct_response": "g", "name": "black_horizontal_incon_1"},
    {"prime": "jobb\njobb\njobb", "probe": "bal", "congruency": "incongruent", "correct_response": "f", "name": "black_horizontal_incon_2"}
]
#red stimuli
red_vertical_con = [
    {"prime": "le\nle\nle", "probe":"le", "congruency":"congruent", "correct_response":"n", "name":"red_vertical_con_1", "color":"red"},
    {"prime":"fel\nfel\nfel", "probe":"fel", "congruency":"congruent", "correct_response":"e", "name":"red_vertical_con_2", "color":"red"}
]
red_vertical_incon = [
    {"prime":"fel\nfel\nfel", "probe":"le", "congruency":"incongruent", "correct_response":"n", "name":"red_vertical_incon_1", "color":"red"},
    {"prime":"le\nle\nle", "probe":"fel", "congruency":"incongruent", "correct_response":"e", "name":"red_vertical_incon_2", "color":"red"}
]

red_horizontal_con = [
    {"prime":"bal\nbal\nbal", "probe":"bal", "congruency":"congruent", "correct_response":"l", "name":"red_horizontal_con_1", "color":"red"},
    {"prime":"jobb\njobb\njobb", "probe":"jobb", "congruency":"congruent", "correct_response":"a", "name":"red_horizontal_con_2", "color":"red"}
]
red_horizontal_incon = [
    {"prime":"bal\nbal\nbal", "probe":"jobb", "congruency":"incongruent", "correct_response":"l", "name":"red_horizontal_incon_1", "color":"red"},
    {"prime":"jobb\njobb\njobb", "probe":"bal", "congruency":"incongruent", "correct_response":"a", "name":"red_horizontal_incon_2", "color":"red"}
]
#green stimuli
green_vertical_con = [
    {"prime":"le\nle\nle", "probe":"le", "congruency":"congruent", "correct_response":"n", "name":"green_vertical_con_1", "color":"green"},
    {"prime":"fel\nfel\nfel", "probe":"fel", "congruency":"congruent", "correct_response":"e", "name":"green_vertical_con_2", "color":"green"}
]
green_vertical_incon = [
    {"prime":"fel\nfel\nfel", "probe":"le", "congruency":"incongruent", "correct_response":"n", "name":"green_vertical_incon_1", "color":"green"},
    {"prime":"le\nle\nle", "probe":"fel", "congruency":"incongruent", "correct_response":"e", "name":"green_vertical_incon_2", "color":"green"}
]

green_horizontal_con = [
    {"prime":"bal\nbal\nbal", "probe":"bal", "congruency":"congruent", "correct_response":"l", "name":"green_horizontal_con_1", "color":"green"},
    {"prime":"jobb\njobb\njobb", "probe":"jobb", "congruency":"congruent", "correct_response":"a", "name":"green_horizontal_con_2", "color":"green"}
]
green_horizontal_incon = [
    {"prime":"bal\nbal\nbal", "probe":"jobb", "congruency":"incongruent", "correct_response":"l", "name":"green_horizontal_incon_1", "color":"green"},
    {"prime":"jobb\njobb\njobb", "probe":"bal", "congruency":"incongruent", "correct_response":"a", "name":"green_horizontal_incon_2", "color":"green"}
]
#yellow stimuli
yellow_vertical_con = [
    {"prime":"le\nle\nle", "probe":"le", "congruency":"congruent", "correct_response":"n", "name":"yellow_vertical_con_1", "color":"yellow"},
    {"prime":"fel\nfel\nfel", "probe":"fel", "congruency":"congruent", "correct_response":"e", "name":"yellow_vertical_con_2", "color":"yellow"}
]
yellow_vertical_incon = [
    {"prime":"fel\nfel\nfel", "probe":"le", "congruency":"incongruent", "correct_response":"n", "name":"yellow_vertical_incon_1", "color":"yellow"},
    {"prime":"le\nle\nle", "probe":"fel", "congruency":"incongruent", "correct_response":"e", "name":"yellow_vertical_incon_2", "color":"yellow"}
]

yellow_horizontal_con = [
    {"prime":"bal\nbal\nbal", "probe":"bal", "congruency":"congruent", "correct_response":"l", "name":"yellow_horizontal_con_1", "color":"yellow"},
    {"prime":"jobb\njobb\njobb", "probe":"jobb", "congruency":"congruent", "correct_response":"a", "name":"yellow_horizontal_con_2", "color":"yellow"}
]
yellow_horizontal_incon = [
    {"prime":"bal\nbal\nbal", "probe":"jobb", "congruency":"incongruent", "correct_response":"l", "name":"yellow_horizontal_incon_1", "color":"yellow"},
    {"prime":"jobb\njobb\njobb", "probe":"bal", "congruency":"incongruent", "correct_response":"a", "name":"yellow_horizontal_incon_2", "color":"yellow"}
]

#blue stimuli
blue_vertical_con = [
    {"prime":"le\nle\nle", "probe":"le", "congruency":"congruent", "correct_response":"n", "name":"blue_vertical_con_1", "color":"blue"},
    {"prime":"fel\nfel\nfel", "probe":"fel", "congruency":"congruent", "correct_response":"e", "name":"blue_vertical_con_2", "color":"blue"}
]
blue_vertical_incon = [
    {"prime":"fel\nfel\nfel", "probe":"le", "congruency":"incongruent", "correct_response":"n", "name":"blue_vertical_incon_1", "color":"blue"},
    {"prime":"le\nle\nle", "probe":"fel", "congruency":"incongruent", "correct_response":"e", "name":"blue_vertical_incon_2", "color":"blue"}
]

blue_horizontal_con = [
    {"prime":"bal\nbal\nbal", "probe":"bal", "congruency":"congruent", "correct_response":"l", "name":"blue_horizontal_con_1", "color":"blue"},
    {"prime":"jobb\njobb\njobb", "probe":"jobb", "congruency":"congruent", "correct_response":"a", "name":"blue_horizontal_con_2", "color":"blue"}
]
blue_horizontal_incon = [
    {"prime":"bal\nbal\nbal", "probe":"jobb", "congruency":"incongruent", "correct_response":"l", "name":"blue_horizontal_incon_1", "color":"blue"},
    {"prime":"jobb\njobb\njobb", "probe":"bal", "congruency":"incongruent", "correct_response":"a", "name":"blue_horizontal_incon_2", "color":"blue"}
]

vertical_group = [
    black_vertical_con,
    black_vertical_inc,
    red_vertical_con,
    red_vertical_incon,
    green_vertical_con,
    green_vertical_incon,
    yellow_vertical_con,
    yellow_vertical_incon,
    blue_vertical_con,
    blue_vertical_incon]

horizontal_group = [
    black_horizontal_con,
    black_horizontal_incon,
    red_horizontal_con,
    red_horizontal_incon,
    green_horizontal_con,
    green_horizontal_incon,
    yellow_horizontal_con,
    yellow_horizontal_incon,
    blue_horizontal_con,
    blue_horizontal_incon]

#for 50-50 congruency
def half_split(n):
    return n // 2, n - n // 2

def generate_trial_block(trials_per_block=100):
    block = []
    relay = 0  # for orientation alternation

    for i in range(trials_per_block):
        if relay == 0:
            group = horizontal_group
            relay = 1
        else:
            group = vertical_group
            relay = 0

        #picking colour
        color_idx = random.choice(range(0, len(colors)))
        color_slice = color_idx * 2
        congruency_idx = color_slice + random.choice([0, 1])
        trial_list = group[congruency_idx]
        trial = random.choice(trial_list).copy()
        trial["color"] = colors[color_idx]

        block.append(trial)

    #+1 first trial
    first_orientation = "vertical" if "vertical" in block[0]["name"] else "horizontal"
    opposite_group = vertical_group if first_orientation == "horizontal" else horizontal_group
    allowed_colors = ["black", "yellow", "blue"]
    color_idx = random.choice([colors.index(c) for c in allowed_colors])
    color_slice = color_idx * 2
    congruency_idx = color_slice + random.choice([0, 1])
    trial_list = opposite_group[congruency_idx]
    first_trial = random.choice(trial_list).copy()
    first_trial["color"] = colors[color_idx]

    block.insert(0, first_trial)

    return block

def save_trials_to_json(all_sets, file_path="trials.json"):
    try:
        with open(file_path, "r") as f:
            file_data = json.load(f)
        if "trials" not in file_data:
            file_data = {"trials": []}
    except (FileNotFoundError, json.JSONDecodeError):
        file_data = {"trials": []}
    file_data["trials"].extend(all_sets)
    with open(file_path, "w") as f:
        json.dump(file_data, f, indent=2)


all_sets = []
for i in range(TOTAL_SETS):
    block = generate_trial_block()
    all_sets.append(block)
    print(f"Set {i+1}:")
save_trials_to_json(all_sets)

print(f"{TOTAL_SETS} trial blocks saved to trials.json")