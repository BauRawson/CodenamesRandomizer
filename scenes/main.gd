extends Node

class_name MapRandomizer

# Constants for tile types
enum TileType {RED, BLUE, NEUTRAL, BLACK}

# Board properties
const BOARD_SIZE = 25  # 5x5 grid
const NEUTRAL_TILES = 7
const BLACK_TILES = 1

# Color palette
var colors: Dictionary = {
	TileType.RED: Color("#e6904e"),
	TileType.BLUE: Color("#4d65b4"),
	TileType.NEUTRAL: Color("#9babb2"),
	TileType.BLACK: Color("#313638")
}

# Reference to the tile scene
@export var tile_scene: PackedScene
var is_red_board: bool = false


func _ready() -> void:
	randomize_and_replace()

# Called when the "Randomize" button is pressed
func generate_new_map():
	# 1. Randomly determine if it's a red or blue board
	is_red_board = randf() < 0.5
	
	# 2. Set up tile counts based on board type
	var red_tiles = 9 if is_red_board else 8
	var blue_tiles = 8 if is_red_board else 9
	
	# 3. Create array with all tile types
	var tiles = []
	
	# Add red tiles
	for i in range(red_tiles):
		tiles.append(TileType.RED)
	
	# Add blue tiles
	for i in range(blue_tiles):
		tiles.append(TileType.BLUE)
	
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
	
	# Clear existing tiles if any
	for child in grid_container.get_children():
		child.queue_free()
	
	# Place new tiles
	for i in range(BOARD_SIZE):
		var tile = tile_scene.instantiate()
		grid_container.add_child(tile)
		
		tile.set_color(colors[tiles[i]])


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
		$TopColorRect.color = colors[TileType.RED]
		$BottomColorRect.color = colors[TileType.RED]
	else:
		$TopColorRect.color = colors[TileType.BLUE]
		$BottomColorRect.color = colors[TileType.BLUE]
