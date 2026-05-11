extends Control
class_name TVDisplay

@export var tile_scene: PackedScene

const BOARD_SIZE = 25
const TILE_COLOR = Color("#4a3c5a")

func _ready():
	_build_board()

func _build_board():
	var grid = $MarginContainer/GridContainer
	for i in range(BOARD_SIZE):
		var tile = tile_scene.instantiate()
		grid.add_child(tile)
		tile.set_color_rect_color(TILE_COLOR)
