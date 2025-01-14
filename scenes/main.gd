extends Node
class_name MapRandomizer
# Constants for tile types
enum TileType {ONE, TWO, NEUTRAL, BLACK}
# Board properties
const BOARD_SIZE = 25  # 5x5 grid
const NEUTRAL_TILES = 7
const BLACK_TILES = 1
# Color palette
var colors: Dictionary = {
	TileType.ONE: Color("#ed8099"),
	TileType.TWO: Color("#4d65b4"),
	TileType.NEUTRAL: Color("#fbb954"),
	TileType.BLACK: Color("#313638")
}
# Reference to the tile scene
@export var tile_scene: PackedScene
var is_red_board: bool = false # red = TEAM 1

var team_one_tiles: Array = []
var team_two_tiles: Array = []

func _ready() -> void:
	load_team_colors()
	randomize_and_replace()
	connect_color_switchers()

# Called when the "Randomize" button is pressed
func generate_new_map():
	# 1. Randomly determine if it's a red or blue board
	is_red_board = randf() < 0.5
	
	# 2. Set up tile counts based on board type
	var red_tiles = 9 if is_red_board else 8
	var blue_tiles = 8 if is_red_board else 9
	
	# 3. Create array with all tile types
	var tiles = []
	team_one_tiles = []
	team_two_tiles = []
	
	# Add red tiles
	for i in range(red_tiles):
		tiles.append(TileType.ONE)
	
	# Add blue tiles
	for i in range(blue_tiles):
		tiles.append(TileType.TWO)
	
	# Add neutral tiles
	for i in range(NEUTRAL_TILES):
		tiles.append(TileType.NEUTRAL)
	
	# Add black tile
	for i in range(BLACK_TILES):
		tiles.append(TileType.BLACK)
	
	# 4. Shuffle the array
	tiles.shuffle()
	
	return {
		"is_red_board": is_red_board,
		"tiles": tiles
	}

# Function to create and place tiles in the GridContainer
func place_tiles(grid_container: GridContainer):
	var map_data = generate_new_map()
	var tiles = map_data.tiles
	
	team_one_tiles = []
	team_two_tiles = []
	
	# Clear existing tiles if any
	for child in grid_container.get_children():
		child.queue_free()
	
	# Place new tiles
	for i in range(BOARD_SIZE):
		var tile = tile_scene.instantiate()
		grid_container.add_child(tile)
		
		tile.set_color_rect_color(colors[tiles[i]])
		if tiles[i] == TileType.ONE:
			team_one_tiles.append(tile)
		elif tiles[i] == TileType.TWO:
			team_two_tiles.append(tile)
		elif tiles[i] == TileType.BLACK:
			tile.get_node("MarginContainer/Nisman").texture = load("res://assets/fiscal_bisman.png")

# Optional: Helper function to get the starting team
func get_starting_team(map_data: Dictionary) -> String:
	return "red" if map_data.is_red_board else "blue"


func on_randomize_pressed() -> void:
	show_are_you_sure()


func randomize_and_replace() -> void:
	paint_color_indicators()
	generate_new_map()
	place_tiles($MarginContainer/GridContainer)
	hide_are_you_sure()


func show_are_you_sure() -> void:
	$AreYouSureControl.show()


func hide_are_you_sure() -> void:
	$AreYouSureControl.hide()


func paint_color_indicators() -> void:
	if is_red_board:
		$TopColorRect.color = colors[TileType.ONE]
		$BottomColorRect.color = colors[TileType.ONE]
	else:
		$TopColorRect.color = colors[TileType.TWO]
		$BottomColorRect.color = colors[TileType.TWO]


func change_team_color(team: TileType, new_color: Color) -> void:
	colors[team] = new_color
	save_team_colors()
	adjust_team_colors()
	
	if team == TileType.ONE:
		for tile in team_one_tiles:
			tile.set_color_rect_color(colors[team])
	elif team == TileType.TWO:
		for tile in team_two_tiles:
			tile.set_color_rect_color(colors[team])
	
	paint_color_indicators()


func show_settings() -> void:
	adjust_team_colors()
	$Settings.show()


func hide_settings() -> void:
	$Settings.hide()


func adjust_team_colors() -> void:
	$Settings/Panel/MarginContainer/VBoxContainer/Team1Label.modulate = colors[TileType.ONE]
	$Settings/Panel/MarginContainer/VBoxContainer/Team2Label.modulate = colors[TileType.TWO]


func save_team_colors() -> void:
	var config = ConfigFile.new()
	config.set_value("colors", "team_one", colors[TileType.ONE].to_html())
	config.set_value("colors", "team_two", colors[TileType.TWO].to_html())
	config.save("user://team_colors.cfg")


func load_team_colors() -> void:
	var config = ConfigFile.new()
	var err = config.load("user://team_colors.cfg")
	if err == OK:
		var team_one_color = config.get_value("colors", "team_one", colors[TileType.ONE].to_html())
		var team_two_color = config.get_value("colors", "team_two", colors[TileType.TWO].to_html())
		colors[TileType.ONE] = Color(team_one_color)
		colors[TileType.TWO] = Color(team_two_color)


func connect_color_switchers() -> void:
	for tile in $Settings/Panel/MarginContainer/VBoxContainer/HBoxContainer.get_children():
		tile.color_switched.connect(change_team_color.bind(TileType.ONE, tile.current_color))
	
	for tile in $Settings/Panel/MarginContainer/VBoxContainer/HBoxContainer2.get_children():
		tile.color_switched.connect(change_team_color.bind(TileType.TWO, tile.current_color))
