class_name Tile extends ColorRect

signal color_switched
@export var is_color_switcher: bool = false
var checked: bool = false
var current_color: Color


func _ready() -> void:
	current_color = color


func on_gui_input(event: InputEvent) -> void:
	if event is InputEventMouseButton and event.is_pressed():
		if is_color_switcher:
			print(current_color)
			color_switched.emit()
		else:
			checked = !checked
			$Highlight.visible = checked


func set_color_rect_color(p_color: Color) -> void:
	self.color = p_color
	current_color = p_color
