
import random
import json
import signal
import sys
import os
import pandas as pd

######### Stimulus definitions ########

def get_vertical_con_list():
    return [
        {"prime": "downprime", "probe": "downprobe", "congruency": "congruent", "correct_response": "n", "name": "vertical_con_1"},
        {"prime": "upprime", "probe": "upprobe", "congruency": "congruent", "correct_response": "e", "name": "vertical_con_2"}
    ]

def get_vertical_inc_list():
    return [
        {"prime": "upprime", "probe": "downprobe", "congruency": "incongruent", "correct_response": "n", "name": "vertical_incon_1"},
        {"prime": "downprime", "probe": "upprobe", "congruency": "incongruent", "correct_response": "e", "name": "vertical_incon_2"}
    ]

def get_horizontal_con_list():
    return [
        {"prime": "leftprime", "probe": "leftprobe", "congruency": "congruent", "correct_response": "a", "name": "horizontal_con_1"},
        {"prime": "rightprime", "probe": "rightprobe", "congruency": "congruent", "correct_response": "l", "name": "horizontal_con_2"}
    ]

def get_horizontal_incon_list():
    return [
        {"prime": "leftprime", "probe": "rightprobe", "congruency": "incongruent", "correct_response": "l", "name": "horizontal_incon_1"},
        {"prime": "rightprime", "probe": "leftprobe", "congruency": "incongruent", "correct_response": "a", "name": "horizontal_incon_2"}
    ]

######### STAGE 1: Generating congruency-balanced blocks ########

def generate_blocks():
    stimulus_set = []
    relay = 0
    congruency_list = []
    trial_count = 100
    trial_rate = []

    def stimulus_finder(group_type):
        if group_type == "vertical":
            group = [get_vertical_con_list(), get_vertical_inc_list()]
        else:
            group = [get_horizontal_con_list(), get_horizontal_incon_list()]
        congruency = random.randint(0, len(group) - 1)
        stimulus = random.randint(0, len(group[congruency]) - 1)
        stimulus_set.append(group[congruency][stimulus])

    def group_relay():
        nonlocal relay
        if relay == 0:
            stimulus_finder("horizontal")
            relay = 1
        else:
            stimulus_finder("vertical")
            relay = 0

    def set_factory(times):
        for _ in range(times):
            group_relay()

    def factor():
        nonlocal trial_rate
        set_factory(trial_count)
        con_count = sum(1 for i in stimulus_set if i["congruency"] == "congruent")
        incon_count = sum(1 for i in stimulus_set if i["congruency"] == "incongruent")
        trial_rate = [con_count / trial_count, incon_count / trial_count]

    print("Stage 1: Generating blocks.")
    while True:
        restriction_check = False

        if trial_rate == [0.5, 0.5]:
            group_relay()

            trial_block = pd.DataFrame(
                stimulus_set,
                columns=["prime", "probe", "congruency", "correct_response", "name"]
            )
            trial_block["previous_congruency"] = trial_block["congruency"].shift(1)
            trial_block["con_pair"] = (
                trial_block["previous_congruency"] + "-" + trial_block["congruency"]
            )
            pair_counts = trial_block["con_pair"].value_counts()

            if (
                pair_counts.get("congruent-congruent", 0) == 25 and
                pair_counts.get("congruent-incongruent", 0) == 25 and
                pair_counts.get("incongruent-congruent", 0) == 25 and
                pair_counts.get("incongruent-incongruent", 0) == 25
            ):
                restriction_check = True

        if restriction_check:
            current_names = [stim["name"] for stim in stimulus_set]
            already_exists = any(
                current_names == [stim["name"] for stim in block]
                for block in congruency_list
            )

            if not already_exists:
                congruency_list.append(stimulus_set.copy())
                print(f"    Block {len(congruency_list)}/10 generated")

            if len(congruency_list) == 10:
                break

        stimulus_set = []
        factor()

    print("Stage 1 passed!")
    return congruency_list

######### STAGE 2: Adding monetary conditions ########

def add_monetary_conditions(congruency_list):
    target_monetary = 400

    print("Stage 2: Adding monetary conditions.")
    for attempt in range(100000):
        # Reset all conditions
        for block in congruency_list:
            for trial in block:
                trial["condition"] = "not_monetary"

        # Eligible positions: exclude first trial of each block
        eligible_positions = []
        for block_idx in range(len(congruency_list)):
            for trial_idx in range(1, len(congruency_list[block_idx])):
                eligible_positions.append((block_idx, trial_idx))

        random.shuffle(eligible_positions)
        monetary_count = 0

        for block_idx, trial_idx in eligible_positions:
            if monetary_count >= target_monetary:
                break

            block = congruency_list[block_idx]
            can_place = True

            if block[trial_idx - 1]["condition"] == "monetary":
                can_place = False
            if can_place and trial_idx + 1 < len(block):
                if block[trial_idx + 1]["condition"] == "monetary":
                    can_place = False

            if can_place:
                block[trial_idx]["condition"] = "monetary"
                monetary_count += 1

        if monetary_count != target_monetary:
            continue

        # Validate: no first trials monetary, no consecutive monetary
        first_trial_violations = sum(1 for b in congruency_list if b[0]["condition"] == "monetary")
        if first_trial_violations > 0:
            continue

        consecutive_violations = 0
        for block in congruency_list:
            for trial_idx in range(1, len(block)):
                if block[trial_idx - 1]["condition"] == "monetary" and block[trial_idx]["condition"] == "monetary":
                    consecutive_violations += 1

        if consecutive_violations == 0:
            print(f"    Valid monetary distribution found (attempt {attempt + 1})")
            print(f"    Monetary trials: {monetary_count} (40.0%)")
            print("Stage 2 passed!")
            return True

    print("Stage 2 failed after 100000 attempts.")
    return False

