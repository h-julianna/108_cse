import random
import json
import pandas as pd


# global variables to be manipulated
stimulus_set = []
relay = 0

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
    {"prime": "bal\nbal\nbal", "probe": "jobb", "congruency": "incongruent", "correct_response": "g",
     "name": "black_horizontal_incon_1"},
    {"prime": "jobb\njobb\njobb", "probe": "bal", "congruency": "incongruent", "correct_response": "f",
     "name": "black_horizontal_incon_2"}
]

red_vertical_con = [
    {"prime":"le", "probe":"le", "congruency":"congruent", "correct_response":"n", "name":"red_vertical_con_1", "color":"red"},
    {"prime":"fel", "probe":"fel", "congruency":"congruent", "correct_response":"e", "name":"red_vertical_con_2", "color":"red"}
]
red_vertical_incon = [
    {"prime":"fel", "probe":"le", "congruency":"incongruent", "correct_response":"n", "name":"red_vertical_incon_1", "color":"red"},
    {"prime":"le", "probe":"fel", "congruency":"incongruent", "correct_response":"e", "name":"red_vertical_incon_2", "color":"red"}
]

red_horizontal_con = [
    {"prime":"bal", "probe":"bal", "congruency":"congruent", "correct_response":"l", "name":"red_horizontal_con_1", "color":"red"},
    {"prime":"jobb", "probe":"jobb", "congruency":"congruent", "correct_response":"a", "name":"red_horizontal_con_2", "color":"red"}
]
red_horizontal_incon = [
    {"prime":"bal", "probe":"jobb", "congruency":"incongruent", "correct_response":"l", "name":"red_horizontal_incon_1", "color":"red"},
    {"prime":"jobb", "probe":"bal", "congruency":"incongruent", "correct_response":"a", "name":"red_horizontal_incon_2", "color":"red"}
]

#green stimuli
green_vertical_con = [
    {"prime":"le", "probe":"le", "congruency":"congruent", "correct_response":"n", "name":"green_vertical_con_1", "color":"green"},
    {"prime":"fel", "probe":"fel", "congruency":"congruent", "correct_response":"e", "name":"green_vertical_con_2", "color":"green"}
]
green_vertical_incon = [
    {"prime":"fel", "probe":"le", "congruency":"incongruent", "correct_response":"n", "name":"green_vertical_incon_1", "color":"green"},
    {"prime":"le", "probe":"fel", "congruency":"incongruent", "correct_response":"e", "name":"green_vertical_incon_2", "color":"green"}
]

green_horizontal_con = [
    {"prime":"bal", "probe":"bal", "congruency":"congruent", "correct_response":"l", "name":"green_horizontal_con_1", "color":"green"},
    {"prime":"jobb", "probe":"jobb", "congruency":"congruent", "correct_response":"a", "name":"green_horizontal_con_2", "color":"green"}
]
green_horizontal_incon = [
    {"prime":"bal", "probe":"jobb", "congruency":"incongruent", "correct_response":"l", "name":"green_horizontal_incon_1", "color":"green"},
    {"prime":"jobb", "probe":"bal", "congruency":"incongruent", "correct_response":"a", "name":"green_horizontal_incon_2", "color":"green"}
]

#yellow stimuli idk
yellow_vertical_con = [
    {"prime":"le", "probe":"le", "congruency":"congruent", "correct_response":"n", "name":"yellow_vertical_con_1", "color":"yellow"},
    {"prime":"fel", "probe":"fel", "congruency":"congruent", "correct_response":"e", "name":"yellow_vertical_con_2", "color":"yellow"}
]
yellow_vertical_incon = [
    {"prime":"fel", "probe":"le", "congruency":"incongruent", "correct_response":"n", "name":"yellow_vertical_incon_1", "color":"yellow"},
    {"prime":"le", "probe":"fel", "congruency":"incongruent", "correct_response":"e", "name":"yellow_vertical_incon_2", "color":"yellow"}
]

yellow_horizontal_con = [
    {"prime":"bal", "probe":"bal", "congruency":"congruent", "correct_response":"l", "name":"yellow_horizontal_con_1", "color":"yellow"},
    {"prime":"jobb", "probe":"jobb", "congruency":"congruent", "correct_response":"a", "name":"yellow_horizontal_con_2", "color":"yellow"}
]
yellow_horizontal_incon = [
    {"prime":"bal", "probe":"jobb", "congruency":"incongruent", "correct_response":"l", "name":"yellow_horizontal_incon_1", "color":"yellow"},
    {"prime":"jobb", "probe":"bal", "congruency":"incongruent", "correct_response":"a", "name":"yellow_horizontal_incon_2", "color":"yellow"}
]

