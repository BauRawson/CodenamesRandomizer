extends Control
class_name GameMenu

func on_tv_pressed() -> void:
	get_tree().change_scene_to_file("res://scenes/tv.tscn")

func on_phone_pressed() -> void:
	get_tree().change_scene_to_file("res://scenes/main.tscn")