######### STAGE 3: Adding color ########

def add_colors(congruency_list):
    monetary_colors = ["red"] * 200 + ["green"] * 200
    non_monetary_colors_pool = ["magenta", "blue", "yellow"]

    print("Stage 3: Adding colors.")
    for attempt in range(100000):
        random.shuffle(monetary_colors)

        monetary_positions = []
        non_monetary_positions = []
        for block_idx, block in enumerate(congruency_list):
            for trial_idx, trial in enumerate(block):
                if trial["condition"] == "monetary":
                    monetary_positions.append((block_idx, trial_idx))
                else:
                    non_monetary_positions.append((block_idx, trial_idx))

        # Assign monetary colors
        for i, (block_idx, trial_idx) in enumerate(monetary_positions):
            congruency_list[block_idx][trial_idx]["color"] = monetary_colors[i]

        # Build balanced non-monetary color list
        n_non_monetary = len(non_monetary_positions)
        base_count = n_non_monetary // 3
        remainder = n_non_monetary % 3

        remainder_colors = random.sample(non_monetary_colors_pool, remainder)
        counts = {color: base_count for color in non_monetary_colors_pool}
        for color in remainder_colors:
            counts[color] += 1

        non_monetary_colors = []
        for color, count in counts.items():
            non_monetary_colors.extend([color] * count)
        random.shuffle(non_monetary_colors)

        # Assign non-monetary colors
        for i, (block_idx, trial_idx) in enumerate(non_monetary_positions):
            congruency_list[block_idx][trial_idx]["color"] = non_monetary_colors[i]

        # Fix consecutive non-monetary color repeats in-place
        for block in congruency_list:
            last_non_monetary_color = None
            for trial in block:
                if trial["condition"] == "not_monetary":
                    if trial["color"] == last_non_monetary_color:
                        alternatives = [c for c in non_monetary_colors_pool if c != last_non_monetary_color]
                        trial["color"] = random.choice(alternatives)
                    last_non_monetary_color = trial["color"]

        # Validate monetary colors: strict 200/200
        red_count = sum(
            1 for block in congruency_list for trial in block
            if trial["condition"] == "monetary" and trial["color"] == "red"
        )
        green_count = sum(
            1 for block in congruency_list for trial in block
            if trial["condition"] == "monetary" and trial["color"] == "green"
        )

        if red_count != 200 or green_count != 200:
            continue

        # Validate non-monetary colors: within ±1 of ideal
        non_monetary_color_counts = {"magenta": 0, "blue": 0, "yellow": 0}
        for block in congruency_list:
            for trial in block:
                if trial["condition"] == "not_monetary":
                    non_monetary_color_counts[trial["color"]] += 1

        total_non_monetary = sum(non_monetary_color_counts.values())
        ideal = total_non_monetary / 3
        non_monetary_valid = all(
            abs(non_monetary_color_counts[c] - ideal) <= 1
            for c in ["magenta", "blue", "yellow"]
        )

        if not non_monetary_valid:
            continue

        # Validate: no consecutive non-monetary trials share the same color
        consecutive_color_violations = 0
        for block in congruency_list:
            last_non_monetary_color = None
            for trial in block:
                if trial["condition"] == "not_monetary":
                    if trial["color"] == last_non_monetary_color:
                        consecutive_color_violations += 1
                        break
                    last_non_monetary_color = trial["color"]

        if consecutive_color_violations > 0:
            continue
        print(f"    Valid color distribution found (attempt {attempt + 1})")
        print(f"    Monetary: red={red_count}, green={green_count}")
        print(f"    Non-monetary: magenta={non_monetary_color_counts['magenta']}, blue={non_monetary_color_counts['blue']}, yellow={non_monetary_color_counts['yellow']}")
        print("Stage 3 passed!")
        return True

    print("Stage 3 failed after 100000 attempts.")
    return False

######### Signal handler ########

def handle_exit(sig, frame):
    print("\nStopped. All completed trial sets are saved in trials.json")
    sys.exit(0)

signal.signal(signal.SIGINT, handle_exit)
signal.signal(signal.SIGTERM, handle_exit)

######### Main loop ########

completed_count = 0
print("Starting continuous generation. Press Ctrl+C to stop.\n")

while True:
    completed_count += 1
    print(f"═══ Trial set #{completed_count} ═══")

    # Stage 1: generate fresh blocks
    congruency_list = generate_blocks()

    # Stage 2: add monetary conditions
    if not add_monetary_conditions(congruency_list):
        print("Skipping to next trial set.\n")
        continue

    # Stage 3: add colors
    if not add_colors(congruency_list):
        print("Skipping to next trial set.\n")
        continue

    # All stages passed - save
    try:
        with open("trials.json", "r") as file:
            data = json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        data = {"trial_sets": []}

    data["trial_sets"].append(congruency_list)

    with open("trials.tmp", "w") as file:
        json.dump(data, file, indent=4)
    os.replace("trials.tmp", "trials.json")

    print(f"Saved to trials.json (total sets: {len(data['trial_sets'])})")
    print(f"Trial set #{completed_count} completed!\n")