#blue stimuli idk
blue_vertical_con = [
    {"prime":"le", "probe":"le", "congruency":"congruent", "correct_response":"n", "name":"blue_vertical_con_1", "color":"blue"},
    {"prime":"fel", "probe":"fel", "congruency":"congruent", "correct_response":"e", "name":"blue_vertical_con_2", "color":"blue"}
]
blue_vertical_incon = [
    {"prime":"fel", "probe":"le", "congruency":"incongruent", "correct_response":"n", "name":"blue_vertical_incon_1", "color":"blue"},
    {"prime":"le", "probe":"fel", "congruency":"incongruent", "correct_response":"e", "name":"blue_vertical_incon_2", "color":"blue"}
]

blue_horizontal_con = [
    {"prime":"bal", "probe":"bal", "congruency":"congruent", "correct_response":"l", "name":"blue_horizontal_con_1", "color":"blue"},
    {"prime":"jobb", "probe":"jobb", "congruency":"congruent", "correct_response":"a", "name":"blue_horizontal_con_2", "color":"blue"}
]
blue_horizontal_incon = [
    {"prime":"bal", "probe":"jobb", "congruency":"incongruent", "correct_response":"l", "name":"blue_horizontal_incon_1", "color":"blue"},
    {"prime":"jobb", "probe":"bal", "congruency":"incongruent", "correct_response":"a", "name":"blue_horizontal_incon_2", "color":"blue"}
]

# grouping congruent and incongruent stimuli together
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

def stimulus_finder(group, allow_red=True):
    global stimulus_set

    # red trials are 30% of all trials
    is_red = allow_red and (random.random() < 0.3)

    if is_red:
        # choosing from red lists
        chosen_list = random.choice(group[2:4])
    else:
        # choosing from neutral lists
        chosen_list = random.choice(group[0:2])

    stimulus = random.choice(chosen_list)
    stimulus_set.append(stimulus)


def set_factory(times):
    global stimulus_set
    global relay

    for i in range(times):
        # first trial must be neutral
        allow_red = i != 0
        if relay == 0:
            stimulus_finder(horizontal_group, allow_red)
            relay = 1
        else:
            stimulus_finder(vertical_group, allow_red)
            relay = 0


def group_relay():
    global relay
    if relay == 0:
        stimulus_finder(horizontal_group)
        relay = 1
    else:
        stimulus_finder(vertical_group)
        relay = 0


def set_factory(times):
    for i in range(times):
        group_relay()


trial_rate = []
trial_count = 90


def factor():
    global trial_rate
    global trial_count
    set_factory(trial_count)
    con_count = 0
    incon_count = 0
    for i in stimulus_set:
        if i["congruency"] == "congruent":
            con_count += 1
        elif i["congruency"] == "incongruent":
            incon_count += 1
    con = con_count / trial_count
    incon = incon_count / trial_count
    trial_rate = [con, incon]
    
    factor()


# double check for red balance ~ serious vibe coding shit
def check_red_balance():
    df = pd.DataFrame(stimulus_set)
    red_trials = df[df.get("color") == "red"]

    counts = red_trials.groupby(["congruency"]).size()
    print("Red congruency counts:\n", counts)

    hv_counts = []
    for s in stimulus_set:
        if "color" in s and s["color"] == "red":
            hv_counts.append("horizontal" if "horizontal" in s["name"] else "vertical")
    hv_df = pd.Series(hv_counts).value_counts()
    print("Red orientation counts:\n", hv_df)

match_count = 0
while True:
    if trial_rate == [0.5, 0.5]:
        group_relay()
        trial_block = pd.DataFrame(stimulus_set, columns=["prime", "probe", "congruency", "correct_response"])
        trial_block["previous_congruency"] = trial_block["congruency"].shift(1)
        trial_block["con_pair"] = trial_block["previous_congruency"] + "-" + trial_block["congruency"]
        pair_counts = trial_block["con_pair"].value_counts()
        if pair_counts["congruent-congruent"] == 20 and pair_counts["congruent-incongruent"] == 20 and pair_counts[
            "incongruent-congruent"] == 20 and pair_counts["incongruent-incongruent"] == 20:
            match_count += 1
            print("Match found: {}".format(match_count))
            print("Correct paircount found, writing...")
            with open("trials.json", "r+") as file:
                # First we load existing data into a dictionary
                file_data = json.load(file)
                # join new_data with file_data inside emp_details
                file_data["trials"].append(stimulus_set)
                # Sets file's current position at offset.
                file.seek(0)
                # convert back to json.
                json.dump(file_data, file)

    stimulus_set = []
    factor()