
import json

input_path = "/Users/huxiao/Documents/GitHub/gm2/app/lib/gmbest.json"
output_path = "/Users/huxiao/Documents/GitHub/gm2/app/lib/gmbest_portrait.json"

try:
    with open(input_path, 'r', encoding='utf-8') as f:
        all_games = json.load(f)

    portrait_games = [
        game for game in all_games 
        if int(game.get("height", 0)) > int(game.get("width", 0))
    ]

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(portrait_games, f, indent=4)

    print(f"Successfully created {output_path} with {len(portrait_games)} portrait games.")

except Exception as e:
    print(f"An error occurred: {e}")
