class_name Tile extends ColorRect

var checked: bool = false

func on_gui_input(event: InputEvent) -> void:
	if event is InputEventMouseButton and event.is_pressed():
		checked = !checked
		$Highlight.visible = checked
